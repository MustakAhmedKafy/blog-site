import axios from "axios";

const api = axios.create({
  baseURL: "https://blogs.kingofkey.net/api",
});

// Add a request interceptor to attach the Bearer token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
