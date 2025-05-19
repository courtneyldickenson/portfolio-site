---
sidebar: false
---
# String Comparison Tool (C)  
**Category:** Academic  
**Tags:** C, CLI, Pointer Arithmetic, File I/O  

---

## Project Overview  
This C-based command-line utility efficiently compares strings from a file or user input. It uses **pointer arithmetic** to navigate and match content, demonstrating both low-level memory handling and real-world CLI utility construction.

### Features:  
- **File Input Parsing:** Reads lines or strings from a text file  
- **Pointer-Based String Comparison:** Manual `char*` navigation  
- **Match Reporting:** Identifies full or partial string matches  
- **Error Checks:** Ensures input is well-formed and buffer-safe  

---

## Code Highlights

### 📂 Reading and Comparing Strings

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_LINE 256

int main(int argc, char *argv[]) {
    if (argc != 3) {
        printf("Usage: ./compstr <file> <target_string>\n");
        return 1;
    }

    FILE *file = fopen(argv[1], "r");
    if (!file) {
        perror("Error opening file");
        return 2;
    }

    char line[MAX_LINE];
    char *target = argv[2];

    while (fgets(line, MAX_LINE, file)) {
        char *p = line;
        while (*p) {
            if (strncmp(p, target, strlen(target)) == 0) {
                printf("Match found: %s", line);
                break;
            }
            p++;
        }
    }

    fclose(file);
    return 0;
}
````

---

## Challenges & Solutions

### 🔍 Manual String Comparison

**Issue:** Required comparing strings without built-in utilities like regex.
**Fix:** Used `strncmp()` along with a `char*` pointer that increments through each line.

### 📚 Buffer Management

**Issue:** Overflow risk while reading lines.
**Fix:** Capped each read using `fgets()` and `MAX_LINE` macros.

---

## Key Takeaways

* Strengthened understanding of **pointer math** and **manual memory scanning**
* Practiced safe file I/O in C using `fopen`, `fgets`, and error handling
* Reinforced the importance of input validation and memory boundaries
* Built a reusable utility for lightweight text scanning and analysis

---

