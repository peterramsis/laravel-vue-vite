import { createApp } from "vue/dist/vue.esm-bundler.js";
import HeaderApp from "./component/header_app.vue";
import RtlBootstrap from "./component/rtl_bootstrap.vue";
import router from "./router/index";
import "./bootstrap";
import "../sass/app.scss";
import store from "./store";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { Bootstrap5Pagination } from "laravel-vue-pagination";
import { AtomSpinner } from "epic-spinners";
const app = createApp();
import { LoadingPlugin } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

app.component("header-app", HeaderApp);
app.component("AtomSpinner", AtomSpinner);
app.component("rtl-bootstrap", RtlBootstrap);
app.component("Bootstrap5Pagination", Bootstrap5Pagination);

app.use(router);
app.use(LoadingPlugin);
app.use(VueSweetalert2);
import i18n from "./plugins/i18n.js";
app.use(i18n);
app.use(store).mount("#app");
