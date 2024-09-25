import { defineStore } from "pinia";
import api from "../api/api";

export const useTagStore = defineStore("tags", {
  state: () => ({
    tags: [],
  }),
  actions: {
    async fetchTags() {
      const { data } = await api.get("/tags");
      this.tags = data;
    },
  },
});
