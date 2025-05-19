---
sidebar: false
---
# Logic Programming & Search  
**Team Members:** Solo project  
**Role:** Full implementation and testing  
**Tools:** Prolog, SWI-Prolog  
**Repository:** *(private coursework – can be shared upon request)*  

---
## Project Overview  
This project involved solving complex reasoning problems using **Prolog**, a declarative logic programming language. The focus was on building **recursive rule systems**, conducting **search-based inference**, and handling symbolic representations efficiently.

### Key Focus Areas:  
- **Search Space Exploration** – Implemented recursive search strategies to traverse problem domains.  
- **Backtracking & Unification** – Leveraged Prolog’s built-in backtracking for constraint resolution.  
- **Declarative Thinking** – Shifted away from imperative logic to a rule-based mindset.  

<!-- ![Example Search Tree](./assets/prolog_search_tree.jpg) -->

---
## Key Contributions  
- Designed and implemented **recursive search predicates** for complex problem-solving.  
- Developed **custom inference rules** for multi-step logical deductions.  
- Practiced **pure Prolog syntax and constraints**, avoiding cuts or impure operations.  

---
## Example Logic  
### Family Tree Reasoning  

```prolog
parent(john, mary).
parent(mary, susan).

ancestor(X, Y) :- parent(X, Y).
ancestor(X, Y) :- parent(X, Z), ancestor(Z, Y).
