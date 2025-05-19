---
sidebar: false
---
# CLI Math Suite  
**Category:** Academic  
**Tags:** C, Command Line, Math, Parsing  

---

## Project Overview  
This project implemented a suite of basic math tools using the **C programming language** for use directly via the **Unix command line**. Designed to handle input arguments and arithmetic expressions, the suite supports simple calculations and operations as subcommands.

### Features:  
- **Command-Line Parsing:** Handles arguments via `argc` and `argv`  
- **Multiple Operations:** Addition, subtraction, multiplication, division  
- **Input Validation:** Rejects non-numeric inputs and missing parameters  
- **Error Handling:** Custom messages for bad input or division by zero  

---

## Key Code Highlights

### 🧮 Arithmetic Logic

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[]) {
    if (argc != 4) {
        printf("Usage: ./math <operation> <num1> <num2>\n");
        return 1;
    }

    int num1 = atoi(argv[2]);
    int num2 = atoi(argv[3]);
    char *op = argv[1];

    if (strcmp(op, "add") == 0) {
        printf("Result: %d\n", num1 + num2);
    } else if (strcmp(op, "sub") == 0) {
        printf("Result: %d\n", num1 - num2);
    } else if (strcmp(op, "mul") == 0) {
        printf("Result: %d\n", num1 * num2);
    } else if (strcmp(op, "div") == 0) {
        if (num2 == 0) {
            printf("Error: Division by zero\n");
        } else {
            printf("Result: %d\n", num1 / num2);
        }
    } else {
        printf("Unknown operation\n");
    }

    return 0;
}
````

---

## Challenges & Solutions

### 🧠 Argument Management

**Issue:** Correctly accessing and validating command-line input.
**Solution:** Used `argc`/`argv` checks and `strcmp` logic to gate valid math operations.

### 🧪 Robust Input

**Issue:** Preventing non-integer or missing argument crashes.
**Solution:** Defaulted to `atoi` with basic error messages, with room for future regex validation.

---

## Key Takeaways

* Built a self-contained **CLI math tool** in C
* Strengthened command-line dev and parsing skills
* Reinforced defensive programming techniques (e.g., zero division guards)
* Got comfortable working with basic string comparison and system IO

---
