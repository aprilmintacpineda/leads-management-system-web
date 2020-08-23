module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  root: true,
  plugins: ['react'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  globals: {
    Atomics: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    curly: ['error', 'multi-or-nest', 'consistent'],
    'linebreak-style': ['error', 'unix'],
    'no-duplicate-imports': [
      'error',
      {
        includeExports: true
      }
    ],
    'react/prop-types': 0,
    'react/display-name': 0,
    'rest-spread-spacing': ['error', 'never'],
    'jsx-quotes': ['error', 'prefer-double'],
    'prefer-spread': ['error'],
    'prefer-const': 'error',
    'no-useless-call': ['error'],
    'no-trailing-spaces': ['error'],
    'space-before-blocks': ['error', 'always'],
    'no-unused-vars': ['error'],
    'no-floating-decimal': ['error'],
    'comma-dangle': ['error', 'never'],
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'switch-colon-spacing': [
      'error',
      {
        after: true,
        before: false
      }
    ],
    'space-unary-ops': [
      'error',
      {
        words: true,
        nonwords: false
      }
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'always',
        asyncArrow: 'always'
      }
    ],
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'key-spacing': [
      'error',
      {
        singleLine: {
          beforeColon: false,
          afterColon: true,
          mode: 'strict'
        },
        multiLine: {
          beforeColon: false,
          afterColon: true,
          mode: 'strict'
        }
      }
    ],
    'generator-star-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    'no-debugger': 'warn',
    'no-console': 'warn',
    'no-alert': 'warn'
  }
};
