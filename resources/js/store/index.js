import { createStore } from "vuex";
import { getPost } from "../utils/api";
export default createStore({
    state: {
        // Your state properties go here
        posts: [],
    },
    mutations: {
        updatePosts(state, posts) {
            state.posts = posts;
        },
    },
    actions: {
        // Your actio
        getPostsAction(context, payload) {
            const { page, loading } = payload;
            getPost(page, loading).then((res) => {
                context.commit("updatePosts", res);
            });
        },
    },
    getters: {
        // Your getters go here
        getPosts(state) {
            return state.posts;
        },
    },
});
