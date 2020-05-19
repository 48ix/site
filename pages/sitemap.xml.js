import * as React from 'react';
import siteConfig from '../siteConfig';

const createUrl = (baseUrl, id) => `
    <url>
        <loc>${`${baseUrl}/${id}`}</loc>
    </url>`;

const createSitemap = (
  baseUrl,
  sections,
) => `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sections.map(section => {
  let urls = [];
  if (section.sections === undefined) {
    urls.push(createUrl(baseUrl, section.id));
  } else {
    section.sections.map(sub => {
      urls.push(createUrl(baseUrl, sub.id));
    });
  }
  return urls.join('');
})}
</urlset>
    `;

class SiteMap extends React.Component {
  static async getInitialProps({ res }) {
    res.setHeader('Content-Type', 'text/xml');
    res.write(createSitemap(siteConfig.url, siteConfig.sections));
    res.end();
  }
}

export default SiteMap;
