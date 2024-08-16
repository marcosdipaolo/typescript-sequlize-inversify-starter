import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["config/", "build/", "logs/", "node_modules/"],
  },
  {
    files: ["**/*.ts"],
  },
  {
    languageOptions: { globals: globals.browser },
  },
  ...tseslint.configs.recommended,
];
