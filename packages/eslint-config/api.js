const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use server side
 * typescript packages.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    '@vercel/style-guide/eslint/node',
    '@vercel/style-guide/eslint/typescript',
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  env: {
    node: true,
    es6: true,
  },
  plugins: ['only-warn'],
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  overrides: [
    {
      files: ['**/__tests__/**/*'],
      env: {
        jest: true,
      },
    },
  ],
  ignorePatterns: ['node_modules/', 'dist/', '.eslintrc.cjs'],
  // add rules configurations here
  rules: {
    'import/no-default-export': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-extraneous-dependencies': [
      1,
      {
        packageDir: ['.', '../..'],
      },
    ],
    'no-console': ['error', { allow: ['error', 'info', 'warn'] }],
    'import/order': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'unicorn/filename-case': 'off',
  },
};
