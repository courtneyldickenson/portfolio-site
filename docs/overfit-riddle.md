---
title: "The Model Has Overfit"
description: "Can you reverse-engineer this ML model’s logic?"
---

# 🤖 The Model Has Overfit

You've been handed a black-box ML model that was trained on a tiny dataset.
It gives one of three outputs:
- ✅ **YES** (Confident match)
- ❓ **MAYBE** (Uncertain prediction)
- ❌ **NO** (Out of distribution)

But here's the thing... the model seems *weird*. Maybe it’s learned the wrong thing?

---

## 🧪 Training Data:

| Input                     | Output |
|--------------------------|--------|
| red triangle, 3 dots     | ✅ YES |
| blue square, 3 dots      | ✅ YES |
| green circle, 3 dots     | ✅ YES |
| red square, 2 dots       | ❌ NO  |
| green triangle, 4 dots   | ❌ NO  |

---

## 🔍 Predict the Output:
Try to figure out what the model learned! Choose your predictions below.
---
title: The Model Has Overfit
description: Can you reverse-engineer this ML model’s logic?
---

<script setup>
import OverfitRiddle from './.vitepress/components/OverfitRiddle.vue'
</script>

<ClientOnly>
  <OverfitRiddle />
</ClientOnly>

---

### 💡 Hint:
Don’t overthink it… or do? 😉

---

### 🧠 Solved it?
If your answers match the model's predictions:

```txt
🎉 You got it! 🎉

The model overfit to a single feature: the number of dots.
It learned to say YES only if there are exactly 3 dots — completely ignoring shape and color.

This is what happens when models learn correlations instead of meaning.
```

<style scoped>
table {
  font-size: 1rem;
  margin-bottom: 1.5rem;
}
</style>
