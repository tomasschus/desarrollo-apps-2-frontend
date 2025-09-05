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
});
