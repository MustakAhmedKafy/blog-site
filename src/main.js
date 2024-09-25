// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Import the router
import { createPinia } from "pinia"; // Import Pinia for state management
import "./style.css"; // Import Tailwind CSS

const app = createApp(App);

app.use(router); // Use the router
app.use(createPinia()); // Use Pinia for state management
app.mount("#app");
