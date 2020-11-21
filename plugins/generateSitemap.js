const fs = require('fs');

const globby = require('globby');
const prettier = require('prettier');

(async () => {
  const prettierConfig = await prettier.resolveConfig('./prettier.config.js');

  const pages = await globby(['pages/**/*{.js,.mdx,.tsx}', '!pages/_*.js', '!pages/subscribe/*']);
  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map(page => {
                const path = page
                  .replace('pages', '')
                  .replace('.js', '')
                  .replace('.mdx', '')
                  .replace('.tsx', '');
                const route = path === '/index' ? '' : path;
                console.log(path, route);
                return `
                  <url>
                      <loc>${`https://48ix.net${route}`}</loc>
                  </url>
              `;
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
