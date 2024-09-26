<template>
  <div class="login-page flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-center mb-6">Register</h2>
      <form @submit.prevent="handleRegister" class="space-y-4">
        <input type="text" v-model="name" placeholder="Name"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <input type="email" v-model="email" placeholder="Email"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <p v-if="errors.email" class="text-red-500">{{ errors.email[0] }}</p>

        <input type="password" v-model="password" placeholder="Password"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <input type="password" v-model="password_confirmation" placeholder="Confirm Password"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <p v-if="errors.password_confirmation" class="text-red-500">{{ errors.password_confirmation[0] }}</p>

        <button type="submit"
          class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
          Register
        </button>
        <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
const errorMessage = ref(''); // To store general error messages
const errors = ref({}); // To store field-specific error messages

const handleRegister = async () => {
  errorMessage.value = ''; // Reset general error message
  errors.value = {}; // Reset field errors

  if (password.value !== password_confirmation.value) {
    errorMessage.value = 'Passwords do not match';
    return;
  }

  try {
    // Call the registration function
    await authStore.register({ name: name.value, email: email.value, password: password.value, password_confirmation: password_confirmation.value });
    // After successful registration, navigate to the posts page
    router.push('/posts');
  } catch (error) {
    // Handle and display validation errors
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else {
      errorMessage.value = error.response.data.message || 'Registration failed. Please try again.';
    }
  }
};
</script>

<style scoped></style>
