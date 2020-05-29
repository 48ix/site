import * as React from 'react';
import { useRouter } from 'next/router';
import { NextSeo, LocalBusinessJsonLd, LogoJsonLd } from 'next-seo';
import { useConfig } from './Provider';

const SEO = ({ page }) => {
  const { pathname } = useRouter();
  const pageName = pathname.replace('/', '');
  const config = useConfig();
  return (
    <>
      <NextSeo
        title={config.siteSlogan}
        description={config.siteDescription}
        additionalMetaTags={[{ name: 'keywords', content: config.siteKeywords.join(',') }]}
        openGraph={{
          title: config.siteName,
          url: `${config.url}/${pageName}`,
          description: config.siteDescription,
          site_name: config.siteName,
          type: 'website',
          images: [
            {
              url: `${config.url}/opengraph.jpg`,
              width: 1200,
              height: 630,
              alt: config.siteName,
            },
          ],
        }}
        titleTemplate={`%s | ${config.title}`}
      />
      <LocalBusinessJsonLd
        type="LocalBusiness"
        name={config.siteName}
        description={config.siteSlogan}
        id={config.url}
        url={config.url}
        address={config.address}
        images={[`${config.url}/opengraph.jpg`]}
        geo={{
          latitude: '33.395512',
          longitude: '-111.969949',
        }}
      />
      <LogoJsonLd logo={`${config.url}/logo.jpg`} url={config.url} />
    </>
  );
};

export default SEO;
