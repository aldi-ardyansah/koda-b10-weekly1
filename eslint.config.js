import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
        js,
        "@stylistic": stylistic
    },
    extends: ["js/recommended"],
    rules: {
        "@stylistic/semi": ["error", "always"],
        "camelcase": ["error", { "properties": "always" }],
        "quotes": ["error", "double", { "avoidEscape": true, "allowTemplateLiterals": true }]
    },
    languageOptions:
    {
        globals: globals.node
    }
  },
]);