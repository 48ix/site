import * as React from 'react';
import { createContext, useContext, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MDXProvider } from '@mdx-js/react';
import { CSSReset, ThemeProvider, useDisclosure } from '@chakra-ui/core';
import { useMediaLayout } from 'use-media';
import MDXComponents from '../components/MDXComponents';
import { makeTheme } from '../util';
import { initGA, logPageView } from '../analytics';
const MediaContext = createContext(null);
const ProviderContext = createContext(null);
const StateContext = createContext(null);

const ColorModeProvider = dynamic(
  () => import('@chakra-ui/core').then(mod => mod.ColorModeProvider),
  { ssr: false },
);

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
  const value = useMemo(() => ({
    joinFormOpen,
    joinFormOnOpen,
    joinFormOnClose,
  }));
  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};

export const useHyperglassState = () => useContext(StateContext);

const Provider = ({ config, children }) => {
  const value = useMemo(() => config, [config]);
  const theme = makeTheme(config.theme);
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA(value.googleAnalytics.trackingId);
      window.GA_INITIALIZED = true;
    }
    logPageView();
  });
  return (
    <ProviderContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <ColorModeProvider value="dark">
          <CSSReset />
          <MediaProvider theme={theme}>
            <MDXProvider components={MDXComponents}>
              <StateProvider>{children}</StateProvider>
            </MDXProvider>
          </MediaProvider>
        </ColorModeProvider>
      </ThemeProvider>
    </ProviderContext.Provider>
  );
};

export default Provider;

export const useConfig = () => useContext(ProviderContext);
export const useMedia = () => useContext(MediaContext);
export const useGlobalState = () => useContext(StateContext);
