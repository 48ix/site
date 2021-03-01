const fs = require('fs');

const globby = require('globby');
const prettier = require('prettier');

function cleanPages(pages) {
  const paths = pages.map(page => {
    const path = page
      .replace('pages', '')
      .replace('docs', '')
      .replace('.js', '')
      .replace('.mdx', '')
      .replace('.tsx', '');
    if (path === '/index') {
      return '';
    } else {
      return path;
    }
  });
  return paths.sort();
}

(async () => {
  const prettierConfig = await prettier.resolveConfig('./prettier.config.js');

  const pages = await globby([
    'pages/**/*.tsx',
    'docs/*.mdx',
    '!pages/_*.tsx',
    '!pages/404.tsx',
    '!pages/[page].tsx',
    '!pages/subscribe/*',
  ]);
  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${cleanPages(pages)
          .map(path => {
            console.log('Added', path, 'to sitemap');
            return `
            <url>
              <loc>
                https://48ix.net${path}
              </loc>
            </url>`;
          })
          .join('')}
        </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  fs.writeFileSync('public/sitemap.xml', formatted);
})();
