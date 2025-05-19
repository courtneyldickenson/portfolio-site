---
sidebar: false
---
# Uncooked Chicken Nuggets – Side-Scroller Game  
**Team Members:** Courtney Dickenson, Kristine Carrol, Grace Lynch, Ryan Farley, Tracy Huynh   
**Role:** Game Design, Physics Logic, Collectible System, Sound Integration  
**Tools:** Godot Engine, GDScript, Pixel Art, Open Game Art Assets  

---

## Project Overview  
A quirky, fast-paced **2D platformer** created for a graphics programming class. “Uncooked Chicken Nuggets” features absurd visuals, comedic sound effects, and collectible egg mechanics. The game focuses on **sprite animation**, **physics-driven movement**, and **dynamic UI updates** via **Godot’s signal system**.

---

## Core Gameplay  
- 🐔 Navigate frying pans, knife traps, and boiling oil  
- 🥚 Collect eggs for points  
- 🎮 Avoid hazards and reach the end of each level  
- 🔊 Fun audio feedback for every interaction  

<!-- ![Game Screenshot](./assets/uncooked_nuggets_gameplay.png) -->

---

## Key Features  

- **Custom Platforming Physics**  
  Fine-tuned gravity, momentum, and air control.

- **Egg Collection & UI Binding**  
  Collectible eggs use **signals** to update the on-screen egg counter in real time.

- **Modular Level Design**  
  Levels use reusable scenes for traps, enemies, and collectibles.

---

## Code Highlights  

### 1. Egg Collection with Signals  
```gdscript
extends Area2D

signal collected

func _on_egg_body_entered(body):
    if body.is_in_group("Player"):
        print("Signal emitted: Egg collected!")
        emit_signal("collected")
        queue_free()
````

### 2. HUD Signal Receiver

```gdscript
extends CanvasLayer

var egg_count = 0

func _on_egg_collected():
    egg_count += 1
    $EggCounterLabel.text = "Eggs: " + str(egg_count)
```

### 3. Connecting All Egg Signals

```gdscript
extends Node2D

func _ready() -> void:
    for egg in get_tree().get_nodes_in_group("eggs"):
        if egg.has_signal("collected"):
            egg.connect("collected", Callable($HUD, "_on_egg_collected"))
```

### 4. Player Movement with Jump Logic

```gdscript
extends CharacterBody2D

const GRAVITY = 800
const JUMP_FORCE = -350

func _physics_process(delta):
    if not is_on_floor():
        velocity.y += GRAVITY * delta
    if Input.is_action_just_pressed("jump") and is_on_floor():
        velocity.y = JUMP_FORCE
    move_and_slide()
```

---

## Challenges and Fixes

### 🥚 Signal Confusion

* **Issue:** Eggs wouldn’t always trigger the counter update.
* **Fix:** Ensured that all eggs were added to the `"eggs"` group and had the `collected` signal connected at runtime.

### 🎯 Collision Inaccuracy

* **Issue:** Player hitboxes were misaligned, making platforming frustrating.
* **Fix:** Refined `CollisionShape2D` bounds and normalized physics tick rate.

### 🧃 Juice & Feedback

* **Issue:** Game felt flat without sound or feedback.
* **Fix:** Added sound effects, squish animations, and counter bounce effect to polish feel.

---

## Results

* ✅ Complete multi-level game demo with full physics and UI
* 🔁 Built-in egg collection system with working HUD
* 🔊 Audio-visual feedback on all major interactions
* 🎨 Custom sprites + reused pixel assets

---

## Future Enhancements

* Add power-ups like nugget shields or hot sauce boosts
* Include enemies and hit-point system
* Refactor into a modular level loader for easier expansion
* Add final boss: *The Deep Fryer King*

---

## Key Takeaways

* Signals in **Godot** are powerful for UI and gameplay decoupling
* Building juice (sound, motion, feedback) made the game exponentially more fun
* Learned structured scene hierarchies and reusability through Godot’s node system
* Project taught key concepts in **game physics**, **UX**, and **event handling**

---

