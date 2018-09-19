module.exports = {
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
    'prettier',
  ],
  plugins: [
    'prettier',
    'vue',
  ],
  rules: {
    'prettier/prettier': [2, require('./.prettierrc')],
    'vue/max-attributes-per-line': [2, {
      singleline: 2,
    }],
    'vue/no-parsing-error': [2, {
      'absence-of-digits-in-numeric-character-reference': false,
    }],
  },

  overrides: {
    files: 'src/store/*.js',
    rules: {
      'no-param-reassign': [2, {
        props: true,
        ignorePropertyModificationsFor: ['state'],
      }],
    },
  },
};
