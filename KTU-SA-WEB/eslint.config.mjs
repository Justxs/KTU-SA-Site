import { defineConfig } from 'eslint/config';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([{
  extends: [...nextCoreWebVitals],

  rules: {
    'no-with': [2],
    'no-eval': [2],
    'no-octal-escape': [2],
    'no-shadow-restricted-names': [2],
    'valid-typeof': [2],
    'no-caller': [2],
    'no-extend-native': [2],
    'no-debugger': [1],

    'linebreak-style': [1, 'windows'],
    semi: [1, 'always'],
    'semi-spacing': [1],

    'one-var': [1, {
      initialized: 'never',
    }],

    'no-multi-spaces': [1],
    'no-empty': [1],
    'space-infix-ops': [1],
    'comma-spacing': [1],

    'spaced-comment': [1, 'always', {
      exceptions: ['*'],
    }],

    'no-unneeded-ternary': [1],
    'no-useless-call': [1],
    'block-scoped-var': [1],
    'space-in-parens': [1],
    'keyword-spacing': [1],
    'arrow-spacing': [1],
    'space-unary-ops': [1],
    'new-parens': [1],
    'key-spacing': [1],
    eqeqeq: [1],
    'eol-last': [1],
    'dot-location': [1, 'property'],
    'no-lone-blocks': [1],
    'no-native-reassign': [1],
    'no-nested-ternary': [1],
  },
}]);
