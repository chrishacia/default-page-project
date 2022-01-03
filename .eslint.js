module.exports = {
  plugins: ['import'],
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          'index',
          'sibling',
          'parent',
          'internal',
          'external',
          'builtin',
        ],
      },
    ],
  },
};
