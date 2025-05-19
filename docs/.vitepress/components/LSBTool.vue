<template>
  <div class="min-h-screen bg-gray-100 p-6 text-center">
    <h1 class="text-2xl font-bold mb-6">LSB Steganography Tool</h1>

    <div class="mb-4">
      <button @click="mode = 'hide'" :class="buttonClass('hide')">Hide</button>
      <button @click="mode = 'extract'" :class="buttonClass('extract')">Extract</button>
    </div>

    <div v-if="mode === 'hide'">
      <h2 class="text-xl font-semibold mb-2">Hide a Secret Message</h2>
      <input type="file" accept="image/*" @change="handleImageUpload" class="mb-2" />
      <input type="text" v-model="secretMessage" placeholder="Enter message" class="mb-4 p-2 border" />
      <button @click="processImage" :disabled="!imageSrc || !secretMessage" class="btn-primary">Encode</button>

      <div v-if="outputImage" class="mt-4">
        <img :src="outputImage" class="max-w-sm mx-auto" />
        <a :href="outputImage" download="stego_image.png">
          <button class="btn-success mt-2">Download Image</button>
        </a>
      </div>
    </div>

    <div v-if="mode === 'extract'">
      <h2 class="text-xl font-semibold mb-2">Extract Hidden Message</h2>
      <input type="file" accept="image/*" @change="handleImageUpload" class="mb-4" />
      <button @click="extractMessage" :disabled="!imageSrc" class="btn-primary">Extract</button>
      <div v-if="hiddenMessage" class="mt-4 text-lg font-mono">{{ hiddenMessage }}</div>
    </div>

    <!-- Hidden canvas used for both encode and decode -->
    <canvas ref="canvas" class="hidden" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const mode = ref('hide')
const imageSrc = ref(null)
const outputImage = ref(null)
const secretMessage = ref('')
const hiddenMessage = ref('')
const canvas = ref(null)

const canvasReady = ref(false)

onMounted(() => {
  // This confirms the canvas is now safe to access
  canvasReady.value = true
})

function buttonClass(m) {
  return [
    'px-4 py-2 mx-2 rounded',
    m === mode.value ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'
  ].join(' ')
}

function handleImageUpload(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imageSrc.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

function processImage() {
  if (!canvasReady.value || !canvas.value) return

  const img = new Image()
  img.onload = () => {
    const ctx = canvas.value.getContext('2d')
    if (!ctx) return

    canvas.value.width = img.width
    canvas.value.height = img.height
    ctx.drawImage(img, 0, 0)

    const imageData = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height)
    const data = imageData.data

    const message = secretMessage.value + String.fromCharCode(0) // null-terminated
    const bits = message
      .split('')
      .map((c) => c.charCodeAt(0).toString(2).padStart(8, '0'))
      .join('')

    let j = 0
    for (let i = 0; i < data.length && j < bits.length; i += 4) {
      data[i] = (data[i] & ~1) | parseInt(bits[j])
      j++
    }

    ctx.putImageData(imageData, 0, 0)
    outputImage.value = canvas.value.toDataURL('image/png')
  }
  img.src = imageSrc.value
}

function extractMessage() {
  if (!canvasReady.value || !canvas.value) return

  const img = new Image()
  img.onload = () => {
    const ctx = canvas.value.getContext('2d')
    if (!ctx) return

    canvas.value.width = img.width
    canvas.value.height = img.height
    ctx.drawImage(img, 0, 0)

    const data = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height).data
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

    hiddenMessage.value = chars
  }
  img.src = imageSrc.value
}
</script>

<style scoped>
.btn-primary {
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}
.btn-success {
  background-color: #16a34a;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}
</style>
