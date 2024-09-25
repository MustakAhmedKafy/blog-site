<!-- src/views/NotFound.vue -->
<template>
  <div class="not-found-page flex items-center justify-center min-h-screen bg-gray-100">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p class="text-xl text-gray-600 mb-4">Oops! The page you're looking for doesn't exist.</p>
      <router-link to="/" class="text-blue-500 underline">Go back to home</router-link>
    </div>
  </div>
</template>

<script setup>
// No special logic needed here
</script>

<style scoped>
/* You can add specific styles if necessary or use Tailwind CSS */
</style>
