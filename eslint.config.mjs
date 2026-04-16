import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/**", "vendor/**", "types/foundry/**"]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.mjs"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2024
      }
    }
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2024
      }
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off"
    }
  }
);
