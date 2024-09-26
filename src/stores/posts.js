// src/stores/posts.js
import { defineStore } from "pinia";
import api from "../api/api";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [],
    totalPages: 1,
    currentPage: 1,
    perPage: 10, // Adjust based on API or preferences
  }),
  actions: {
    /**
     * Fetch posts from the API with optional filters.
     * @param {Object} options - Filtering and pagination options.
     * @param {string} options.searchQuery - Search term.
     * @param {number|null} options.tagId - Tag ID to filter by.
     * @param {number} options.page - Page number for pagination.
     */
    async fetchPosts({ searchQuery = "", tagId = null, page = 1 } = {}) {
      try {
        const params = {
          search: searchQuery,
          tag: tagId,
          page,
        };

        const response = await api.get("/posts", { params });
        const data = response.data.data;

        this.posts = data.data;
        this.totalPages = data.last_page;
        this.currentPage = data.current_page;
        this.perPage = data.per_page;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },

    /**
     * Delete a post by ID.
     * @param {number} id - ID of the post to delete.
     */
    async deletePost(id) {
      try {
        await api.delete(`/posts/${id}`);
        // Remove the post from the state without refetching
        this.posts = this.posts.filter((post) => post.id !== id);
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    },

    /**
     * Create a new post.
     * @param {Object} postData - Data for the new post.
     */
    async createPost(postData) {
      try {
        await api.post("/posts", postData);
        // Optionally, you can refetch posts or append the new post to the state
        await this.fetchPosts({ page: this.currentPage });
      } catch (error) {
        console.error("Error creating post:", error);
      }
    },

    /**
     * Update an existing post.
     * @param {number} id - ID of the post to update.
     * @param {Object} postData - Updated data for the post.
     */
    async updatePost(id, postData) {
      try {
        await api.put(`/posts/${id}`, postData);
        // Optionally, you can refetch posts or update the specific post in the state
        await this.fetchPosts({ page: this.currentPage });
      } catch (error) {
        console.error("Error updating post:", error);
      }
    },
  },
});
