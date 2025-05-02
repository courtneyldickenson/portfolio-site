---
sidebar: false
---
# COLMAP 3D Reconstruction  
**Role:** Developer, Pipeline Architect, 3D Point Cloud Engineer  
**Tools:** Python, pycolmap, SQLite, OpenCV, Meshroom, PLY/OBJ Export  


---
## Project Overview  
This project uses COLMAP (Structure-from-Motion and Multi-View Stereo) to reconstruct 3D environments from 2D images. By integrating the `pycolmap` Python bindings and a custom SQLite-based feature database, I created a fully scripted pipeline that outputs dense point clouds and textured models. The system mimics the functionality of COLMAP's GUI in a fully automated, code-based setup.

### Key Focus Areas:  
- **Automated SfM + MVS pipeline** – Camera poses, depth maps, and mesh fusion, all script-driven.  
- **Database-first approach** – Feature matches and camera intrinsics inserted manually using SQL.  
- **Export-ready results** – Final models exported as `.ply` or `.obj` for use in Blender or printing.  



---
## Key Contributions  
- **Created a full Python pipeline** for 3D reconstruction using `pycolmap` and SQLite.  
- **Inserted ORB keypoints and matches** manually into COLMAP’s database structure.  
- **Triggered SfM and MVS steps** directly via Python APIs.  
- **Handled depth fusion and model export**, producing clean .ply point clouds.  

---
## System Architecture  
### Step-by-Step Flow:  
1. **Image Import** – Photos are read and assigned camera intrinsics manually.  
2. **Feature Extraction** – ORB features are extracted using OpenCV and inserted into COLMAP's SQLite DB.  
3. **Feature Matching** – Custom matcher populates match table with valid image pairs.  
4. **Structure-from-Motion** – Sparse reconstruction estimates camera poses and keypoints.  
5. **Multi-View Stereo** – Produces dense depth maps using image consistency.  
6. **Model Fusion** – Converts depth maps into a dense fused point cloud and mesh.  


---
## Code Highlights  
### 1. Inserting Images into COLMAP DB  
```python
conn = sqlite3.connect('database.db')
cursor = conn.cursor()

# Add camera model
cursor.execute("""
INSERT INTO cameras (camera_id, model, width, height, params, prior_focal_length)
VALUES (?, ?, ?, ?, ?, ?)
""", (1, 1, 1920, 1080, '1000.0,960.0,540.0', 1))

# Add images
for idx, image_path in enumerate(image_list):
    cursor.execute("""
    INSERT INTO images (image_id, name, camera_id) VALUES (?, ?, ?)
    """, (idx + 1, os.path.basename(image_path), 1))
conn.commit()
```

### 2. Running SfM + MVS Programmatically  
```python
import pycolmap

# Sparse reconstruction
sfm_result = pycolmap.incremental_mapping(database_path='database.db', image_path='images', output_path='sparse')

# Dense reconstruction
pycolmap.stereo.run_patch_match_stereo(sfm_result)
pycolmap.stereo.run_fusion(output_path='dense')
```

---
## Results  
- **Accurate camera pose estimation** across real-world photosets  
- **Dense point clouds** exported in PLY format, importable into Blender  
- **Fully automated reconstruction**, no GUI usage required  

---
## Challenges and Solutions  
### 1. Understanding COLMAP’s Schema  
- **Issue:** SQLite structure isn’t documented officially.  
- **Fix:** Reverse-engineered table formats and used working `.db` examples for comparison.  

### 2. Match Accuracy  
- **Issue:** Poor match quality caused sparse maps to fail.  
- **Fix:** Tuned ORB parameters and filtered low-confidence matches.  

### 3. Depth Map Noise  
- **Issue:** MVS depth maps were noisy in poorly lit areas.  
- **Fix:** Added preprocessing filters and masked edge pixels.  

---
## Future Enhancements  
- Replace ORB with learned features like SuperPoint or D2-Net  
- Add camera rig calibration support for multi-view sequences  
- Export to glTF for web-based 3D visualization  

---
## Key Takeaways  
- Building this pipeline from scratch helped demystify COLMAP’s architecture.  
- Python integration allows full control of SfM/MVS workflows.  
- The fusion of **computer vision, 3D geometry, and database logic** makes this a standout portfolio project.

---