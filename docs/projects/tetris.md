---
sidebar: false
---
# Java Tetris Game  
**Role:** Lead Developer, Game Logic & UI Design  
**Tools:** Java, AWT/Swing, OOP, Custom Event Listeners  
**Repository:** Academic submission – full code not posted publicly to preserve course integrity, but key portions are shared below for demonstration purposes.

---
## Project Overview  
This classic Tetris implementation was built from the ground up using Java’s AWT framework and custom object-oriented architecture. The game features real-time piece movement, collision detection, full line clearing logic, and a pause/resume toggle — all rendered using Java's `Canvas` and `Graphics` classes.

### Key Focus Areas:  
- **Custom game loop** – No external libraries, just core Java and thread-based animation.  
- **OOP Design** – Clean modular classes for board, piece, and rendering logic.  
- **Event-driven controls** – Interactive gameplay using Java’s key event system.  

---
## Key Contributions  
- **Built the full game engine** with real-time tick updates and frame redraws.  
- **Implemented piece rotation and collision logic**, including edge + bottom detection.  
- **Added pause/resume, scoring, and dynamic difficulty** that scales with level.  
- **Used Java’s Canvas API** to render the board and active tetrominoes with custom coloring.  

---
## System Architecture  
### Game Loop Workflow:  
1. **Tick Timer** – A timer calls `gameTick()` at a regular interval.  
2. **Piece Logic** – The active tetromino checks if it can move down. If not, it locks and spawns a new piece.  
3. **Line Clearing** – Checks for and removes full lines from the board.  
4. **Repaint** – The canvas is redrawn based on current board state.  



---
## Code Highlights  
### 1. Main Game Tick Logic  
```java
public void gameTick() {
    if (!paused && currentPiece != null) {
        if (canMove(currentPiece, 0, 1)) {
            currentPiece.moveDown();
        } else {
            lockPiece();
            clearLines();
            spawnNewPiece();
        }
    }
    repaint();
}
```

### 2. Key Input Handling  
```java
public void keyPressed(KeyEvent e) {
    if (paused) return;

    switch (e.getKeyCode()) {
        case KeyEvent.VK_LEFT:
            if (canMove(currentPiece, -1, 0)) currentPiece.moveLeft();
            break;
        case KeyEvent.VK_RIGHT:
            if (canMove(currentPiece, 1, 0)) currentPiece.moveRight();
            break;
        case KeyEvent.VK_UP:
            currentPiece.rotateIfPossible();
            break;
        case KeyEvent.VK_DOWN:
            if (canMove(currentPiece, 0, 1)) currentPiece.moveDown();
            break;
        case KeyEvent.VK_P:
            paused = !paused;
            break;
    }
    repaint();
}
```

### 3. Board Rendering with AWT  
```java
@Override
public void paint(Graphics g) {
    for (int row = 0; row < boardHeight; row++) {
        for (int col = 0; col < boardWidth; col++) {
            if (board[row][col] != 0) {
                g.setColor(getColorForValue(board[row][col]));
                g.fillRect(col * blockSize, row * blockSize, blockSize, blockSize);
            }
        }
    }

    if (currentPiece != null) {
        currentPiece.draw(g);
    }

    if (paused) {
        g.setColor(new Color(0, 0, 0, 150));
        g.fillRect(0, 0, getWidth(), getHeight());
        g.setColor(Color.WHITE);
        g.drawString("Paused", getWidth() / 2 - 20, getHeight() / 2);
    }
}
```

---
## Results  
- **Fully playable Tetris clone** with rotation, collision, score, and line clearing.  
- **Responsive controls** that match real-time key input and tick intervals.  
- **Runs on any system** with Java 8+ — no dependencies or libraries needed.  

---
## Challenges and Solutions  
### 1. Piece Collision Edge Cases  
- **Issue:** Rotations near walls caused clipping or overlap.  
- **Fix:** Added boundary checks and rotation constraints.  

### 2. Redrawing Lag  
- **Issue:** Canvas lagged behind during rapid inputs.  
- **Fix:** Reduced frame delay and separated tick + render timers.  

### 3. Pause and Resume State Bugs  
- **Issue:** Game state desynced on multiple pause toggles.  
- **Fix:** Centralized pause logic and disabled user input while paused.  

---
## Future Enhancements  
- Add a start screen and high score tracker.  
- Implement multiplayer or ghost piece preview.  
- Port to web using Java Applet or convert to JavaFX.  

---
## Key Takeaways  
- Building classic games from scratch builds **strong mental models** of UI state management.  
- Java’s GUI stack is powerful but requires **manual optimization** for responsiveness.  
- Even small games benefit from **clean separation of logic and rendering**.

---
