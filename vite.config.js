import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "src/assets/pdf/*.pdf",
          dest: "assets",
        },
      ],
    }),
  ],
  assetsInclude: ["**/*.pdf"],
  server: {
    port: 3001, // Change to your desired port
    proxy: {
      "/api": {
        target: "https://intest.vn/",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
