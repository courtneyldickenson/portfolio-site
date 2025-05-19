---
sidebar: false
---
# Virtual CPU – Operating Systems Project  
**Team Members:** Courtney Dickenson  
**Role:** Instruction Handling, IPC Architecture, Memory Logic  
**Tools:** C++, UNIX Pipes, Fork, Custom Opcodes, CLI  

---

## Project Overview  
This project simulates a **virtual CPU** capable of reading instructions from memory, executing them based on a custom instruction set, and managing communication with a separate **memory process** via **UNIX pipes**. The goal was to understand **instruction-level execution**, **inter-process communication (IPC)**, and **system memory emulation**.

### Core Features  
- 🧠 CPU runs from a program loaded into memory.txt  
- 🧵 CPU and Memory are **separate processes**, communicating through **pipes**  
- 🧾 Instructions are executed in reverse (bottom-up memory model)  
- ⚠️ Includes basic error handling, segmentation checks, and I/O syscall simulation  

<!-- ![Virtual CPU Architecture](./assets/virtual_cpu_architecture.png) -->

---

## System Architecture  

```bash
├── cpu.cpp             # CPU simulation and instruction cycle logic
├── memory.cpp          # Memory management and request handler
├── memory.txt          # Memory content (input/output)
├── program.txt         # Instruction set file
├── makefile            # Build and execution automation
````

---

## Code Highlights

### 1. Memory File Loading

```cpp
void loadFromFile() {
    int address = 999;
    string line;
    ifstream infile(filename);
    while (getline(infile, line)) {
        line = line.substr(0, line.find("//"));  // Strip comments
        line.erase(0, line.find_first_not_of(" \t\n\r")); // LTrim
        line.erase(line.find_last_not_of(" \t\n\r") + 1); // RTrim
        if (!line.empty()) {
            memory[address--] = stoi(line);
        }
    }
}
```

---

### 2. Memory Read/Write via Pipes

```cpp
int sendReadRequest(int address) {
    int op = 1;
    write(cpuToMem[WRITE_END], &op, sizeof(op));
    write(cpuToMem[WRITE_END], &address, sizeof(address));
    int data;
    read(memToCpu[READ_END], &data, sizeof(data));
    return data;
}

void sendWriteRequest(int address, int data) {
    int op = 2;
    write(cpuToMem[WRITE_END], &op, sizeof(op));
    write(cpuToMem[WRITE_END], &address, sizeof(address));
    write(cpuToMem[WRITE_END], &data, sizeof(data));
}
```

---

### 3. Instruction Execution – Dispatcher Example

```cpp
switch (ir) {
    case 1:
        pc--;
        ac = sendReadRequest(pc);  // Load immediate
        break;
    case 8:
        ac = rand() % 100 + 1;     // Load random number
        break;
    case 9:
        pc--;
        if (sendReadRequest(pc) == 1) cout << ac;        // Print int
        else cout << static_cast<char>(ac) << endl;      // Print char
        break;
    case 27:
        sendWriteRequest(sp--, ac); // Push
        break;
    case 28:
        ac = sendReadRequest(++sp); // Pop
        break;
    case 50:
        sendEndRequest();           // End
        break;
    default:
        cerr << "Unknown instruction" << endl;
}
```

---

### 4. Memory Process Loop

```cpp
void memoryProcess() {
    Memory memory;
    memory.loadFromFile();
    while (true) {
        int requestType;
        read(cpuToMem[READ_END], &requestType, sizeof(requestType));
        if (requestType == 1) {
            int address;
            read(cpuToMem[READ_END], &address, sizeof(address));
            int data = memory.read(address);
            write(memToCpu[WRITE_END], &data, sizeof(data));
        } else if (requestType == 2) {
            int address, data;
            read(cpuToMem[READ_END], &address, sizeof(address));
            read(cpuToMem[READ_END], &data, sizeof(data));
            memory.write(address, data);
        } else if (requestType == -1) {
            break;
        }
    }
}
```

---

## Challenges and Fixes

### 🧵 Inter-Process Communication (IPC)

**Issue:** Bidirectional communication over pipes caused deadlocks and message order confusion.

**Fix:** Carefully isolated read/write endpoints per process and synchronized request-response timing.

---

### 🧠 Opcode Logic Bugs

**Issue:** Several opcodes required chaining memory reads — especially for indirect references and stack logic.

**Fix:** Added debug logs and traced memory access path manually to fix stack overflows and address jumps.

---

### 🔧 Instruction Set Design

**Issue:** Without symbolic instruction names, debugging `program.txt` was error-prone.

**Fix:** Introduced comments and structured parsing to annotate code as close to pseudo-assembly as possible.

---

## Results

* ✅ CPU successfully reads and executes instructions from memory
* 🔄 Real-time pipe-based communication mimics OS-level memory/CPU boundaries
* 🧠 Opcode dispatching and stack emulation simulate real-world instruction flows

---

## Future Work

* Add **interrupt handling** and syscall switches
* Design **stack frames** for multi-procedure execution
* Visualize memory/registers in real-time with CLI interface
* Expand instruction set (bitwise ops, branching conditions)

---

## Key Takeaways

* Built a simulated **instruction cycle engine** and memory-access pipeline
* Mastered **pipes, forking, and low-level IPC** in C++
* Developed a deeper understanding of how real CPUs communicate with memory under an OS abstraction

---
