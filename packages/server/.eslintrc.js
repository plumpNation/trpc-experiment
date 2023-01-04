const prettierConfig = require('../../prettier.config')

module.exports = {
  env: {
    es2021: true,
  },
  extends: ['prettier', 'eslint:recommended', 'standard'],
  plugins: ['prettier', 'import'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'comma-dangle': 0,
    indent: 0,
    'space-before-function-paren': 0,
    'prettier/prettier': [2, prettierConfig],
    'prefer-template': 2,
    'arrow-body-style': [2, 'as-needed'],
  },

  overrides: [
    {
      files: '**/*.ts',
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint'],
      rules: {
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': 2,
        'no-shadow': 0,
        '@typescript-eslint/no-shadow': 2,
        '@typescript-eslint/ban-types': [
          2,
          {
            types: {
              '{}': false,
            },
          },
        ],
      },
    },
  ],

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
}
