import './bootstrap';
import { createApp } from 'vue/dist/vue.esm-bundler.js';
import Test from "./component/Test.vue";
import router from './router/index';

const app = createApp()
app.use(router);
app.mount("#app")

