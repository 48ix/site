import * as React from 'react';
import { NextSeo } from 'next-seo';
import { useConfig } from './Provider';

const SEO = ({ description, title }) => {
  const config = useConfig();
  return (
    <NextSeo
      title={title || config.siteName}
      description={description || config.siteDescription}
      titleTemplate={`${config.title} | %s`}
    />
  );
};

SEO.displayName = 'SEO';

export default SEO;
