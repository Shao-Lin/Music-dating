import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ManifestOptions, VitePWA } from "vite-plugin-pwa";
import { qrcode } from "vite-plugin-qrcode";

// https://vite.dev/config/

const manifest: Partial<ManifestOptions> | false = {
  theme_color: "#FFE8F4",
  background_color: "#FFE8F4",
  icons: [
    {
      purpose: "maskable",
      sizes: "512x512",
      src: "icon512_maskable.png",
      type: "image/png",
    },
    {
      purpose: "any",
      sizes: "512x512",
      src: "icon512_rounded.png",
      type: "image/png",
    },
  ],
  screenshots: [
    {
      src: "/frontend/public/Mobile.png",
      type: "image/png",
      sizes: "265x578",
      form_factor: "narrow",
    },
  ],
  orientation: "any",
  display: "standalone",
  lang: "ru",
  name: "Music-dating",
  short_name: "Vibe",
};
export default defineConfig({
  server: {
    host: "0.0.0.0", // разрешаем доступ со всех IP
  },
  plugins: [
    qrcode(),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*{html,css,js,ico,png,svg}"],
      },
      manifest: manifest,
    }),
  ],
});
