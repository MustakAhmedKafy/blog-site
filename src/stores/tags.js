// src/stores/tags.js
import { defineStore } from "pinia";
import api from "../api/api";

export const useTagStore = defineStore("tags", {
  state: () => ({
    tags: [],
  }),
  actions: {
    async fetchTags() {
      try {
        const response = await api.get("/tags");
        // Assuming the API response structure matches { data: [...] }
        this.tags = response.data.data;
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    },
  },
});
