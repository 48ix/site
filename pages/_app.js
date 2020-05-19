import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NextSeo, LocalBusinessJsonLd } from 'next-seo';
import Provider from '../components/Provider';
import Layout from '../components/Layout';
import siteConfig from '../siteConfig';

const Main = ({ Component, pageProps }) => {
  const [location, setLocation] = useState({});
  const { pathname } = useRouter();
  const pageName = pathname.replace('/', '');
  let pageConfig = {};
  siteConfig.sections.map(page => {
    page.sections?.map(sub => {
      if (sub.id === pageName) {
        pageConfig = sub;
      }
    });
  });
  const pageKeywords = pageConfig.keywords ?? siteConfig.siteKeywords;
  useEffect(() => {
    setLocation(window.location);

    const WebFont = require('webfontloader');
    WebFont.load({ google: { families: ['Inter:200,400,500,700', 'Fira Code&display=swap'] } });
  });
  return (
    <>
      <NextSeo
        title={pageConfig.title ?? siteConfig.siteName}
        description={pageConfig.description ?? siteConfig.siteDescription}
        additionalMetaTags={[{ name: 'keywords', content: pageKeywords.join(',') }]}
        openGraph={{
          title: pageConfig.title ?? siteConfig.siteName,
          description: pageConfig.description ?? siteConfig.siteDescription,
          site_name: siteConfig.siteName,
          canonical: siteConfig.url,
          type: 'website',
          images: [
            {
              url: `${location.origin}/opengraph.jpg`,
              width: 1200,
              height: 630,
              alt: siteConfig.siteName,
            },
          ],
        }}
        titleTemplate={Object.keys(pageConfig).length > 0 ? `${siteConfig.title} | %s` : null}
      />
      <LocalBusinessJsonLd
        type="LocalBusiness"
        name={siteConfig.orgName}
        description={siteConfig.siteDescription}
        id={siteConfig.url}
        url={siteConfig.url}
        address={siteConfig.address}
        images={[`${location.origin}/opengraph.jpg`]}
        geo={{
          latitude: '33.395512',
          longitude: '-111.969949',
        }}
      />
      <Provider config={siteConfig}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
};

Main.displayName = 'Main';

export default Main;
