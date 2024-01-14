import { createStore } from "vuex";
import { getPost, createPost, editPost } from "../utils/api";
export default createStore({
    state: {
        // Your state properties go here
        posts: [],
        post: {
            id: "",
            title: "",
            body: "",
        },
        errors: [],
    },
    mutations: {
        updatePosts(state, posts) {
            state.posts = posts;
        },
        updatePostErrors(state, errors) {
            state.errors = errors;
        },
        updatePost(state, post) {
            (state.post.title = post.title),
                (state.post.body = post.body),
                (state.post.id = post.id);
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
        createPostAction({ commit, dispatch, state }, payload) {
            const { page, loading } = payload;
            createPost({ title: state.post.title, body: state.post.body }).then(
                (res) => {
                    if (res.status == 422) {
                        commit("updatePostErrors", res.data["errors"]);
                    } else {
                        commit("updatePost", {
                            id: "",
                            title: "",
                            body: "",
                        });
                        commit("updatePostErrors", []);
                        dispatch("getPostsAction", { page, loading });
                    }
                }
            );
        },
    },
    getters: {
        // Your getters go here
        getPosts(state) {
            return state.posts;
        },
    },
});
