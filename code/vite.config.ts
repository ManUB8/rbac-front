import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import svgr from "vite-plugin-svgr";

export default defineConfig(() => {
  const envVersion = dotenv.config({
    path: ".env",
  }).parsed ?? {};

  return {
    plugins: [react(), svgr()],
    base: "/",
    define: {
      "import.meta.env.VITE_IMAGE_VERSION": JSON.stringify(
        envVersion.VITE_IMAGE_VERSION
      ),
    },
  };
});