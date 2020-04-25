const remarkPlugins = [require('remark-autolink-headings'), require('remark-admonitions')];

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins,
  },
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
});
