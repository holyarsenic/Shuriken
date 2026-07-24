import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
        "masked-icon.svg"
      ],

      manifest: {
        name: "Shuriken",
        short_name: "Shuriken",
        description: "Shuriken - A Progressive Web App",
        theme_color: "#0f172a",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",

        icons: [
          {
            src: "shuriken-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "shuriken-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "shuriken-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      }
    })
  ]
});