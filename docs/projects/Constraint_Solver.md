---
sidebar: false
---
# Constraint Solver with Forward Checking  
**Team Members:** Courtney Dickenson  
**Role:** Algorithm Design, Full Implementation, CLI Interface  
**Tools:** Python 3.11+, Terminal, Custom `.var` / `.con` parser  



## Project Overview

This project implements a **Constraint Satisfaction Problem (CSP) solver** capable of solving a variety of problems by assigning values to variables from specific domains while satisfying all defined constraints. The solver uses **backtracking search**, **forward checking**, and **variable/value ordering heuristics** to enhance efficiency and reduce backtracking.

### Key Focus Areas:

* **Generic CSP Handling** – Load custom variable and constraint definitions from external files.
* **Forward Checking** – Prune domains proactively after each assignment.
* **Heuristic Optimization** – Use **MRV**, **degree heuristic**, and **LCV** to speed up the search.

<!-- ![CSP Structure Diagram](./assets/csp_solver_structure.jpg) -->

---

## Key Contributions

* **Designed a flexible input system** using `.var` and `.con` files for easy configuration.
* **Implemented forward checking logic** to reduce the number of backtracks.
* **Integrated multiple heuristics** (MRV, degree heuristic, LCV) for intelligent variable/value selection.
* **Built a clear command-line interface** using `argparse` for streamlined usability.

---

## System Architecture

### Workflow Breakdown:

1. **Input Parsing** – Reads variable domains and constraints from files.
2. **Constraint Registration** – Stores rules like `A != B`, `C > D`, `E = F`.
3. **Backtracking Solver** – Attempts assignments while checking consistency.
4. **Forward Checking (Optional)** – Filters domains of unassigned variables.
5. **Heuristics** – Chooses next variable (MRV + Degree) and value (LCV).
6. **Branch Reporting** – Outputs paths explored, including failures and solutions.

<!-- ![Solver Flowchart](./assets/csp_solver_flow.jpg) -->

---

## Code Highlights

### 1. Constraint Consistency Check

Handles binary constraints with flexible parsing and verification.

```python
def is_consistent(var, value, assignment, constraints):
    for constraint in constraints:
        if var not in constraint["vars"]:
            continue
        other_var = [v for v in constraint["vars"] if v != var][0]
        if other_var in assignment:
            if constraint["op"] == "!=" and value == assignment[other_var]:
                return False
            if constraint["op"] == "=" and value != assignment[other_var]:
                return False
            if constraint["op"] == ">" and value <= assignment[other_var]:
                return False
            if constraint["op"] == "<" and value >= assignment[other_var]:
                return False
    return True
```

**Key Benefits:**

* **Operator-flexible** – Supports equality, inequality, and order constraints.
* **Assignment-aware** – Only evaluates fully specified constraint pairs.

---

### 2. Heuristic Variable Selection

Combines **Minimum Remaining Values (MRV)** and **Degree Heuristic**.

```python
def select_variable(variables, assignment, constraints):
    unassigned = [v for v in variables if v not in assignment]
    unassigned.sort(key=lambda var: (
        len(variables[var]),  # MRV
        -sum(1 for c in constraints if var in c["vars"])  # Degree
    ))
    return unassigned[0]
```

**Key Benefits:**

* **Smarter branching** – Focuses on the most constrained yet impactful variables.
* **Reduces unnecessary search** – Decreases likelihood of early failure.

---

## Results

### Test Cases

* **Binary Puzzle** – Passed, using backtracking only.
* **Arithmetic Inequality Set** – Solved with and without forward checking.
* **No-Solution Scenario** – Correctly terminated with failure report.

### Performance Metrics

* **Reduced backtracks** by up to 60% with heuristics.
* **Forward checking** pruned domains early and avoided invalid paths.

<!-- ![Performance Graph](./assets/performance_comparison.jpg) -->

---

## Challenges and Solutions

### 1. Domain Reduction Issues

* **Issue:** Domains were not updating correctly post-assignment.
* **Fix:** Carefully tracked domain snapshots and restored after backtracking.

### 2. Inconsistent Constraint Parsing

* **Issue:** Mismatches in file-parsed operator formats.
* **Fix:** Standardized parser to map raw input into normalized form (`!=`, `<`, `>`).

---

## Future Enhancements

* **Support n-ary constraints** for multi-variable logic conditions.
* **Visualization tool** to display search tree and domain evolution.
* **Hybrid heuristics** blending local search with backtracking.

---

## Key Takeaways

* **Modular and extensible CSP solver** built with real-world testability.
* **Performance-driven logic** via forward checking and layered heuristics.
* **User-centric input/output design** for flexible experimentation.

---
