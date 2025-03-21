# Generative Steganography System  
**Team Members:** Ryan Farley, Courtney Dickenson, Ariel Ong, Tushar Wani  
**Role:** Feature Extraction, SURF Implementation, Parallel Processing  
**Tools:** Python, Google Colab, SDXL Turbo, OpenCV, Fractional Fourier Chebyshev Moments (FrCHFMs)  
**Repository:** [GitHub - GSIM-Backend](https://github.com/R-D-Team-7/GSIM-Backend)  

---

## Project Overview  
This project explores **coverless steganography** – embedding secret messages in **AI-generated images** without modifying the carrier medium. By leveraging **robust feature extraction** methods like **SURF descriptors** and **FrCHFMs**, the system enhances resilience against **geometric attacks** (rotation, scaling, cropping).  

### Key Focus Areas:  
- **AI-Generated Image Steganography** – No alterations to the image, ensuring covert communication.  
- **Geometric Attack Resistance** – Secure against transformations that typically break traditional steganography.  
- **High-Capacity Encoding** – Messages up to **576 bits** concealed efficiently across image sets.  

---

## Key Contributions  
- **Engineered a complete steganography pipeline** to encode and extract messages seamlessly.  
- **Implemented SURF-based feature extraction** to withstand geometric transformations.  
- **Optimized for speed** by parallelizing keypoint detection with Python's `ThreadPoolExecutor`.  
- **Developed amplitude mapping algorithms** for encoding binary sequences into generated images.  

---

## System Architecture  
**Workflow Breakdown:**  
1. **Secret Message Input** – Users input the message to be hidden.  
2. **Binary Conversion** – Message is transformed into binary segments.  
3. **AI Prompt Generation** – Images are created using AI models for each binary segment.  
4. **Feature Extraction (SURF + FrCHFM)** – Features encode binary values into images.  
5. **Stego Image Assembly & Transfer** – Encoded images are bundled and sent.  
6. **Message Extraction at Receiver End** – The receiver extracts the hidden message by regenerating image features.  

---

## Code Highlights  

### 1. SURF-Based Feature Extraction 

One of the core components of our Generative Steganography System (GSIM) is the **SURF-based feature extraction**. This method enhances the system's resilience against geometric attacks by detecting keypoints robustly across different image scales. Below is a highlight of the `calculate_surf_descriptors` function, which is responsible for computing descriptors and generating binary sequences from image data.


```python
# SURF feature extraction for keypoint detection and description
def calculate_surf_descriptors(image, threshold=0.1, num_scales=4, grid_size=10, binary_threshold=0.5, num_top_keypoints=20):
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    pyramid = build_image_pyramid(gray_image, num_scales=num_scales)
    all_keypoints = []

    # Build the keypoints list from different scales
    for scale_idx, scaled_image in enumerate(pyramid):
        scale_factor = 1.2 ** scale_idx
        integral_image = compute_integral_image(scaled_image)
        keypoints = detect_keypoints(integral_image, threshold, scaled_image, scale_factor)
        # Append keypoints with scaled positions
        all_keypoints.extend([(kp[0] * scale_factor, kp[1] * scale_factor, kp[2], scale_idx) for kp in keypoints])

    # Apply non-maximum suppression to filter keypoints
    keypoints = non_max_suppression(all_keypoints, grid_size=grid_size)

    # Sort keypoints by the determinant (det) in descending order
    sorted_keypoints = sorted(keypoints, key=lambda x: x[2], reverse=True)

    # Convert to OpenCV KeyPoint format for further processing
    points2f = np.array([(k[0], k[1]) for k in sorted_keypoints], dtype=np.float32)
    keypoints_cv2 = cv2.KeyPoint_convert(points2f, size=1.0)

    # Extract descriptors for refined keypoints
    descriptors = extract_descriptors_parallel(keypoints_cv2, gray_image)

    # Generate binary sequence based on top descriptors and binary threshold
    binary_sequence = generate_binary_sequence_from_descriptors(descriptors, threshold=binary_threshold)

    return keypoints_cv2, descriptors, binary_sequence
