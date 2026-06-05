import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: process.env.BACKEND_URL,
        changeOrigin: true,
      },
      "/socket.io": {
        target: process.env.BACKEND_URL,
        ws: true,
        changeOrigin: true,
      },
    },
  },
});
