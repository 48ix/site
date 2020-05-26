const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withMdxEnhanced = require('next-mdx-enhanced');

module.exports = withBundleAnalyzer(
  withMdxEnhanced({
    fileExtensions: ['mdx'],
    remarkPlugins: [require('remark-slug'), require('./remark-headings')],
    defaultLayout: true,
  })({
    webpack: (config, { isServer }) => {
      if (isServer) {
        require('./generateSitemap');
      }
      return config;
    },
    env: {
      GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    },
  }),
);
