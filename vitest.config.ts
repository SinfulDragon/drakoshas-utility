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
    exclude: ["vendor/**", "node_modules/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/module/**/*.ts", "src/rule-elements/**/*.ts"],
      exclude: [
        "src/module/hooks/ready.ts",
        "src/module/hooks/setup.ts",
        "src/module/hooks/init.ts",
        "src/module/index.ts",
        "src/module/logger.ts",
      ],
      thresholds: {
        lines: 10,
        branches: 10,
        functions: 15,
        statements: 10,
      },
    }
  }
});
