<!-- src/components/Tags.vue -->
<template>
  <div class="mb-4">
    <h3 class="text-lg font-semibold mb-2">Filter by Tags</h3>
    <div class="flex flex-wrap gap-2">
      <button v-for="tag in tags" :key="tag.id" @click="toggleTag(tag.id)" :class="[
        'px-4 py-2 rounded',
        selectedTags.includes(tag.id) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
      ]">
        {{ tag.name }}
      </button>
    </div>
  </div>
</template>

<!-- src/components/Tags.vue -->
<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useTagStore } from '../stores/tags';
import { usePostsStore } from '../stores/posts';

const tagStore = useTagStore();
const postsStore = usePostsStore();
const selectedTags = ref([]);

onMounted(() => {
  tagStore.fetchTags();
});

const tags = computed(() => tagStore.tags);

watch(selectedTags, (newTags) => {
  const tagId = newTags.length > 0 ? newTags.join(',') : null;
  postsStore.fetchPosts({ tagId, searchQuery: postsStore.searchQuery, page: 1 });
});

const toggleTag = (tagId) => {
  const index = selectedTags.value.indexOf(tagId);
  if (index === -1) {
    selectedTags.value.push(tagId);
  } else {
    selectedTags.value.splice(index, 1);
  }
};
</script>


<style scoped>

</style>
