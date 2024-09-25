<!-- src/views/Posts.vue -->
<template>
  <div class="posts-page container p-4">
    <h2 class="text-2xl font-bold mb-4">Posts</h2>

    <!-- Filter by Tags -->
    <div class="mb-4">
      <h3 class="text-lg font-semibold mb-2">Filter by Tags</h3>
      <div class="flex gap-2">
        <button v-for="tag in tags" :key="tag.id" @click="filterByTag(tag)" :class="[
          'px-4 py-2 rounded',
          selectedTag === tag.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
        ]">
          {{ tag.name }}
        </button>
      </div>
    </div>

    <!-- Search Functionality -->
    <div class="mb-4">
      <input v-model="searchQuery" @input="fetchPosts" type="text" class="border p-2 w-full"
        placeholder="Search posts..." />
    </div>

    <!-- Posts List -->
    <div class="posts-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="post in filteredPosts" :key="post.id" class="post-card bg-white p-4 shadow rounded">
        <img :src="post.image" alt="Post Image" class="w-full h-48 object-cover rounded mb-4" />
        <h3 class="text-xl font-bold mb-2">{{ post.title }}</h3>
        <p class="text-gray-700 mb-4">{{ post.excerpt }}</p>
        <div class="flex justify-between items-center">
          <button class="text-blue-500" @click="viewPost(post.id)">View</button>
          <div class="flex gap-2">
            <button class="text-green-500" @click="editPost(post.id)">Edit</button>
            <button class="text-red-500" @click="deletePost(post.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination mt-6 flex justify-center">
      <button @click="changePage(page - 1)" :disabled="page === 1" class="px-4 py-2 mr-2 bg-gray-200 rounded">
        Previous
      </button>
      <button @click="changePage(page + 1)" :disabled="page === totalPages" class="px-4 py-2 bg-gray-200 rounded">
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Dummy Data with Images
const tags = ref([
  { id: 1, name: 'Technology' },
  { id: 2, name: 'Health' },
  { id: 3, name: 'Finance' },
  { id: 4, name: 'Lifestyle' }
]);

const posts = ref([
  { id: 1, title: 'The Rise of AI', excerpt: 'Exploring the impact of artificial intelligence on our future.', image: 'https://via.placeholder.com/300x200?text=AI' },
  { id: 2, title: 'Healthy Living Tips', excerpt: 'Simple tips to improve your overall well-being.', image: 'https://via.placeholder.com/300x200?text=Health' },
  { id: 3, title: 'Investing 101', excerpt: 'An introduction to investing for beginners.', image: 'https://via.placeholder.com/300x200?text=Finance' },
  { id: 4, title: 'Traveling on a Budget', excerpt: 'How to travel the world without breaking the bank.', image: 'https://via.placeholder.com/300x200?text=Travel' },
  { id: 5, title: 'The Benefits of Meditation', excerpt: 'Understanding how meditation can improve mental health.', image: 'https://via.placeholder.com/300x200?text=Meditation' },
  { id: 6, title: 'Tech Trends to Watch', excerpt: 'The top tech trends that will shape the next decade.', image: 'https://via.placeholder.com/300x200?text=Tech' },
]);

const searchQuery = ref('');
const selectedTag = ref(null);
const page = ref(1);
const itemsPerPage = 3; // Number of items per page

// Fetch posts on component mount
onMounted(() => {
  fetchPosts();
});

// Filter posts based on search query
const filteredPosts = computed(() => {
  let result = posts.value;

  // Filter by search query
  if (searchQuery.value) {
    result = result.filter((post) => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }

  // Filter by selected tag
  if (selectedTag.value) {
    // This is a placeholder; you would normally filter by tags associated with posts
    // For now, assume all posts belong to all tags
    result = result; // No filtering by tag for now
  }

  // Pagination
  const start = (page.value - 1) * itemsPerPage;
  return result.slice(start, start + itemsPerPage);
});

// Total pages for pagination
const totalPages = computed(() => Math.ceil(posts.value.length / itemsPerPage));

// Filter posts by selected tag
const filterByTag = (tag) => {
  selectedTag.value = tag.id;
  page.value = 1; // Reset page when filtering
  fetchPosts(); // Call the fetchPosts when filtering is implemented
};

// Change page for pagination
const changePage = (newPage) => {
  if (newPage > 0 && newPage <= totalPages.value) {
    page.value = newPage;
  }
};

// Post actions (view, edit, delete)
const viewPost = (id) => {
  console.log(`View post with ID: ${id}`);
};

const editPost = (id) => {
  console.log(`Edit post with ID: ${id}`);
};

const deletePost = (id) => {
  posts.value = posts.value.filter(post => post.id !== id); // Remove post from dummy data
  fetchPosts(); // Refetch posts after deletion when implemented
};
</script>

<style scoped>
/* Add custom styles here or use Tailwind CSS */
</style>
