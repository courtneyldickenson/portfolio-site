---
sidebar: false
---
# Named Pipe Communication  
**Coursework:** Unix Systems Programming  
**Tools:** C, FIFO, mkfifo  

---

## Project Overview  
Demonstrates **inter-process communication** using named pipes (FIFOs). Two separate processes communicate via a shared pipe.

---

## Key Features  
- Read/write synchronization  
- Safe pipe cleanup and creation  
- Shell-driven testing interface  

---

## Sample Snippet  
```c
mkfifo("myfifo", 0666);
int fd = open("myfifo", O_WRONLY);
write(fd, "hello", 5);
```

---

## Key Takeaways  
- Gained practical IPC experience  
- Improved understanding of process coordination