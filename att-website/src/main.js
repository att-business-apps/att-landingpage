import "tailwindcss";
import "./assets/css/animate.css";
import "./assets/css/magnific-popup.css";
import "./assets/css/style.css";
import "./index.css";

import { createApp } from "vue";
import { createHead } from "@unhead/vue";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createHead());
app.use(router);
app.mount("#app");
