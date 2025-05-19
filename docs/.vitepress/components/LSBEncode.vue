<template>
  <div class="wrapper">
    <h2 class="title">🔐 Hide a Secret Message</h2>

    <div class="field">
      <label>Step 1: Upload Image</label>
      <input type="file" accept="image/*" @change="handleUpload" />
    </div>

    <div class="field">
      <label>Step 2: Enter Message</label>
      <input v-model="message" type="text" placeholder="Enter a secret message..." />
    </div>

    <button @click="encode" :disabled="!src || !message" class="btn">Encode & Preview</button>

    <div v-if="output" class="preview">
      <img :src="output" class="preview-img" />
      <button class="btn success" @click="downloadImage">Download Stego Image</button>
    </div>

    <canvas ref="canvas" class="hidden" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const src = ref(null)
const message = ref('')
const output = ref(null)
const canvas = ref(null)

function handleUpload(e) {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onload = (evt) => {
    src.value = evt.target.result
  }
  reader.readAsDataURL(file)
}

function encode() {
  const img = new Image()
  img.onload = () => {
    const ctx = canvas.value.getContext('2d')
    canvas.value.width = img.width
    canvas.value.height = img.height
    ctx.drawImage(img, 0, 0)

    const imageData = ctx.getImageData(0, 0, img.width, img.height)
    const data = imageData.data
    const bits = (message.value + String.fromCharCode(0))
      .split('')
      .map(c => c.charCodeAt(0).toString(2).padStart(8, '0'))
      .join('')

    let j = 0
    for (let i = 0; i < data.length && j < bits.length; i += 4) {
      data[i] = (data[i] & ~1) | parseInt(bits[j])
      j++
    }

    ctx.putImageData(imageData, 0, 0)

    // ✅ Set output to the new encoded image
    output.value = canvas.value.toDataURL('image/png')
  }
  img.src = src.value
}

function downloadImage() {
  const link = document.createElement('a')
  link.href = output.value
  link.download = 'stego_image.png'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<style scoped>
.wrapper {
  max-width: 500px;
  margin: 2rem auto;
  background: white;
  color: black;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
.dark .wrapper {
  background: #1f1f1f;
  color: white;
}
.title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
}
.field {
  margin-bottom: 1.25rem;
}
input[type='text'],
input[type='file'] {
  width: 100%;
  padding: 0.6rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  background: #f9f9f9;
  color: #111;
}
.dark input[type='text'],
.dark input[type='file'] {
  background: #2a2a2a;
  color: #f1f1f1;
  border: 1px solid #555;
}
.btn {
  width: 100%;
  background-color: #2563eb;
  color: white;
  padding: 0.7rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  margin-top: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.btn:hover {
  background-color: #1e40af;
}
.btn.success {
  background-color: #16a34a;
  margin-top: 1rem;
}
.btn.success:hover {
  background-color: #15803d;
}
.preview {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: #f3f4f6;
  border: 1px solid #ccc;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.dark .preview {
  background-color: #2a2a2a;
  border-color: #444;
}

.preview-img {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}
.hidden {
  display: none;
}
</style>
