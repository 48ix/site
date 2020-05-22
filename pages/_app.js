import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NextSeo, LocalBusinessJsonLd } from 'next-seo';
import Provider from '../components/Provider';
import Layout from '../components/Layout';
import siteConfig from '../siteConfig';

const Main = ({ Component, pageProps }) => {
  const [pageConfig, setPageConfig] = useState({});
  const { pathname } = useRouter();
  const pageName = pathname.replace('/', '');

  const pageKeywords = pageConfig.keywords ?? siteConfig.siteKeywords;
  useEffect(() => {
    const WebFont = require('webfontloader');
    WebFont.load({ google: { families: ['Inter:200,400,500,700', 'Fira Code&display=swap'] } });

    siteConfig.sections.map(page => {
      page.sections?.map(sub => {
        if (sub.id === pageName) {
          setPageConfig(sub);
        } else if (pageName === '') {
          setPageConfig({ title: siteConfig.siteSlogan, description: siteConfig.siteDescription });
        }
      });
    });
  }, [pageName]);
  return (
    <>
      <NextSeo
        title={pageConfig.title}
        description={pageConfig.description}
        additionalMetaTags={[{ name: 'keywords', content: pageKeywords.join(',') }]}
        openGraph={{
          title: pageConfig.title ?? siteConfig.siteName,
          url: `${siteConfig.url}/${pageName}`,
          description: pageConfig.description ?? siteConfig.siteDescription,
          site_name: siteConfig.siteName,
          type: 'website',
          images: [
            {
              url: `${siteConfig.url}/opengraph.jpg`,
              width: 1200,
              height: 630,
              alt: siteConfig.siteName,
            },
          ],
        }}
        titleTemplate={`${siteConfig.title} ❮ %s`}
      />
      <LocalBusinessJsonLd
        type="LocalBusiness"
        name={siteConfig.orgName}
        description={siteConfig.siteDescription}
        id={siteConfig.url}
        url={siteConfig.url}
        address={siteConfig.address}
        images={[`${siteConfig.url}/opengraph.jpg`]}
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
