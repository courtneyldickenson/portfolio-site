---
sidebar: false
---
# Colored Pencil Matcher + Advanced Color Database  
**Role:** Developer, Color Science Researcher, Data Architect  
**Tools:** Python, OpenCV, NumPy, Lab Color Space  

---
## Project Overview  
This ongoing personal project is an advanced color-matching assistant designed for artists who want to identify or organize their colored pencils. It uses perceptual color science to match real-world swatches to known pencil colors from a curated dataset. The long-term goal is to expand the static color reference into a dynamic, community-driven database with support for user input and automatic updates.

### Key Focus Areas:  
- **Color Matching using Lab Space** – Better perceptual similarity than RGB.  
- **Dataset Expansion Research** – Exploring ways to allow user contributions without compromising accuracy.  
- **Artist Tool Design** – Built with creatives in mind: intuitive, fast, and swatch-friendly.  


---
## Key Contributions  
- **Converted all pencil swatches into Lab color space** for accurate distance-based color matching.  
- **Built a structured color reference dataset** using Prismacolor and other major brands as a starting point.  
- **Designed matching algorithms** based on delta-E comparison and perceptual clustering.

---
## System Architecture  
### Workflow Breakdown:  
1. **Image Input** – Swatch is scanned or photographed.  
2. **Target Pixel or Region Extraction** – Selects the most saturated region or user tap.  
3. **RGB to Lab Conversion** – Translates the color using OpenCV.  
4. **Database Comparison** – Matches input to closest known Lab entry using Euclidean or delta-E distance.  
5. **Match Result Display** – Returns best-matching pencil with brand and color name.  



---
## Code Highlights  
### 1. RGB to Lab Conversion + Matching  
```python
import cv2
import numpy as np

# Convert sample RGB to Lab
sample_rgb = np.uint8([[[r, g, b]]])
sample_lab = cv2.cvtColor(sample_rgb, cv2.COLOR_RGB2Lab)[0][0]

# Match against dataset
best_match = None
min_dist = float('inf')
for name, lab_val in color_dataset.items():
    dist = np.linalg.norm(sample_lab - lab_val)
    if dist < min_dist:
        min_dist = dist
        best_match = name
print("Best match:", best_match)
```

---
## Results  
- **Accurate color matching** even for subtle shade variations.  
- **Better performance in hue separation** compared to RGB-based matching.  
- **Static color data operational**, with plans for dynamic updates.  

---
## Challenges and Solutions  
### 1. Static Dataset Limitation  
- **Issue:** New pencils require manual updates.  
- **Next Step:** Researching automated intake through user-submitted swatches.  

### 2. Light/Camera Variation  
- **Issue:** Ambient light alters scanned color.  
- **Fix:** Added gray card calibration and exposure checks.  

### 3. Label Inconsistency  
- **Issue:** Brand names and IDs are inconsistent across sources.  
- **Fix:** Created a normalized label mapping system.  

---
## Future Enhancements  
- Build a submission flow for user-labeled swatches.  
- Auto-cluster new colors using Lab delta-E thresholds.  
- Develop an artist dashboard to track and organize personal collections.  

---
## Key Takeaways  
- Lab space dramatically improves color comparison for real-world inputs.  
- Creating scalable, trustworthy color datasets is both technical and human-centric.  
- This project is still growing, with **big potential for creative tooling and ML tie-ins** down the line.

---