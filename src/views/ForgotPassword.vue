<template>
  <div class="forgot-password-page flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-center mb-6">Forgot Password</h2>
      <form @submit.prevent="handleForgotPassword" class="space-y-4">
        <input type="email" v-model="email" placeholder="Enter your email"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />


        <!-- Link styled as a button -->
        <router-link to="/reset-password"
          class="block w-full text-center py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 mt-4">
     Reset Password 
        </router-link>

      </form>

      <!-- Display success or error message -->
      <p v-if="message" :class="{ 'text-green-500': success, 'text-red-500': !success }" class="text-center mt-4">{{
        message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const email = ref('');
const message = ref('');
const success = ref(false);

const authStore = useAuthStore();
const router = useRouter();

const handleForgotPassword = async () => {
  try {
    await authStore.forgotPassword(email.value);
    message.value = 'A password reset link has been sent to your email.';
    success.value = true;
    setTimeout(() => {
      router.push(`/reset-password?email=${email.value}`); // Redirect to reset-password page with email in query
    }, 2000); // Redirect after a short delay
  } catch (error) {
    message.value = 'Failed to send reset link. Please try again.';
    success.value = false;
  }
};
</script>

<style scoped></style>
