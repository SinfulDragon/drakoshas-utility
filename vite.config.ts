import { resolve } from "node:path";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "src/module/index.ts"),
      formats: ["es"],
      fileName: () => "scripts/index.js"
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) return "styles/module.css";
          return "assets/[name][extname]";
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: "src/module.json", dest: "." },
        { src: "src/lang/*.json", dest: "lang" },
        { src: "src/templates/**/*", dest: "templates" },
        { src: "static/assets/**/*", dest: "assets" },
        { src: "static/icons/**/*", dest: "icons" },
        { src: "static/packs/**/*", dest: "packs" }
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern"
      }
    }
  }
});
