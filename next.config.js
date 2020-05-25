const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withMdxEnhanced = require('next-mdx-enhanced');

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require('remark-autolink-headings'), require('remark-admonitions')],
  },
});

module.exports = withBundleAnalyzer(
  withMdxEnhanced({
    fileExtensions: ['mdx'],
    remarkPlugins: [require('remark-autolink-headings'), require('remark-admonitions')],
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
