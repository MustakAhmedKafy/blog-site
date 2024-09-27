import { defineStore } from "pinia";
import api from "../api/api.js"; // Assuming this is your API setup (like Axios)

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null, // Stores user data
    token: localStorage.getItem("token") || null, // Persist token across sessions
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token, // Check if user is logged in
  },

  actions: {
    // Login action
    async login(credentials) {
      try {
        const { data } = await api.post("/login", credentials); // Send login request to API
        this.token = data.token;
        this.user = data.user;

        // Persist token in localStorage
        localStorage.setItem("token", data.token);

        // Optionally, store user info in localStorage if needed for persistence
        localStorage.setItem("user", JSON.stringify(data.user));

        return true; // Login successful
      } catch (error) {
        console.error("Login failed:", error);
        return false; // Login failed
      }
    },

    // Logout action
    async logout() {
      try {
        // Perform API logout if required by backend
        await api.post("/logout");

        // Clear token and user data
        this.token = null;
        this.user = null;

        // Remove from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },

    // Registration action
    async register(userData) {
      try {
        const { data } = await api.post("/register", userData);
        return data;
      } catch (error) {
        console.error("Registration failed:", error);
        throw error; // Rethrow error to handle it in the component
      }
    },

    // Forgot Password action
    async forgotPassword(email) {
      try {
        await api.post("/forgot-password", { email });
      } catch (error) {
        console.error("Forgot password request failed:", error);
        throw error; // Rethrow error to handle it in the component
      }
    },

    // Optionally load user info from localStorage (useful on page reload)
    loadUserFromLocalStorage() {
      const user = localStorage.getItem("user");
      if (user) {
        this.user = JSON.parse(user);
      }
    },
  },
});
