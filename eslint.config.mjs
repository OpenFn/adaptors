import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.node,
        FormData: 'readonly',
        Map: 'readonly',
        Set: 'readonly',
        Symbol: 'readonly',
        ReadableStream: 'readonly',
        Promise: 'readonly',
      },

      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {},
      },
    },

    rules: {
      'no-unused-vars': 'warn',
      'no-param-reassign': 'off',
      'no-undef': 'error',
    },
  },
]);
