<!-- src/views/Login.vue -->
<template>
  <div class="login-page">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';  // Import the auth store

const authStore = useAuthStore();

const email = ref('');
const password = ref('');

const handleLogin = () => {
  authStore.login({ email: email.value, password: password.value });
};
</script>

<style scoped>
/* Add some styles or use Tailwind CSS */
</style>
