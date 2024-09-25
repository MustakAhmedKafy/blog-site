// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import Login from "./views/Login.vue"; // Import the Login component
import Posts from "./views/Posts.vue"; // Import the Posts component
import Register from "./views/Register.vue"; // Import the Register component
import NotFound from "./views/NotFound.vue"; // Optional 404 NotFound component

const routes = [
  {
    path: "/",
    name: "home",
    component: Posts, // Redirect to Posts by default
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/posts",
    name: "posts",
    component: Posts,
  },
  {
    path: "/:pathMatch(.*)*", // Catch-all for 404
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
