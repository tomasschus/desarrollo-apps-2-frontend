import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/v1": {
        target: "https://desarrollo-apps2-back-end.vercel.app",
        changeOrigin: true,
        secure: true,
        headers: {
          "Cache-Control": "no-cache",
        },
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router"],
          ui: ["@chakra-ui/react", "@emotion/react"],
          maps: ["leaflet", "react-leaflet"],
          utils: ["axios", "dayjs", "react-hook-form", "react-icons"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
