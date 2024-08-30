module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint-config-airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'next/core-web-vitals',
    // 'plugin:i18next/recommended',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'node_modules',
    'vitest.config.ts',
    'postcss.config.mjs',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'import',
    'react',
    'react-hooks',
    'react-refresh',
    'react-compiler',
    '@typescript-eslint',
    'prettier',
    'unused-imports',
    'i18next',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'unused-imports/no-unused-imports': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/consistent-type-assertions': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react-compiler/react-compiler': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prefer-stateless-function': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'space-in-parens': 'error',
    'space-infix-ops': ['error', { int32Hint: false }],
    'jsx-a11y/aria-role': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'prefer-const': 'error',
    'key-spacing': ['error', { afterColon: true }],
    'no-var': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-magic-numbers': [
      'error',
      {
        ignore: [0, 1, -1, 2, -2],
        ignoreDefaultValues: true,
        ignoreArrayIndexes: true,
      },
    ],

    'max-classes-per-file': ['error', 1],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'off',
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],

    curly: ['error', 'all'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    semi: ['error', 'always'],
  },
};
