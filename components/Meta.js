import * as React from 'react';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useTheme } from '@chakra-ui/core';
import { useConfig } from './components/Provider';
import { googleFontUrl } from '../util';

const Meta = () => {
  const config = useConfig();
  const theme = useTheme();
  const [location, setLocation] = useState({});
  const currentYear = new Date().getFullYear();
  const primaryFont = googleFontUrl(theme.fonts.body);
  const monoFont = googleFontUrl(theme.fonts.mono);
  useEffect(() => {
    setLocation(window.location);
  });
  return (
    <Head>
      <title>{config.title}</title>
      <meta charSet="UTF-8" />
      <meta httpEquiv="Content-Type" content="text/html" />
      <meta name="description" content={config.siteDescription} />
      <meta name="keywords" content={config.siteKeywords.join(', ')} />
      <meta name="author" content={config.author} />
      <meta name="language" content="en" />
      <meta name="copyright" content={`${currentYear} ${config.orgName}`} />
      <meta name="url" content={location.href} />
      <meta name="og:title" content={config.title} />
      <meta name="og:type" content="website" />
      <meta name="og:site_name" content={config.siteName} />
      <meta name="og:url" content={location.href} />
      <meta name="og:image" content="fixme" />
      <meta name="og:description" content={config.siteDescription} />
      <meta property="og:image:alt" content="fixme" />
      <meta property="og:image:width" content="fixme" />
      <meta property="og:image:height" content="fixme" />
      <link href={primaryFont} rel="stylesheet" />
      <link href={monoFont} rel="stylesheet" />
    </Head>
  );
};

Meta.displayName = 'Meta';
