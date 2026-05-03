import "tailwindcss";
import "./assets/css/animate.css";
import "./assets/css/magnific-popup.css";
import "./assets/css/ionicons.min.css";
import "./assets/css/icofont.css";
import "./assets/css/style.css";
import "./index.css";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import gsapPlugin from "./plugins/gsap";

const app = createApp(App);

app.use(router);
app.use(gsapPlugin);

app.mount("#app");
