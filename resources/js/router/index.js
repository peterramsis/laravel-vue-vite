import { createRouter, createWebHistory } from "vue-router";
import Home from "../view/home.vue";
import About from "../view/about.vue";
import Posts from "../view/posts.vue";
const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/about",
        name: "about",
        component: About,
    },
    {
        path: "/posts",
        name: "posts",
        component: Posts,
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
