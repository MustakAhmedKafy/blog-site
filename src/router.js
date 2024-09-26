// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import Login from "./views/Login.vue" 
import Posts from "./views/Posts.vue"; 
import Register from "./views/Register.vue"; 
import ForgotPassword from "./views/ForgotPassword.vue"; 
import ResetPassword from "./views/ResetPassword.vue"; 
import NotFound from "./views/NotFound.vue"; 

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
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPassword,
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
