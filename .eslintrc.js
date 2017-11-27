/* @flow */

module.exports = {
  extends: ['eslint-config-react-app', 'prettier'],
  plugins: ['flowtype', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
  },
};
