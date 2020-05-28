import * as React from 'react';
import { createContext, useContext, useMemo, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { NextSeo, LocalBusinessJsonLd } from 'next-seo';
import { CSSReset, ThemeProvider, useDisclosure } from '@chakra-ui/core';
import { useMediaLayout } from 'use-media';
import { makeTheme } from '../util';
import { initGA, logPageView } from '../analytics';
import siteConfig from '../siteConfig';

const ColorModeProvider = dynamic(
  () => import('@chakra-ui/core').then(mod => mod.ColorModeProvider),
  { ssr: false },
);

const MediaContext = createContext(null);
const ProviderContext = createContext(null);
const StateContext = createContext(null);

const MediaProvider = ({ theme, children }) => {
  const { sm, md, lg, xl } = theme.breakpoints;
  const isSm = useMediaLayout({ maxWidth: md });
  const isMd = useMediaLayout({ minWidth: md, maxWidth: lg });
  const isLg = useMediaLayout({ minWidth: lg, maxWidth: xl });
  const isXl = useMediaLayout({ minWidth: xl });
  let mediaSize = false;
  switch (true) {
    case isSm:
      mediaSize = 'sm';
      break;
    case isMd:
      mediaSize = 'md';
      break;
    case isLg:
      mediaSize = 'lg';
      break;
    case isXl:
      mediaSize = 'xl';
      break;
  }
  const value = useMemo(
    () => ({
      isSm: isSm,
      isMd: isMd,
      isLg: isLg,
      isXl: isXl,
      mediaSize: mediaSize,
    }),
    [isSm, isMd, isLg, isXl, mediaSize],
  );
  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>;
};

const StateProvider = ({ children }) => {
  const {
    isOpen: joinFormOpen,
    onOpen: joinFormOnOpen,
    onClose: joinFormOnClose,
  } = useDisclosure();
  const [joinFormInterval, setJoinFormInterval] = useState(null);
  const [hideToc, setHideToc] = useState(false);
  const value = useMemo(() => ({
    joinFormOpen,
    joinFormOnOpen,
    joinFormOnClose,
    joinFormInterval,
    setJoinFormInterval,
    hideToc,
    setHideToc,
  }));
  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};

export const useHyperglassState = () => useContext(StateContext);

const Provider = ({ page, children }) => {
  const config = useMemo(() => siteConfig, [siteConfig]);
  const theme = useMemo(() => makeTheme(config.theme), [config]);
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA(process.env.GOOGLE_ANALYTICS_ID || null);
      window.GA_INITIALIZED = true;
    }
    logPageView();
  });
  return (
    <>
      <NextSeo
        title={config.siteSlogan}
        description={config.siteDescription}
        additionalMetaTags={[{ name: 'keywords', content: config.siteKeywords.join(',') }]}
        openGraph={{
          title: config.siteName,
          url: `${config.url}/${page}`,
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
        name={config.orgName}
        description={config.siteDescription}
        id={config.url}
        url={config.url}
        address={config.address}
        images={[`${config.url}/opengraph.jpg`]}
        geo={{
          latitude: '33.395512',
          longitude: '-111.969949',
        }}
      />
      <ProviderContext.Provider value={config}>
        <ThemeProvider theme={theme}>
          <ColorModeProvider>
            <CSSReset />
            <MediaProvider theme={theme}>
              <StateProvider>{children}</StateProvider>
            </MediaProvider>
          </ColorModeProvider>
        </ThemeProvider>
      </ProviderContext.Provider>
    </>
  );
};

export default Provider;

export const useConfig = () => useContext(ProviderContext);
export const useMedia = () => useContext(MediaContext);
export const useGlobalState = () => useContext(StateContext);
