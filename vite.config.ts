import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/v1": {
        target: "https://desarrollo-apps-2-backend.onrender.com",
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
          // Chunk para React y librerías principales
          vendor: ["react", "react-dom", "react-router"],
          // Chunk para Chakra UI
          ui: ["@chakra-ui/react", "@emotion/react"],
          // Chunk para mapas y visualización
          maps: ["leaflet", "react-leaflet"],
          // Chunk para utilidades
          utils: ["axios", "dayjs", "react-hook-form", "react-icons"],
        },
      },
    },
    // Incrementar el límite de warning para chunks grandes
    chunkSizeWarningLimit: 600,
  },
});
