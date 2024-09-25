<template>
  <div>
    <div v-for="tag in tags" :key="tag.id">
      <input type="checkbox" v-model="selectedTags" :value="tag.id" />
      {{ tag.name }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTagStore } from '../stores/tags';

const tagStore = useTagStore();
const selectedTags = ref([]);

onMounted(() => {
  tagStore.fetchTags();
});

const tags = computed(() => tagStore.tags);
</script>
