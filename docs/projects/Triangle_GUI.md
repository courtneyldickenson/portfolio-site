---
sidebar: false
---
# Java Triangle Inclusion GUI  
**Category:** Academic  
**Tags:** Java, GUI, Geometry, AWT  

---

## Project Overview  
This project is a **Java AWT-based graphical application** that lets users draw a triangle and test whether a point lies inside it. It reinforces 2D geometry logic, GUI handling, and basic event-driven programming in Java.

### Key Features:  
- **Interactive Point Testing** – Users click to define triangle vertices and test points.  
- **Graphical Feedback** – Points inside the triangle are shown in green, outside in red.  
- **Custom Canvas Drawing** – Built from scratch using Java AWT `Canvas` and `Graphics` classes.

---

## Code Highlights

### 🖼️ Triangle Inclusion Logic

```java
public boolean isPointInTriangle(Point p, Point a, Point b, Point c) {
    double area = triangleArea(a, b, c);
    double area1 = triangleArea(p, b, c);
    double area2 = triangleArea(a, p, c);
    double area3 = triangleArea(a, b, p);
    
    return Math.abs(area - (area1 + area2 + area3)) < 0.01;
}

private double triangleArea(Point p1, Point p2, Point p3) {
    return Math.abs((p1.x*(p2.y - p3.y) + 
                     p2.x*(p3.y - p1.y) + 
                     p3.x*(p1.y - p2.y)) / 2.0);
}
````

### 🖱️ Mouse Interaction & Canvas Repaint

```java
canvas.addMouseListener(new MouseAdapter() {
    public void mouseClicked(MouseEvent e) {
        if (points.size() < 3) {
            points.add(e.getPoint());
        } else {
            testPoint = e.getPoint();
        }
        canvas.repaint();
    }
});

public void paint(Graphics g) {
    if (points.size() == 3) {
        g.drawPolygon(new int[]{p1.x, p2.x, p3.x}, 
                      new int[]{p1.y, p2.y, p3.y}, 3);

        if (testPoint != null) {
            boolean inside = isPointInTriangle(testPoint, p1, p2, p3);
            g.setColor(inside ? Color.GREEN : Color.RED);
            g.fillOval(testPoint.x - 3, testPoint.y - 3, 6, 6);
        }
    }
}
```

---

## Challenges & Solutions

### 🔺 Geometric Accuracy

**Issue:** Floating-point rounding errors in area comparisons.
**Fix:** Used `Math.abs(diff) < 0.01` for safe threshold checks.

### 🖱️ Event Handling

**Issue:** Tracking which point was a triangle vertex vs test point.
**Fix:** Used conditional logic to distinguish input order and limit vertex input to 3.

---

## Key Takeaways

* Learned to implement basic **computational geometry** in Java
* Built confidence working with **custom painting and user interaction**
* Reinforced math concepts like triangle area and coordinate geometry
* Practiced GUI programming using only **AWT**, without external libraries

---
