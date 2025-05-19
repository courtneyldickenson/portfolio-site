---
sidebar: false
---
# C Socket Programming Assignment  
**Category:** Academic  
**Tags:** C, Networking, Sockets, Linux  

---

## Project Overview  
This assignment involved writing a simple client-server communication setup using **C sockets** on a **Linux environment**. The goal was to practice low-level networking concepts, data transmission, and Unix system calls in C.

### Features:  
- Built using **TCP/IP socket** APIs  
- Command-line interface for both server and client  
- Echo server functionality with message confirmation  
- Graceful connection teardown  

---

## Key Code Highlights

### 🔌 Server Setup

```c
int server_fd, new_socket;
struct sockaddr_in address;
int opt = 1;
int addrlen = sizeof(address);

server_fd = socket(AF_INET, SOCK_STREAM, 0);
setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR | SO_REUSEPORT, &opt, sizeof(opt));
address.sin_family = AF_INET;
address.sin_addr.s_addr = INADDR_ANY;
address.sin_port = htons(PORT);

bind(server_fd, (struct sockaddr *)&address, sizeof(address));
listen(server_fd, 3);
new_socket = accept(server_fd, (struct sockaddr *)&address, (socklen_t*)&addrlen);
````

---

### 💬 Client Sending Message

```c
int sock = 0;
struct sockaddr_in serv_addr;
char *hello = "Hello from client";
char buffer[1024] = {0};

sock = socket(AF_INET, SOCK_STREAM, 0);
serv_addr.sin_family = AF_INET;
serv_addr.sin_port = htons(PORT);
inet_pton(AF_INET, "127.0.0.1", &serv_addr.sin_addr);

connect(sock, (struct sockaddr *)&serv_addr, sizeof(serv_addr));
send(sock, hello, strlen(hello), 0);
read(sock, buffer, 1024);
```

---

## Challenges & Learning

* Gained deeper understanding of **blocking vs non-blocking** socket modes
* Debugged common socket errors like `Address already in use` using `setsockopt`
* Practiced with **network byte order** and proper use of `htons`, `inet_pton`, and `bind`

---

## Key Takeaways

* Gained hands-on experience with low-level socket API
* Practiced working in a Linux CLI dev environment using `gcc` and `make`
* Built confidence debugging server-client protocols using terminal and logs

---

