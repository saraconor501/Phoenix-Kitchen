import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const manifest = {
  "theme_color":"#90771d",
  "background_color":"#c28824",
  "icons":[{"purpose":"maskable","sizes":"512x512","src":"icon512_maskable.png","type":"image/png"},
    {"purpose":"any","sizes":"512x512","src":"icon512_rounded.png","type":"image/png"}],
    "orientation":"any","display":"standalone","dir":"auto","lang":"ru","name":"Phoenix-Kitchen",
    "short_name":"Phoenix-Kitchen","start_url":"/"}
export default defineConfig({
  plugins: [
    react(),
    VitePWA({registerType: "autoUpdate", workbox: {
      globPatterns: ["**/*.{html, css, js, jsx, svg, png, webp}"],
    },
    manifest: manifest
  }),
  ]
});
