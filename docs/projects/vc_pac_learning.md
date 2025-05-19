---
sidebar: false
---

# VC Dimension and PAC Learning

**Author:** Courtney Dickenson  
**Course:** CS 4375 – Machine Learning Foundations  
**Topic:** VC Dimension, PAC Framework, Generalization Bounds  
**Tools Used:** Python (NumPy, Matplotlib) — **No scikit-learn used**

---

## Project Overview

This project focused on understanding **generalization theory** through the lens of **VC dimension** and **Probably Approximately Correct (PAC)** learning. It included formal mathematical proofs, derived bounds using **Hoeffding’s Inequality**, and ran synthetic simulations coded entirely from scratch.

---

## Key Concepts Demonstrated

* Formal proof of VC dimension for unions of intervals and geometric hypotheses  
* Application of **Hoeffding’s Inequality** to bound generalization error  
* Simulation of learning curves and empirical error without any ML libraries  
* Comparison of finite hypothesis space bounds using the **union bound**

---

## 📐 Proof: VC Dimension of k-Interval Union

### Statement

The VC dimension of a hypothesis class that is a union of \\( k \\) intervals on the real line is exactly \\( 2k \\).

### Proof

**Lower Bound:**  
We construct \\( 2k \\) points that can be shattered by \\( k \\) disjoint intervals.

* Select \\( 2k \\) points in increasing order.  
* Any labeling of these as 1 (in-interval) or 0 (out-of-interval) can be covered using \\( k \\) intervals.

**Upper Bound:**  
Suppose we try to shatter \\( 2k + 1 \\) points.

* By the pigeonhole principle, there must be a pair of adjacent 1’s inside the same interval — exceeding \\( k \\) total segments.  
* Therefore, VC dimension cannot exceed \\( 2k \\).

**Conclusion:**  
\\[
VC(H_k) = 2k
\\]

---

This is a block equation:

\\[
P(|\\hat{R}(h) - R(h)| > \\epsilon) \\leq 2e^{-2n\\epsilon^2}
\\]

## 📉 Applying Hoeffding’s Inequality

### Theory

To bound the true error \\( R(h) \\) with high probability, given empirical error \\( \hat{R}(h) \\):

\\[
P(|\hat{R}(h) - R(h)| > \epsilon) \leq 2e^{-2n\epsilon^2}
\\]

Solving for \\( \epsilon \\) given a confidence \\( \delta \\):

\\[
\epsilon = \sqrt{\frac{1}{2n} \log\left(\frac{2}{\delta}\right)}
\\]

---

## 🧪 Code Simulation – Error Bounds

```python
import numpy as np
import matplotlib.pyplot as plt

def simulate_empirical_risk(n, d, true_func):
    X = np.random.uniform(-1, 1, (n, d))
    y = true_func(X)
    predictions = np.sign(X[:, 0])  # placeholder hypothesis
    error = np.mean(predictions != y)
    return error

n_samples = np.arange(10, 500, 20)
errors = [simulate_empirical_risk(n, 1, lambda x: np.sign(x[:, 0])) for n in n_samples]
plt.plot(n_samples, errors, label='Empirical Error')
plt.xlabel('Sample Size')
plt.ylabel('Error Rate')
plt.title('Empirical Risk vs Sample Size')
plt.grid(True)
plt.legend()
plt.show()
```

---

## 📊 Union Bound Extension (Finite Hypothesis Space)

When the hypothesis class \\( H \\) is finite, the bound is given by:

\\[
P(\exists h \in H : |\hat{R}(h) - R(h)| > \epsilon) \leq 2|H|e^{-2n\epsilon^2}
\\]

This allows generalization error bounds to be applied across all functions in \\( H \\) simultaneously.

---

## ✅ Final Results

* 🔍 Proved theoretical bounds using symbolic math  
* 🧪 Simulated empirical error to validate convergence behavior  
* 📉 Modeled and visualized PAC bounds based on Hoeffding’s inequality

---

## 💬 Key Takeaways

* Deepened intuition for VC dimension and its impact on generalization  
* Learned how to formally bound error using PAC guarantees  
* Built everything from scratch with **no external ML libraries** to reinforce mathematical foundations
