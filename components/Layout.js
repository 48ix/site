import * as React from 'react';
import { Global } from '@emotion/core';
import dynamic from 'next/dynamic';
import NextHead from 'next/head';
import { Box, useColorMode, useTheme } from '@chakra-ui/core';
import { useMedia, useGlobalState } from './Provider';

const Aside = dynamic(() => import('./Aside'));
const Header = dynamic(() => import('./Header'));
const Footer = dynamic(() => import('./Footer'));
const JoinForm = dynamic(() => import('./JoinForm'));

const borderColor = { dark: 'dark.300', light: 'blue.500' };
const selectionBg = { dark: 'rgba(244, 220, 135, 0.99)', light: 'rgba(237, 43, 83, 0.99)' };
const selectionColor = { dark: 'black', light: 'white' };

const SiteContainer = props => {
  return <Box className="site-container" minH="100vh" h="100%" {...props} />;
};

const Main = props => (
  <Box
    as="main"
    mx={{ sm: 2, md: 2, lg: 20, xl: 32 }}
    pt={8}
    px={[2, 2, 5]}
    overflowX="hidden"
    {...props}
  />
);

const Layout = ({ children }) => {
  const { colorMode } = useColorMode();
  const { colors } = useTheme();
  const { isLg, isXl } = useMedia();
  const { hideToc } = useGlobalState();
  const isMdx = children.type.isMDXComponent === true;
  let layoutPaddingRight = { _: 2, lg: 0, xl: 0 };
  if (isMdx && !hideToc) {
    layoutPaddingRight = { _: 2, lg: '18rem', xl: '18rem' };
  }
  const bg = { dark: colors.original.dark, light: 'white' };
  const textColor = { dark: colors.original.light, light: 'black' };
  return (
    <>
      <NextHead>
        <link rel="icon" type="image/x-icon" href={`/favicon-${colorMode}.ico`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`/favicon-${colorMode}-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`/favicon-${colorMode}-16x16.png`} />
      </NextHead>
      <SiteContainer>
        <Header borderColor={borderColor[colorMode]} />
        {(isLg || isXl) && <Aside borderColor={borderColor[colorMode]} />}
        <Main>
          <Box
            pr={layoutPaddingRight}
            pl={{ _: 2, lg: '18rem', xl: '18rem' }}
            mt={[20, 20, 16, 16]}
            minH="70vh">
            {children}
          </Box>
          <JoinForm />
          <Footer
            pl={{ sm: 0, md: 0, lg: '18rem', xl: '18rem' }}
            mt={16}
            mb={isMdx ? [20, 20, 10] : 10}
          />
        </Main>
        <Global
          styles={{
            body: { backgroundColor: bg[colorMode], color: textColor[colorMode] },
            '*::selection': {
              backgroundColor: selectionBg[colorMode],
              color: selectionColor[colorMode],
            },
          }}
        />
      </SiteContainer>
    </>
  );
};

export default Layout;
