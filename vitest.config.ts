import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./tests/setup/setup.ts"],
    exclude: ["vendor/**", "node_modules/**"]
  }
});
