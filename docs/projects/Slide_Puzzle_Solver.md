---

## sidebar: false
---
# Slide Puzzle Solver

**Team Members:** Courtney Dickenson  
**Role:** Search Algorithm Design, Heuristic Engineering, Puzzle Modeling  
**Tools:** Python, PriorityQueue, Dataclasses, DFS, IDS, A\* Search  

---

## Project Overview

This project addresses the classic **slide puzzle problem**: a 3x3 grid of tiles numbered 1–8 and a blank space. The goal is to transform a given initial configuration into a desired goal state through valid tile moves.

Three search strategies were implemented to solve this:

* **Depth-First Search (DFS)**
* **Iterative Deepening Search (IDS)**
* **A\* Search** with two admissible heuristics

### Key Focus Areas:

* **Tree Search Architecture** – Nodes represent board states with tracked moves and depth.
* **Search Strategy Evaluation** – Comparison of search performance across DFS, IDS, and A\*.
* **Heuristic Design** – Incorporates misplaced tile count and Manhattan distance.

<!-- ![Puzzle Board Representation](./assets/slide_puzzle_grid.jpg) -->

---

## Key Contributions

* **Built a Node class** with parent links and move history to trace solution paths.
* **Implemented DFS and IDS algorithms** with cycle detection and depth control.
* **Developed a robust A\* Search engine** using `PriorityQueue` with heuristic weighting.
* **Designed two effective heuristics** for evaluating tile positions.

---

## System Architecture

### Puzzle Solver Workflow:

1. **User Input** – Accepts initial and goal board configurations.
2. **Node Generation** – States are represented as Nodes, with swap-based move logic.
3. **Search Algorithm Execution** – DFS, IDS, and A\* are run independently.
4. **Path Reconstruction** – Once a goal is reached, the solution path is backtracked.
5. **Results Display** – Prints board states step-by-step with total moves.

<!-- ![Slide Puzzle Flowchart](./assets/slide_puzzle_solver_flow.jpg) -->

---

## Algorithm Strategies

### 1. Depth-First Search (DFS)

Explores as deep as possible before backtracking, limited by a max depth.

**Pros:** Simple and memory-efficient
**Cons:** Can get stuck in deep paths without reaching the goal

### 2. Iterative Deepening Search (IDS)

Combines DFS with incremental depth limits to ensure completeness.

**Pros:** Finds optimal paths with low memory overhead
**Cons:** Repeats nodes multiple times

### 3. A\* Search with Heuristics

Searches based on path cost + heuristic estimate of distance to goal.

**Heuristic 1 – Misplaced Tiles**:
Counts tiles out of place.

```python
def heuristic1(state, goal):
    return sum([1 for i in range(9) if state[i] != goal[i]])
```

**Heuristic 2 – Manhattan Distance**:
Sums distance of each tile from its goal position.

```python
def heuristic2(state, goal):
    def gridVector(tile):
        return divmod(tile, 3) if tile != 0 else (0, 0)
    return sum([abs(gridVector(state[i])[0] - gridVector(goal[i])[0]) +
                abs(gridVector(state[i])[1] - gridVector(goal[i])[1])
                for i in range(9) if state[i] != goal[i]])
```

**Pros:** Informed search, fast convergence
**Cons:** Performance depends heavily on heuristic quality

---

## Results

* **DFS**: Found solution within depth limit but not optimal.
* **IDS**: Consistently found shortest path with moderate runtime.
* **A\***: Fastest with `heuristic2`, outperforming other strategies in node expansion.

<!-- ![Algorithm Performance Comparison](./assets/slide_puzzle_results.jpg) -->

---

## Challenges and Solutions

### 1. Preventing Cycles in DFS

* **Fix:** Used hashable state representation and a visited set.

### 2. Accurate Distance Heuristic

* **Fix:** Mapped tile positions using index math instead of hardcoding.

### 3. Backtracking Path

* **Fix:** Maintained parent references in Node objects and reversed post-traversal.

---

## Future Enhancements

* **Support for different puzzle sizes** (e.g., 15-puzzle).
* **Interactive visualization** of the puzzle-solving process.
* **Dynamic heuristic selection** based on test case complexity.

---

## Key Takeaways

* **Classic search strategies** can solve combinatorial puzzles efficiently.
* **Heuristic design is critical** for performant informed search.
* **Clean Node architecture** enabled easy experimentation with search algorithms.

---
