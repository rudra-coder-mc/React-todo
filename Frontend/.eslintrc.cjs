module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended", // TypeScript rules
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser", // Use TypeScript parser
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true, // Support for JSX
    },
    project: "./tsconfig.json", // Specify your tsconfig
  },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "@typescript-eslint"], // Add TypeScript plugin
  rules: {
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-unused-vars": "warn", // Example rule for TypeScript
  },
};
