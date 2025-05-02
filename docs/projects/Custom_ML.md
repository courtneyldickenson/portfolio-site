---
sidebar: false
---
# Custom ML: SVM, PCA, Boosting  
**Role:** Machine Learning Engineer, Algorithm Designer  
**Tools:** Python, NumPy, Matplotlib  

---
## Project Overview  
This project involved implementing several foundational machine learning models — **Support Vector Machines (SVM)**, **Principal Component Analysis (PCA)**, and **Boosting** — entirely from scratch. The work was part of a rigorous academic deep-dive into ML fundamentals, with a strict rule: no use of libraries like `scikit-learn`. Everything from gradient descent to matrix decomposition was hand-coded and debugged.

### Key Focus Areas:  
- **Mathematical Implementation** – Translated ML theory directly into working Python code.  
- **From-Scratch Optimization** – Implemented gradient updates, dual formulations, and projection steps manually.  
- **Model Evaluation and Visualization** – Used custom metrics and plots to evaluate performance.


---
## Key Contributions  
- **Coded a working soft-margin SVM** with support for kernel extensions and slack variables.  
- **Implemented PCA** via eigen decomposition for dimensionality reduction and visualization.  
- **Created an ensemble boosting system** using exponential loss and weak learners.  
- **Wrote custom plotting scripts** to visualize decision boundaries and transformed spaces.  

---
## Code Highlights  
### 1. Soft-Margin SVM (Primal Form)  
```python
def hinge_loss_gradient(w, X, y, C):
    margins = 1 - y * (X @ w)
    grad = w - C * (X.T @ (y * (margins > 0)))
    return grad

# Gradient descent loop
for _ in range(epochs):
    grad = hinge_loss_gradient(w, X, y, C)
    w -= learning_rate * grad
```

### 2. PCA with Eigen Decomposition  
```python
# Center and compute covariance
X_centered = X - np.mean(X, axis=0)
cov = np.cov(X_centered, rowvar=False)

# Eigenvectors sorted by eigenvalues
eigvals, eigvecs = np.linalg.eigh(cov)
idx = np.argsort(eigvals)[::-1]
principal_components = eigvecs[:, idx[:k]]
X_pca = X_centered @ principal_components
```

### 3. Exponential Loss Boosting  
```python
def exponential_loss(y_true, y_pred):
    return np.exp(-y_true * y_pred).mean()

# Weighted training and model update loop
for i in range(num_iterations):
    clf = train_weak_learner(X, y, sample_weights)
    pred = clf.predict(X)
    error = (sample_weights * (pred != y)).sum()
    alpha = 0.5 * np.log((1 - error) / (error + 1e-10))
    sample_weights *= np.exp(-alpha * y * pred)
    sample_weights /= sample_weights.sum()
```

---
## Results  
- Achieved **competitive accuracy** with hand-built models on benchmark datasets.  
- Plotted **decision surfaces, loss curves, and dimensional projections** with Matplotlib.  
- Gained deep understanding of **optimization logic and model assumptions**.  

---
## Challenges and Solutions  
### 1. Numerical Instability in PCA  
- **Issue:** Small eigenvalues led to noisy projections.  
- **Fix:** Used centered data and verified eigenvector orthogonality.  

### 2. SVM Optimization Divergence  
- **Issue:** Gradient exploded when learning rate was too high.  
- **Fix:** Tuned learning rate + added soft margin slack terms.  

### 3. Boosting Overfitting  
- **Issue:** Training loss decreased while test accuracy dropped.  
- **Fix:** Added early stopping based on validation performance.  

---
## Future Enhancements  
- Add visualization of margin width and support vectors.  
- Implement kernel PCA and RBF SVM for nonlinear feature spaces.  
- Refactor into reusable class-based modules for educational use.  

---
## Key Takeaways  
- Implementing ML from scratch helps reinforce **math intuition** behind models.  
- Visualization is crucial for interpreting model behavior and debugging.  
- Boosting techniques can outperform standalone models — if tuned carefully.

---
