import { createRouter, createWebHistory } from "vue-router";
import Home from "../view/home.vue";
import About from "../view/about.vue";
import Posts from "../view/posts.vue";
import Login from "../view/login.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,

        meta: {
            title: "Home",
            requiresAuth: false,
        },
    },
    {
        path: "/about",
        name: "about",

        component: About,
        meta: {
            title: "About",
            requiresAuth: false,
        },
    },
    {
        path: "/posts",
        name: "posts",

        component: Posts,
        auth: true,
        meta: {
            title: "Posts",
            requiresAuth: true,
        },
    },
    {
        path: "/login",
        name: "login",

        component: Login,
        meta: {
            title: "Login",
            requiresAuth: false,
        },
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = to.meta?.title ?? "System";
    // Continue resolving the route

    if (to.meta.requiresAuth) {
        const token = localStorage.getItem("token");
        if (token) {
            // User is authenticated, proceed to the route
            next();
        } else {
            // User is not authenticated, redirect to login
            next("/login");
        }
    } else {
        // Non-protected route, allow access
        next();
    }
});

export default router;
