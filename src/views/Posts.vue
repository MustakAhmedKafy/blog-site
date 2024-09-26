<!-- src/views/Posts.vue -->
<template>
  <div class="container mx-auto py-4">
    <!-- Header Navigation -->
    <nav class="bg-gray-800 py-4 mb-6">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-white text-xl font-bold">
          <router-link to="/">Your Logo</router-link>
        </div>
        <div>
          <button @click="signOut" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Sign Out
          </button>
        </div>
      </div>
    </nav>

    <!-- Tags Filter Component -->
    <Tags />

    <!-- Search Functionality -->
    <div class="mb-4">
      <input v-model="searchQuery" @input="onSearch" type="text" class="border rounded p-2 w-full"
        placeholder="Search posts..." />
    </div>

    <!-- Posts List -->
    <div class="posts-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="post in posts" :key="post.id" class="post-card bg-white p-6 shadow rounded">
        <img :src="post.image || 'https://via.placeholder.com/300x200'" alt="Post Image"
          class="w-full h-48 object-cover rounded mb-4" />
        <h3 class="text-xl font-bold mb-2">{{ post.title }}</h3>
        <p class="text-gray-700 mb-4">{{ post.description }}</p>
        <div class="flex justify-between items-center">
          <div class="flex gap-2">
            <router-link :to="`/posts/${post.id}`" class="text-blue-500 hover:underline">
              View
            </router-link>
            <router-link :to="`/posts/edit/${post.id}`" class="text-green-500 hover:underline">
              Edit
            </router-link>
          </div>
          <button @click="deletePost(post.id)" class="text-red-500 hover:underline">
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="pagination mt-6 flex justify-center items-center gap-4">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
        class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
        Previous
      </button>
      <span>
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePostsStore } from '../stores/posts';
import Tags from '../views/Tags.vue'; // Ensure the correct path
import { useRouter } from 'vue-router';

const postsStore = usePostsStore();
const router = useRouter();

// Local state for search query
const searchQuery = ref('');

// Fetch posts and tags on component mount
onMounted(() => {
  postsStore.fetchPosts();
});

// Computed properties from the store
const posts = computed(() => postsStore.posts);
const totalPages = computed(() => postsStore.totalPages);
const currentPage = computed(() => postsStore.currentPage);

// Handle search input with debounce if necessary
const onSearch = () => {
  postsStore.fetchPosts({ searchQuery: searchQuery.value, page: 1 });
};

/**
 * Change the current page for pagination.
 * @param {number} newPage - The page number to navigate to.
 */
const changePage = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    postsStore.fetchPosts({ searchQuery: searchQuery.value, page: newPage });
  }
};

/**
 * Delete a post by ID.
 * @param {number} id - ID of the post to delete.
 */
const deletePost = async (id) => {
  const confirmed = confirm('Are you sure you want to delete this post?');
  if (confirmed) {
    await postsStore.deletePost(id);
    // Optionally, show a notification or toast
  }
};

/**
 * Handle user sign out.
 */
const signOut = () => {
  // Implement your sign-out logic, e.g., clearing auth tokens and redirecting
  // Example:
  // authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
