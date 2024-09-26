<template>
  <div class="login-page flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-center mb-6">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <input type="email" v-model="email" placeholder="Email"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <input type="password" v-model="password" placeholder="Password"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <button type="submit"
          class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
          Login
        </button>
      </form>

      <!-- Display login failure message -->
      <p v-if="loginError" class="text-red-500 text-center mt-4">{{ loginError }}</p>

      <!-- Forgot password link -->
      <div class="text-center mt-2">
        <router-link to="/forgot-password" class="text-blue-500 hover:underline">Forgot Password?</router-link>
      </div>

      <!-- Register link -->
      <div class="text-center mt-4">
        <p>Don't have an account?
          <router-link to="/register" class="text-blue-500 hover:underline">Register here</router-link>.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const loginError = ref(''); // Variable to store login error messages

const handleLogin = async () => {
  loginError.value = ''; // Reset error message
  const isAuthenticated = await authStore.login({ email: email.value, password: password.value });

  if (isAuthenticated) {
    router.push('/posts'); // Redirect to posts.vue on success
  } else {
    loginError.value = 'Login failed. Please try again.'; // Display error message
  }
};
</script>

<style scoped></style>
