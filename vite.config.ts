import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsInlineLimit: 0, // Prevent inlining of small assets
  },
  base: "/", // Adjust if your app is hosted in a subdirectory
});
