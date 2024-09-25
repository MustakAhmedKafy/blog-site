<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <form @submit.prevent="login" class="bg-white p-6 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl mb-6 text-center">Login</h2>
      <input v-model="email" type="email" placeholder="Email" class="input mb-4" />
      <input v-model="password" type="password" placeholder="Password" class="input mb-4" />
      <button type="submit" class="btn btn-primary w-full">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const email = ref('');
const password = ref('');
const authStore = useAuthStore();

const login = async () => {
  try {
    await authStore.login({ email: email.value, password: password.value });
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  background-color: #1d4ed8;
  color: white;
  padding: 0.75rem;
  border-radius: 4px;
}
</style>
