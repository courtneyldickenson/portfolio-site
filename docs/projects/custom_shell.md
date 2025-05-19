---
sidebar: false
---

# Custom Unix Shell  
**Class:** Operating Systems – Shell & Process Control  
**Author:** Courtney Dickenson  
**Tools:** C, Unix Pipes, Fork/Exec, File I/O, Wait/Signal

---

## Project Overview  
This project is a minimalist Unix shell implemented in C that supports command execution, piping between processes, and custom command handling like random motivational quotes.

Users can enter standard Unix commands or chained commands using `|`, and the shell will fork processes and wire pipes accordingly. It also loads quotes from a file and returns one on demand.

---

## Features  
- Supports basic commands (e.g., `ls`, `cat`, `grep`) via `execvp()`  
- Implements multi-stage piping (`cmd1 | cmd2 | cmd3`)  
- Includes a built-in command for random motivational quotes  
- Parses user input line-by-line using `strtok()`  
- Forks child processes and reassigns `stdin`/`stdout` with `dup2()`  

---

## Code Highlights  

### 🧠 Command Parsing and Execution

```c
void runCommand(char *command) {
    char *args[MAXLEN];
    int i = 0;

    args[i] = strtok(command, " \t\n");
    while (args[i] != NULL) {
        i++;
        args[i] = strtok(NULL, " \t\n");
    }

    execvp(args[0], args);
    perror("failed to execute");
    exit(1);
}
````

### 🔗 Pipe Logic and Child Forking

```c
void child(int i) {
    if (i > 0) dup2(fds[i-1][0], 0);           // Read end
    if (i < counter - 1) dup2(fds[i][1], 1);    // Write end

    for (int j = 0; j < counter; j++) {
        close(fds[j][0]);
        close(fds[j][1]);
    }

    runCommand(command[i]);
}
```

---

## Sample Interaction

```bash
$ ./mysh
> ls -l | grep .c | wc -l
12
> quote
“Don’t watch the clock; do what it does. Keep going.”
```

---

## Challenges

* **Pipe Coordination:** Managing file descriptor closing and reassignment between multiple child processes required precise ordering.
* **Command Tokenization:** `strtok` handling needed careful use to split commands and pipe sequences correctly.
* **Memory Safety:** Required strict buffer size control to prevent overruns on user input and file reads.

---

## Key Takeaways

* Learned how to implement process control and I/O redirection in C.
* Gained experience with `fork()`, `execvp()`, `pipe()`, and `dup2()` system calls.
* Reinforced how modern shells handle pipelining internally.
* Built confidence debugging inter-process communication in Unix environments.

---

