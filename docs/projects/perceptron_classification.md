---
sidebar: false
---

# Problem Set 2: Perceptron and Linear Classification

**Course:** CS 4375 - Machine Learning Foundations
**Topic:** Perceptron Algorithm, Linearly Separable Data, Mistake Bound Proofs
**Tools Used:** Python (NumPy), Matplotlib — **No scikit-learn used**

---

## Project Overview

This assignment focused on implementing the **Perceptron Learning Algorithm** entirely from scratch and analyzing its behavior both empirically and theoretically. The goal was to understand not just the algorithm's mechanics, but also the mathematical guarantees behind its convergence and correctness when operating on linearly separable datasets.

---

## Key Concepts Demonstrated

* Implementation of the perceptron algorithm using only NumPy
* Construction of synthetic linearly separable datasets
* Visualization of the classification boundary and decision regions
* Proof of convergence bound in terms of margin ($\gamma$) and data radius ($R$)
* Application of dot product and vector projections to updates

---

## Algorithm Implementation (Perceptron)

```python
import numpy as np
import matplotlib.pyplot as plt

# Binary labels {-1, 1}, 2D points
X = np.array([[1, 1], [2, 3], [3, 3], [-1, -2], [-2, -3], [-3, -1]])
y = np.array([1, 1, 1, -1, -1, -1])

def perceptron(X, y, epochs=100):
    w = np.zeros(X.shape[1])
    b = 0
    for _ in range(epochs):
        for xi, yi in zip(X, y):
            if yi * (np.dot(w, xi) + b) <= 0:
                w += yi * xi
                b += yi
    return w, b

w, b = perceptron(X, y)
print("Weight vector:", w)
print("Bias:", b)
```

### Resulting Decision Boundary

The decision boundary is defined by:

$w^T x + b = 0$

To visualize:

```python
def plot_boundary(w, b):
    x_vals = np.linspace(-4, 4, 100)
    y_vals = -(w[0] * x_vals + b) / w[1]
    plt.plot(x_vals, y_vals, label="Decision Boundary")
    plt.scatter(X[:,0], X[:,1], c=y)
    plt.axhline(0, color='gray', linestyle='--')
    plt.axvline(0, color='gray', linestyle='--')
    plt.legend()
    plt.grid(True)
    plt.show()

plot_boundary(w, b)
```

---

## Mathematical Proof: Mistake Bound Theorem

**Theorem:** Let $D = \{(x_1, y_1), \ldots, (x_n, y_n)\}$ be linearly separable with margin $\gamma$, and $\|x_i\| \le R$. Then the perceptron makes at most $(R/\gamma)^2$ mistakes.

### Proof Sketch:

Let $w_t$ be the weight vector after $t$ mistakes, and let $u$ be the unit vector of the true separator:

1. Each mistake updates: $w_{t+1} = w_t + y_i x_i$
2. Taking dot product: $w_{t+1} \cdot u \ge w_t \cdot u + \gamma$
   \Rightarrow After $T$ mistakes: $w_T \cdot u \ge T \gamma$
3. But $\|w_T\|^2 \le T R^2$
4. Using Cauchy-Schwarz: $w_T \cdot u \le \|w_T\| \cdot \|u\| = \|w_T\|$

$$
T \gamma \le \|w_T\| \le \sqrt{T} R \Rightarrow T \le \left( \frac{R}{\gamma} \right)^2
$$

Thus the perceptron converges in finite time if data is linearly separable.

---

## Reflections

This assignment provided deep insight into how simple vector operations form the basis of powerful learning algorithms. Implementing everything without any library support reinforced understanding of the **mathematics behind classification** and provided confidence in interpreting and proving convergence properties.
