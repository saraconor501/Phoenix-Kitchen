import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // Автообновление service worker
      manifest: {
        name: "Phoenix Kitchen",
        short_name: "PX Kitchen",
        description: "Food Delivery App",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/logo.jpg",
            sizes: "192x192",
            type: "image/jpeg",
          },
          {
            src: "/logo.jpg",
            sizes: "512x512",
            type: "image/jpeg",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,ico}"], // Кеширование файлов
      },
    }),
  ],
});
