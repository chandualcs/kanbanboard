import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    plugins: [react()],
    preview: {
      host: "localhost",
      port: 8999,
      strictPort: true,
    },
    build: {
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
    server: {
      port: 8999,
      strictPort: true,
      proxy: {
        "/services": {
          target: "https://api.quicksell.co/v1/internal",
          changeOrigin: true,
          rewrite: path => path.replace(/^\/services/, ""),
        },
      },
    },
  });
};
