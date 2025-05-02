<script setup>
import { ref, computed } from 'vue'
import { projects } from './projects.js'

const selectedCategory = ref('All')
const selectedTag = ref(null)

// Only include projects with links
const linkedProjects = projects.filter(p => !!p.link)

const categories = ['All', ...new Set(linkedProjects.map(p => p.category))]

const filteredProjects = computed(() => {
  let result = selectedCategory.value === 'All'
    ? linkedProjects
    : linkedProjects.filter(p => p.category === selectedCategory.value)

  if (selectedTag.value) {
    result = result.filter(p => p.tags?.includes(selectedTag.value))
  }

  return result
})

function resetFilters() {
  selectedCategory.value = 'All'
  selectedTag.value = null
}
</script>

<template>
  <div class="gallery">
    <div class="filter-buttons">
      <button
        v-for="category in categories"
        :key="category"
        :class="{ active: selectedCategory === category }"
        @click="() => { selectedCategory = category; selectedTag = null }"
      >
        {{ category }}
      </button>
    </div>

    <div v-if="selectedTag" class="filter-status">
      <p>
        Showing projects tagged with <strong>{{ selectedTag }}</strong>
        <button @click="resetFilters">Clear filter ✖️</button>
      </p>
    </div>

    <div class="cards">
      <div v-for="project in filteredProjects" :key="project.title" class="card">
        <h3>
          <a :href="project.link" class="view-link">
            {{ project.title }}
          </a>
        </h3>
        <p>{{ project.description }}</p>
        <div class="tags">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="tag"
            @click="selectedTag = tag"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery {
  margin-top: 1.5rem;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.filter-buttons button {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-border);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  color: var(--vp-c-text);
  transition: background 0.2s;
}

.filter-buttons button.active {
  background: var(--vp-c-brand);
  color: white;
}

.filter-buttons button:hover {
  background: var(--vp-c-bg);
}

.filter-status {
  margin-bottom: 1rem;
  background: var(--vp-c-bg-alt);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  color: var(--vp-c-text);
}

.filter-status button {
  background: none;
  border: none;
  color: var(--vp-c-brand);
  cursor: pointer;
  margin-left: 0.5rem;
  font-weight: bold;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.card {
  background: var(--vp-c-surface);
  padding: 1.25rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-border);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-4px);
}

.card h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  color: var(--vp-c-text);
}

.card p {
  font-size: 0.95rem;
  line-height: 1.4;
  color: var(--vp-c-text);
}

.tags {
  margin-top: 0.75rem;
}

.tag {
  display: inline-block;
  background: var(--vp-c-brand);
  color: white;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  font-size: 0.75rem;
  margin: 0.25rem 0.25rem 0 0;
  cursor: pointer;
  transition: background 0.2s;
}

.tag:hover {
  background: var(--vp-c-brand-dark);
}

.view-link {
  text-decoration: none;
  color: var(--vp-c-brand);
  font-weight: bold;
}

.view-link:hover {
  text-decoration: underline;
}
</style>
