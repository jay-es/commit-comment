module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
  ],
  plugins: [
    'vue',
  ],
  rules: {
    'vue/max-attributes-per-line': [2, { singleline: 2 }],
    'vue/no-parsing-error': [2, { 'absence-of-digits-in-numeric-character-reference': false }],
  },
};
