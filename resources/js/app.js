import "./bootstrap";
import { createApp } from "vue/dist/vue.esm-bundler.js";
import HeaderApp from "./component/header_app.vue";

import router from "./router/index";
import "./bootstrap";

import "../sass/app.scss";
const app = createApp();
app.component("header-app", HeaderApp);
app.use(router);
app.mount("#app");
