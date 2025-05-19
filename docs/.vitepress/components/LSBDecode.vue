<!-- /.vitepress/components/LSBDecode.vue -->
<template>
  <div class="wrapper">
    <h2 class="title">🕵️ Extract Hidden Message</h2>

    <div class="field">
      <label>Upload Stego Image</label>
      <input type="file" accept="image/*" @change="handleUpload" />
    </div>

    <button @click="decode" :disabled="!src" class="btn">Extract Message</button>

    <div v-if="src" class="preview">
      <img :src="src" class="preview-img" />
    </div>

    <div v-if="message" class="message-box">
      <strong>Hidden Message:</strong><br />
      {{ message }}
    </div>

    <canvas ref="canvas" class="hidden" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const src = ref(null)
const message = ref('')
const canvas = ref(null)

function handleUpload(e) {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onload = (evt) => {
    src.value = evt.target.result
  }
  reader.readAsDataURL(file)
}

function decode() {
  const img = new Image()
  img.onload = () => {
    const ctx = canvas.value.getContext('2d')
    canvas.value.width = img.width
    canvas.value.height = img.height
    ctx.drawImage(img, 0, 0)

    const data = ctx.getImageData(0, 0, img.width, img.height).data
    let bits = ''
    for (let i = 0; i < data.length; i += 4) {
      bits += (data[i] & 1).toString()
    }

    let chars = ''
    for (let i = 0; i < bits.length; i += 8) {
      const byte = bits.slice(i, i + 8)
      if (byte === '00000000') break
      chars += String.fromCharCode(parseInt(byte, 2))
    }

    message.value = chars
  }
  img.src = src.value
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
input[type='file'] {
  width: 100%;
  padding: 0.6rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  background: #f9f9f9;
  color: #111;
}
.dark input[type='file'] {
  background: #2a2a2a;
  color: #f1f1f1;
  border: 1px solid #555;
}
.btn {
  width: 100%;
  background-color: #3b82f6;
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
.message-box {
  margin-top: 1.5rem;
  background: #e5e7eb;
  color: #111;
  padding: 1rem;
  border-radius: 0.5rem;
  font-family: monospace;
  text-align: center;
  word-break: break-word;
}
.dark .message-box {
  background: #2a2a2a;
  color: #f1f1f1;
}
.hidden {
  display: none;
}
</style>
