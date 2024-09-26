<template>
  <div class="reset-password-page flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-center mb-6">Reset Password</h2>
      <form @submit.prevent="handleResetPassword" class="space-y-4">
        <input type="text" v-model="otp" placeholder="Enter OTP"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <input type="password" v-model="password" placeholder="New Password"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <input type="password" v-model="passwordConfirmation" placeholder="Confirm Password"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <button type="submit"
          class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
          Reset Password
        </button>
      </form>

      <!-- Display success or error message -->
      <p v-if="message" :class="{ 'text-green-500': success, 'text-red-500': !success }" class="text-center mt-4">{{
        message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const otp = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const message = ref('');
const success = ref(false);

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const handleResetPassword = async () => {
  const email = route.query.email; // Get the email from the URL query
  try {
    await authStore.resetPassword({ email, otp: otp.value, password: password.value, password_confirmation: passwordConfirmation.value });
    message.value = 'Your password has been reset successfully.';
    success.value = true;
    setTimeout(() => {
      router.push('/posts'); // Redirect to posts page
    }, 2000); // Redirect after a short delay
  } catch (error) {
    message.value = 'Failed to reset password. Please try again.';
    success.value = false;
  }
};
</script>

<style scoped></style>
