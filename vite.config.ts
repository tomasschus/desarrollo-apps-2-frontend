import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
