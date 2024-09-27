<!-- src/views/PostDetail.vue -->
<template>
  <div class="container mx-auto py-4">
    <!-- Header Navigation (Optional: You can reuse your existing nav) -->
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

    <!-- Loading Indicator -->
    <div v-if="loading" class="text-center">
      <p class="text-gray-700">Loading post...</p>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="text-center text-red-500">
      <p>{{ error }}</p>
    </div>

    <!-- Post Details -->
    <div v-if="post" class="max-w-3xl mx-auto bg-white p-6 shadow rounded">
      <img :src="post.image || 'https://via.placeholder.com/600x400'" alt="Post Image"
        class="w-full h-64 object-cover rounded mb-4" />
      <h1 class="text-3xl font-bold mb-2">{{ post.title }}</h1>
      <p class="text-gray-700 mb-4">{{ post.description }}</p>
      <div class="flex justify-between items-center">
        <router-link :to="`/posts/edit/${post.id}`" class="text-green-500 hover:underline">
          Edit Post
        </router-link>
        <button @click="deletePost(post.id)" class="text-red-500 hover:underline">
          Delete Post
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePostsStore } from '../stores/posts';

const route = useRoute();
const router = useRouter();
const postsStore = usePostsStore();

const post = ref(null);
const loading = ref(false);
const error = ref('');

const fetchPost = async () => {
  loading.value = true;
  error.value = '';
  try {
    const postId = route.params.id;
    // Assuming you have a fetchPostById action in your store
    post.value = await postsStore.fetchPostById(postId);
  } catch (err) {
    console.error('Error fetching post:', err);
    error.value = 'Failed to load the post. Please try again.';
  } finally {
    loading.value = false;
  }
};

const deletePost = async (id) => {
  const confirmed = confirm('Are you sure you want to delete this post?');
  if (confirmed) {
    try {
      await postsStore.deletePost(id);
      alert('Post deleted successfully.');
      router.push('/'); // Redirect to posts list after deletion
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete the post. Please try again.');
    }
  }
};

const signOut = () => {
  authStore.logout(); 
  router.push("/login"); 
};

onMounted(() => {
  fetchPost();
});
</script>

<style scoped>
</style>
