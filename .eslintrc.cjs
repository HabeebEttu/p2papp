module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  plugins: ["react", "react-hooks"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    "no-unused-vars": [
      1,
      {
        argsIgnorePattern: "req|res|next|^err",
      },
    ],
    "arrow-body-style": [2, "as-needed"],
    "no-param-reassign": [2, { props: false }],
    "no-console": 1,
    "no-debugger": 1,
  },
};
