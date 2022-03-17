module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020

  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-mixed-spaces-and-tabs": 0, // disable rule
    "@typescript-eslint/camelcase": "off",
    //"no-use-before-define": ["error", { "functions": false, "classes": false, "variables": false }]
  }
}
