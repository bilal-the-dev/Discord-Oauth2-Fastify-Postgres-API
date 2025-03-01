import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

// Ts-eslint takes an object which adds the option (say files) to all configs (since eslint applies all config one by one and one of them having default may lint all files) read more here https://typescript-eslint.io/packages/typescript-eslint/#config
// Install eslint extension that uses eslint dependency to lint files in live time

export default tseslint.config({
  files: ["**/*.ts"],
  extends: [eslint.configs.recommended, tseslint.configs.recommended],
});

// Eslint only with no typescript-eslint
// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {
//     ...eslint.configs.recommended,
//     files: ["**/*.ts"],
//     languageOptions: { globals: globals.node },
//   },
// ];
