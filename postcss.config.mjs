/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    ...(process.env.NODE_ENV === 'production'
      ? {
          autoprefixer: {},
          cssnano: {
            preset: ['default', {
              discardComments: { removeAll: true },
              normalizeWhitespace: true,
              minifyFontValues: true,
              minifyGradients: true,
              colormin: true,
              convertValues: true,
              mergeLonghand: true,
              mergeRules: true,
              minifySelectors: true,
              reduceIdents: true,
            }],
          },
        }
      : {}),
  },
};

export default config;