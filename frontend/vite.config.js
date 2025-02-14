import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Change the port if needed
  },
  build: {
    outDir: "dist", // Output directory for production build
  },
  resolve: {
    alias: {
      "@": "/src", // Optional alias for cleaner imports
    },
  },
  base: "/", // Ensures correct routing in production
});
