// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {

  const envVersion = dotenv.config({
    path: `../.env.version`,
  }).parsed;

  return {
    plugins: [react(), svgr()],
    base: "/",
    define: {
      "import.meta.env": {
        ...envVersion,
      },
    },
  };
});