---
sidebar: false
---
# Support Vector Machines & Dual Formulation

**Course:** CS 4375 - Machine Learning Foundations
**Topic:** Support Vector Machines (SVM), Dual Optimization, KKT Conditions
**Tools Used:** Python (manual matrix construction, no libraries) — **No scikit-learn used**

---

## Project Overview

This assignment tackled the theory and practice of **hard-margin Support Vector Machines**, emphasizing solving the **dual problem** from first principles. Rather than using built-in solvers or ML libraries, the assignment required full derivation and low-level implementation of the dual optimization problem using matrix algebra.

---

## Key Concepts Demonstrated

* Deriving the Lagrangian for SVM optimization
* Reformulating the primal as a quadratic programming (QP) dual
* Identifying support vectors using KKT conditions
* Computing weight vector and margin from dual variables

---

## Primal Formulation (Hard Margin SVM)

Given linearly separable data $\{(x_i, y_i)\}$, the primal objective is:

$\min_{w, b} \frac{1}{2} \|w\|^2 \quad \text{subject to } y_i(w^T x_i + b) \ge 1 \quad \forall i$

---

## Dual Formulation via Lagrangian

We introduce Lagrange multipliers $\alpha_i \ge 0$, and define:

$$
\mathcal{L}(w, b, \alpha) = \frac{1}{2} \|w\|^2 - \sum_i \alpha_i (y_i(w^T x_i + b) - 1)
$$

### Stationarity Conditions:

Taking gradients and setting to zero:

$\frac{\partial \mathcal{L}}{\partial w} = w - \sum_i \alpha_i y_i x_i = 0 \Rightarrow w = \sum_i \alpha_i y_i x_i$
$\frac{\partial \mathcal{L}}{\partial b} = -\sum_i \alpha_i y_i = 0$

Plugging back, the **dual becomes**:

$$
\max_\alpha \sum_i \alpha_i - \frac{1}{2} \sum_i \sum_j \alpha_i \alpha_j y_i y_j x_i^T x_j \\
\text{subject to } \sum_i \alpha_i y_i = 0, \quad \alpha_i \ge 0
$$

---

## Code: Constructing the Dual Problem (from scratch)

```python
import numpy as np

# Sample toy data (2D, linearly separable)
X = np.array([[2, 2], [4, 4], [4, 0], [0, 0]])
y = np.array([1, 1, -1, -1])
n = len(y)

# Kernel matrix (linear)
K = np.dot(X, X.T)
P = np.outer(y, y) * K
q = -np.ones(n)

# Equality constraint: sum(alpha_i y_i) = 0
A = y.reshape(1, -1)
b = np.array([0.0])

# Inequality constraints: alpha_i >= 0
G = -np.eye(n)
h = np.zeros(n)
```

*Solving the QP was done manually or using symbolic derivation in this homework — no solvers like `cvxopt` were allowed.*

---

## KKT Conditions: Identifying Support Vectors

Using the optimal $\alpha^*$, the support vectors are those for which $\alpha_i > 0$. Once we identify these:

* Compute $w = \sum_i \alpha_i y_i x_i$
* Choose any support vector $(x_i, y_i)$ to solve for $b$:
  $b = y_i - w^T x_i$

---

## Visualizing the SVM Result

```python
def plot_svm_boundary(X, y, w, b):
    plt.scatter(X[:, 0], X[:, 1], c=y)
    ax = plt.gca()
    x_vals = np.linspace(np.min(X[:,0])-1, np.max(X[:,0])+1, 100)
    y_vals = -(w[0] * x_vals + b) / w[1]
    plt.plot(x_vals, y_vals, label='SVM Boundary')
    plt.legend()
    plt.grid(True)
    plt.show()
```

---

## Reflections

This project required rigorous symbolic derivation and matrix construction, ensuring that every line of the dual optimization was both mathematically grounded and implemented without high-level abstractions. It strengthened my understanding of optimization theory and its role in modern ML classification.

---
