// src/stores/posts.js
import { defineStore } from "pinia";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [],
    totalPages: 1,
  }),
  actions: {
    async fetchPosts({ searchQuery = "", tag = null, page = 1 }) {
      const params = { search: searchQuery, tag, page };
      const { data } = await api.get("/posts", { params });
      this.posts = data.posts;
      this.totalPages = data.totalPages;
    },
    async deletePost(id) {
      await api.delete(`/posts/${id}`);
      this.posts = this.posts.filter((post) => post.id !== id);
    },
    async createPost(postData) {
      await api.post("/posts", postData);
      this.fetchPosts(); // Refetch posts after creation
    },
    async updatePost(id, postData) {
      await api.put(`/posts/${id}`, postData);
      this.fetchPosts(); // Refetch posts after update
    },
  },
});
