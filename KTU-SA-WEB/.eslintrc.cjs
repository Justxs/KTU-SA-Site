module.exports = {
  root: true,
  env: { 
    browser: true, 
    es2020: true 
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'airbnb',
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { 
    ecmaVersion: 'latest', 
    sourceType: 'module' 
  },
  settings: {
    react: { version: '18.2' } 
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-plusplus': 0,
    'import/extensions': 0,
    'linebreak-style': 0,
    'import/no-unresolved': 0,
    'react/react-in-jsx-scope': 0,
    'max-lines': ['error', { max: 200 }],
    'react/destructuring-assignment': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/no-cycle': 0,
  },
}
