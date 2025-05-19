---
sidebar: false
---
# Process Toolkit (Fork, Exec, Signals)  
**Coursework:** Unix Systems Programming  
**Tools:** C, Unix APIs  

---

## Project Overview  
Hands-on exploration of **process control** with system calls like `fork`, `exec`, and `kill`.

---

## Key Features  
- Spawned and monitored child processes  
- Executed external programs  
- Handled signals with `SIGINT`, `SIGKILL`  

---

## Example Code  
```c
pid_t pid = fork();
if (pid == 0) {
    execl("/bin/ls", "ls", NULL);
} else {
    wait(NULL);
}
```

---

## Key Takeaways  
- Mastered process lifecycle in Unix  
- Used signals and wait queues for flow control