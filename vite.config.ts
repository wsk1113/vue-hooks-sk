import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  // 其他配置项...
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
