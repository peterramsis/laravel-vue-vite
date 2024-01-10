import { createApp } from "vue/dist/vue.esm-bundler.js";
import HeaderApp from "./component/header_app.vue";
import RtlBootstrap from "./component/rtl_bootstrap.vue";
import router from "./router/index";
import "./bootstrap";
import "../sass/app.scss";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { Bootstrap5Pagination } from "laravel-vue-pagination";

const app = createApp();

app.component("header-app", HeaderApp);
app.component("rtl-bootstrap", RtlBootstrap);
app.component("Bootstrap5Pagination", Bootstrap5Pagination);
app.use(router);
app.use(VueSweetalert2);
import i18n from "./plugins/i18n.js";
app.use(i18n);
app.mount("#app");
