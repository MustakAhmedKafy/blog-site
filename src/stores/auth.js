import { defineStore } from "pinia";
import api from "../api/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
  }),
  actions: {
    async login(credentials) {
      const { data } = await api.post("/login", credentials);
      this.token = data.token;
      localStorage.setItem("token", data.token);
      this.user = data.user;
    },
    async logout() {
      await api.post("/logout");
      localStorage.removeItem("token");
      this.token = null;
      this.user = null;
    },
    async register(userData) {
      await api.post("/register", userData);
    },
    async forgotPassword(email) {
      await api.post("/forgot-password", { email });
    },
  },
});
