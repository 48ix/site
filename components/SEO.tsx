import { useRouter } from 'next/router';
import { NextSeo, LocalBusinessJsonLd, LogoJsonLd } from 'next-seo';
import { useConfig } from '~context';

export const SEO: React.FC = () => {
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
          type: 'website',
          title: config.siteName,
          site_name: config.siteName,
          url: `${config.url}/${pageName}`,
          description: config.siteDescription,
          images: [
            {
              url: `${config.url}/opengraph.jpg`,
              alt: config.siteName,
              width: 1200,
              height: 630,
            },
          ],
        }}
        titleTemplate={`%s | ${config.title}`}
      />
      <LocalBusinessJsonLd
        id={config.url}
        url={config.url}
        type="LocalBusiness"
        name={config.siteName}
        address={config.address}
        description={config.siteSlogan}
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
