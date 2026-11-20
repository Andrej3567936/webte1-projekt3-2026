import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  // Relatívna cesta, aby zbuildovaná aplikácia fungovala aj v podpriečinku
  // na školskom serveri (napríklad /~xhudacko/).
  base: "./",
  plugins: [vue()],
});
