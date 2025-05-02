---
sidebar: false
---
# LEGO Classifier on Raspberry Pi  
**Role:** Developer, Hardware Integrator, ML Pipeline Designer  
**Tools:** Raspberry Pi 5, TensorFlow Lite, OpenCV, Keras, Python  
**Repository:** *(private/local only – model was exported and deployed directly)*

---
## Project Overview  
This project uses a Raspberry Pi and TensorFlow Lite to classify LEGO pieces in real time using a mounted camera and a custom-trained model. The setup includes a conveyor belt system to move parts beneath the Pi Camera, with predictions rendered locally on-device. It’s a proof-of-concept for hardware-efficient, camera-based part recognition — with applications in toy sorting, inventory tracking, and hobbyist projects.

### Key Focus Areas:  
- **On-device ML** – Model runs directly on the Pi using TFLite, no internet or cloud inference.  
- **Custom LEGO Dataset** – Trained using real-life images and part labels pulled via the Rebrickable API.  
- **Hardware Integration** – Uses Pi Camera and GPIO-friendly layout for testing with physical parts.  



---
## Key Contributions  
- **Built a real-time image classification pipeline** optimized for Raspberry Pi using TensorFlow Lite.  
- **Collected, cleaned, and labeled training data** using a mix of Rebrickable metadata and live Pi Camera captures.  
- **Designed preprocessing logic** to normalize lighting, resize inputs, and convert labels to one-hot vectors.  
- **Wrote inference script** using TFLite runtime for fast predictions on embedded hardware.  

---
## System Architecture  
### Workflow Breakdown:  
1. **Data Collection** – Captured 128×128px images of LEGO parts and associated each with a part number.  
2. **Model Training** – Trained a CNN using Keras, then converted it to TFLite for edge deployment.  
3. **Real-Time Inference** – Camera feed is streamed, cropped, resized, and classified every 0.5s.  
4. **Prediction Display** – Predicted part number is printed in terminal or optionally shown on-screen.  



---
## Code Highlights  
### 1. Training the Model with Keras  
```python
model = Sequential([
    Conv2D(32, (3,3), activation='relu', input_shape=(128, 128, 3)),
    MaxPooling2D(2, 2),
    Conv2D(64, (3,3), activation='relu'),
    MaxPooling2D(2, 2),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(num_classes, activation='softmax')
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.fit(train_generator, validation_data=val_generator, epochs=10)
```

### 2. Converting to TensorFlow Lite  
```python
converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()

with open('lego_model.tflite', 'wb') as f:
    f.write(tflite_model)
```

### 3. Real-Time Inference on Raspberry Pi  
```python
import cv2
import tflite_runtime.interpreter as tflite
import numpy as np

interpreter = tflite.Interpreter(model_path='lego_model.tflite')
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

cap = cv2.VideoCapture(0)
while True:
    ret, frame = cap.read()
    img = cv2.resize(frame, (128, 128))
    img = img.astype('float32') / 255.0
    img = np.expand_dims(img, axis=0)

    interpreter.set_tensor(input_details[0]['index'], img)
    interpreter.invoke()
    prediction = interpreter.get_tensor(output_details[0]['index'])
    predicted_class = np.argmax(prediction)
    print(f"Predicted LEGO part: {predicted_class}")
```

---
## Results  
- **Prediction Accuracy:** ~87% test accuracy on common LEGO part types  
- **Inference Speed:** ~10 FPS on Pi 5 (optimized with image resizing + simple CNN)  
- **Deployment:** Fully functional offline, no external dependencies during runtime  

---
## Challenges and Solutions  
### 1. Lighting Variability  
- **Issue:** Prediction confidence dropped in low lighting.  
- **Fix:** Added histogram equalization and discarded poor-quality training images.  

### 2. Model Size vs. Accuracy  
- **Issue:** Large models were too slow on the Pi.  
- **Fix:** Used a minimal CNN and quantized the model to reduce inference cost.  

### 3. Dataset Noise  
- **Issue:** Incorrect labels from automation pipeline.  
- **Fix:** Manually cleaned CSV label mappings and added test-time sanity checks.  

---
## Future Enhancements  
- Add a touch screen interface for live display and override options.  
- Automate training with label validation and new part intake.  
- Publish to GitHub with open dataset export support.  

---
## Key Takeaways  
- Embedded ML can work incredibly well — even on low-power hardware.  
- Real-world image data is messy but more meaningful than synthetic datasets.  
- Tiny projects like this can spark **unexpectedly big ideas** in automation and robotics.

---
