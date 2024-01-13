import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import laravel from "laravel-vite-plugin";
import Vue from "@vitejs/plugin-vue";
import path from "path";
import { resolve, dirname } from "node:path";
import vueI18n from "@intlify/unplugin-vue-i18n/vite";
export default defineConfig({
    plugins: [
        Vue(),
        vueI18n({
            // you need to set i18n resource including paths
            include: resolve(
                dirname(fileURLToPath(import.meta.url)),
                "./resources/locales/**"
            ),
        }),

        laravel({
            input: ["resources/sass/app.scss", "resources/js/app.js"],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
        },
    },
});
