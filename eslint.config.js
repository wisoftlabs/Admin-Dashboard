import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  stylistic.configs.customize({
    jsx: true,
    semi: true,
    indent: 2,
    quotes: "double",
    commaDangle: "always-multiline",
  }),
  {
    plugins: {
      "@stylistic": stylistic,
      "simple-import-sort": eslintPluginSimpleImportSort,
    },
    files: ["**/*.{ts,tsx}"],
    ignores: ["./src/components/ui/*.tsx"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^\\u0000"],
            ["^react"],
            ["^@?\\w"],
            ["^@/"],
            ["^\\."],
            ["^/"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^", varsIgnorePattern: "^" },
      ],
    },
  },
]);
