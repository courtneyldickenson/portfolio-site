---
sidebar: false
---

# LSB Steganography Encoder  
**Team Members:** Ryan Farley, Tushar Wani, Courtney Dickenson, Ariel Ong  
**Role:** Frontend Development, UI Design, Integration with Encoding Pipeline  
**Tools:** Vue.js, JavaScript, HTML, CSS  

---

## Project Overview  
This project implements a **Least Significant Bit (LSB) steganography** technique to embed secret messages within images. The frontend interface, developed using Vue.js, allows users to input messages and images, and then processes them to produce stego-images with hidden data.

### Key Features:  
- **User-Friendly Interface:** Drag-and-drop file selection and intuitive text entry.  
- **Real-Time Feedback:** Immediate rendering of the modified image and output.  
- **Downloadable Output:** Allows users to save the generated stego-image locally.

<!-- ![LSB Steganography UI](./assets/lsb_steganography_ui.png) -->

---

<script setup>
import LSBEncode from '/.vitepress/components/LSBEncode.vue'
import LSBDecode from '/.vitepress/components/LSBDecode.vue'
</script>

<ClientOnly>
  <LSBEncode />
  <br />
  <LSBDecode />
</ClientOnly>

---

## System Architecture  
### Workflow Breakdown:  
1. **Message Input:** Users type in a message they want to hide.  
2. **Image Selection:** They upload an image in PNG format.  
3. **Encoding Process:** The message is encoded bit-by-bit into the LSBs of pixel color values.  
4. **Output Generation:** The tool renders the final stego-image and allows the user to download or preview it.

---

## Code Highlights  

### 1. Embedding Message into Image  
```javascript
function embedMessage(imageData, message) {
  const binaryMessage = textToBinary(message) + '00000000'; // Null character as delimiter
  let dataIndex = 0;

  for (let i = 0; i < imageData.data.length; i += 4) {
    for (let j = 0; j < 3; j++) { // RGB channels
      if (dataIndex < binaryMessage.length) {
        imageData.data[i + j] &= 254; // Clear LSB
        imageData.data[i + j] |= parseInt(binaryMessage[dataIndex]); // Set LSB
        dataIndex++;
      }
    }
  }
  return imageData;
}
````

```vue
<template>
  <div>
    <input type="file" @change="onImageUpload" />
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const canvas = ref(null);

function onImageUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const ctx = canvas.value.getContext('2d');
      canvas.value.width = img.width;
      canvas.value.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
</script>
```

---

## Results

* Achieved successful bit-level message embedding into PNG images using only the red channel LSB.
* Generated stego-images retained visual fidelity — imperceptible difference to human eyes.
* Extraction process correctly identified and reconstructed the original message, including null-terminated encoding.

---

## Challenges and Solutions

### 🔄 Pixel Alignment Accuracy

* **Issue:** Misalignment between message bits and image data led to garbled output.
* **Fix:** Ensured loop boundaries and bit counters were in sync; used null-terminated logic for message completion.

### 📦 Image Format Constraints

* **Issue:** JPEG compression ruined LSB consistency during testing.
* **Fix:** Enforced PNG-only uploads and tested multiple resolutions for consistency.

### 🔍 Message Overflow

* **Issue:** Long messages could exceed image capacity.
* **Fix:** Implemented a check to prevent encoding if the message length exceeds pixel storage limit.

---

## Future Enhancements

* Add **message length pre-encoding check** with dynamic image sizing guidance.
* Extend support to **multi-bit per pixel encoding** for higher capacity.
* Integrate **AES encryption** to protect plaintext prior to encoding.
* Build a **real-time progress bar** for encode/decode operations.

---

## Key Takeaways

* **Practical steganography** is achievable with minimal tools and frontend logic.
* Vue’s reactivity and canvas control made rapid iteration and visual feedback seamless.
* LSB encoding highlights how easily data can be hidden in plain sight — and why media security matters.
* This project builds foundational understanding for deeper work in **image forensics** and **secure communication**.

---


