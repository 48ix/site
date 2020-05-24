const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require('remark-autolink-headings'), require('remark-admonitions')],
  },
});

module.exports = withBundleAnalyzer(
  withMDX({
    pageExtensions: ['js', 'jsx', 'md', 'mdx'],
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
