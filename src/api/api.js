// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://blogs.kingofkey.net/api",
// });


// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;


// src/api/api.js
import axios from 'axios';
import { useAuthStore } from '../stores/auth'; // Assuming you have an auth store

const api = axios.create({
  baseURL: 'https://blogs.kingofkey.net/api', // Replace with your actual API base URL
});

// Add a request interceptor to include the Bearer Token in headers
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
