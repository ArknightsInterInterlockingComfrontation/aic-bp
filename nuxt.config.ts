import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  css: ["~/assets/css/index.css", "~/assets/css/mint-scroll.css", "~/assets/css/antdv.css"],
  devServer: {
    port: 8080,
  },
  srcDir: "./src",
  runtimeConfig: {
    public: {
      apiBase: "/api",
    },
  },
  app: {
    baseURL: "/",
    buildAssetsDir: "/_nuxt/",
    head: {
      charset: "utf-8",
      title: "联锁对抗 - BP",
    },
  },
  nitro: {
    devProxy: {
      "/api/": {
        target: "http://localhost:3000/api/",
        changeOrigin: true,
        prependPath: true,
      },
      "/socket.io/": {
        target: "ws://localhost:3000/socket.io/",
        ws: true,
        changeOrigin: true,
      },
    },
    prerender: {
      routes: ["/404.html"],
    },
  },
  logLevel: "silent",
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
      },
    ],
    "@nuxtjs/tailwindcss",
    "@ant-design-vue/nuxt",
  ],
  compatibilityDate: "2025-02-06",
});
