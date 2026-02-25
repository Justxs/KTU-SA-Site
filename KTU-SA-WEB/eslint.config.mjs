import { defineConfig } from 'eslint/config';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  {
    ...prettierConfig,
    extends: [...nextCoreWebVitals],

    rules: {
      // --- Errors (prevent bugs) ---
      'no-with': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-octal-escape': 'error',
      'no-shadow-restricted-names': 'error',
      'valid-typeof': ['error', { requireStringLiterals: true }],
      'no-caller': 'error',
      'no-extend-native': 'error',
      'no-global-assign': 'error',
      'no-self-compare': 'error',
      'no-template-curly-in-string': 'error',
      'no-promise-executor-return': 'error',
      'no-constructor-return': 'error',
      'no-new-wrappers': 'error',
      'no-constant-binary-expression': 'error',

      // --- Warnings (code quality) ---
      'no-debugger': 'warn',
      'no-empty': 'warn',
      'no-unneeded-ternary': 'warn',
      'no-useless-call': 'warn',
      'no-useless-computed-key': 'warn',
      'no-useless-concat': 'warn',
      'no-useless-rename': 'warn',
      'no-useless-return': 'warn',
      'block-scoped-var': 'warn',
      eqeqeq: ['warn', 'smart'],
      'no-lone-blocks': 'warn',
      'no-nested-ternary': 'warn',
      'no-var': 'warn',
      'prefer-const': 'warn',
      'prefer-template': 'warn',
      'prefer-arrow-callback': 'warn',
      'prefer-rest-params': 'warn',
      'prefer-spread': 'warn',
      'object-shorthand': ['warn', 'always'],
      'no-param-reassign': 'warn',
      'no-else-return': ['warn', { allowElseIf: false }],
      'no-lonely-if': 'warn',
      'no-throw-literal': 'warn',
      'one-var': ['warn', { initialized: 'never' }],
      'default-case-last': 'warn',
      'grouped-accessor-pairs': 'warn',
      'no-array-constructor': 'warn',
      'no-object-constructor': 'warn',
      curly: ['warn', 'multi-line', 'consistent'],

      // --- React/Next.js ---
      'react/self-closing-comp': 'warn',
      'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
      'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
      'react/jsx-boolean-value': ['warn', 'never'],
      'react/jsx-fragments': ['warn', 'syntax'],
      'react/no-array-index-key': 'warn',
      'react/hook-use-state': 'warn',
    },
  },
]);
