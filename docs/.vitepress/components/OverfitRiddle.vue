<script setup>
import { ref } from 'vue'

const answers = ref({ q1: '', q2: '', q3: '' })
const feedback = ref('')

function checkAnswers() {
  const a1 = answers.value.q1.trim().toLowerCase()
  const a2 = answers.value.q2.trim().toLowerCase()
  const a3 = answers.value.q3.trim().toLowerCase()

  if (a1 === 'yes' && a2 === 'yes' && a3 === 'no') {
    feedback.value = `🎉 You got it! 🎉

The model overfit to a single feature: the number of dots.
It learned to say YES only if there are exactly 3 dots — completely ignoring shape and color.

This is what happens when models learn correlations instead of meaning.`
  } else {
    feedback.value = '❌ Not quite — keep trying! You might be overthinking it… or underthinking it 😉'
  }
}
</script>

<template>
  <div class="riddle">
    <p><strong>blue triangle, 3 dots</strong></p>
    <input v-model="answers.q1" placeholder="YES / NO / MAYBE" />

    <p><strong>red square, 3 dots</strong></p>
    <input v-model="answers.q2" placeholder="YES / NO / MAYBE" />

    <p><strong>blue triangle, 2 dots</strong></p>
    <input v-model="answers.q3" placeholder="YES / NO / MAYBE" />

    <button @click="checkAnswers">Submit</button>

    <pre v-if="feedback">{{ feedback }}</pre>
  </div>
</template>

<style scoped>
.riddle {
  margin-top: 1rem;
  font-size: 1rem;
  max-width: 500px;
}
input {
  display: block;
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 100%;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: white;
  color: black;
}
button {
  padding: 0.5rem 1.25rem;
  font-weight: bold;
  font-size: 1rem;
  border: none;
  background-color: #646cff;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background-color: #4b55db;
}
pre {
  margin-top: 1rem;
  background: #f6f6f6;
  padding: 1rem;
  border-radius: 8px;
  white-space: pre-wrap;
  font-family: monospace;
  color: black;
}

/* 🌙 VitePress Dark Mode Support */
.dark .riddle input {
  background-color: #1e1e1e;
  color: #f0f0f0;
  border-color: #444;
}
.dark .riddle pre {
  background: #2a2a2a;
  color: #f0f0f0;
}
</style>
