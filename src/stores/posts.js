// src/stores/posts.js
import { defineStore } from "pinia";
import api from "../api/api";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [],
    totalPages: 1,
    currentPage: 1,
    perPage: 10,
    searchQuery: "",
    selectedTagId: null,
    postCache: {}, // Cache for individual posts
  }),

  actions: {

    async fetchPosts({
      searchQuery = this.searchQuery,
      tagId = this.selectedTagId,
      page = 1,
    } = {}) {
      try {
        const params = {
          search: searchQuery,
          tag: tagId,
          page,
        };

        const response = await api.get("/posts", { params });
        const data = response.data.data;

        // Update the store with the fetched data
        this.posts = data.data;
        this.totalPages = data.last_page;
        this.currentPage = data.current_page;
        this.perPage = data.per_page;

        // Update the state to reflect current search query and tag filter
        this.searchQuery = searchQuery;
        this.selectedTagId = tagId;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },

    async fetchPostById(id) {
      if (this.postCache[id]) {
        return this.postCache[id];
      }
      try {
        const response = await api.get(`/posts/${id}`);
        const data = response.data.data;

   
        this.postCache[id] = data;

        return data;
      } catch (error) {
        console.error(`Error fetching post with ID ${id}:`, error);
        throw error; // Propagate the error to handle it in the component
      }
    },

    // Delete a post by ID
    async deletePost(id) {
      try {
        await api.delete(`/posts/${id}`);
        // Update the posts in state after deletion
        this.posts = this.posts.filter((post) => post.id !== id);
        // Remove from cache if exists
        if (this.postCache[id]) {
          delete this.postCache[id];
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        throw error; // Propagate the error to handle it in the component
      }
    },

    // Create a new post
    async createPost(postData) {
      try {
        await api.post("/posts", postData);
        // Refetch posts to reflect the newly created post
        await this.fetchPosts({
          searchQuery: this.searchQuery,
          tagId: this.selectedTagId,
          page: this.currentPage,
        });
      } catch (error) {
        console.error("Error creating post:", error);
        throw error; // Propagate the error to handle it in the component
      }
    },

    // Update an existing post by ID
    async updatePost(id, postData) {
      try {
        await api.put(`/posts/${id}`, postData);
        if (this.postCache[id]) {
          this.postCache[id] = { ...this.postCache[id], ...postData };
        }
    
        await this.fetchPosts({
          searchQuery: this.searchQuery,
          tagId: this.selectedTagId,
          page: this.currentPage,
        });
      } catch (error) {
        console.error("Error updating post:", error);
        throw error; 
      }
    },
  },
});
