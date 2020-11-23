import { useMemo } from 'react';
import NextHead from 'next/head';
import { Box } from '@chakra-ui/react';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { SEO, Aside, Header, Footer, JoinForm } from '~components';
import { useColorMode, useColorValue, useMobile, useToc } from '~context';

const queryCache = new QueryCache();

const SiteContainer = props => {
  return <Box className="site-container" minH="100vh" h="100%" {...props} />;
};

const Main = props => (
  <Box
    pt={8}
    as="main"
    px={[2, 2, 5]}
    overflowX="hidden"
    mx={{ base: 2, md: 2, lg: 20, xl: 32 }}
    {...props}
  />
);

export const Layout = ({ children }) => {
  const { colorMode } = useColorMode();
  const isMobile = useMobile();
  const borderColor = useColorValue('blue.500', 'dark.300');
  const { hidden } = useToc();

  const isMdx = useMemo(() => children.type.isMDXComponent === true);

  let layoutPaddingRight = { base: 2, lg: 0, xl: 0 };

  if (isMdx && !hidden) {
    layoutPaddingRight = { base: 2, lg: '18rem', xl: '18rem' };
  }

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <SEO />
      <NextHead>
        <link rel="icon" type="image/x-icon" href={`/favicon-${colorMode}.ico`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`/favicon-${colorMode}-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`/favicon-${colorMode}-16x16.png`} />
      </NextHead>
      <SiteContainer>
        <Header borderColor={borderColor} />
        {!isMobile && <Aside borderColor={borderColor} />}
        <Main>
          <Box
            pr={layoutPaddingRight}
            pl={{ base: 2, lg: '18rem', xl: '18rem' }}
            mt={[20, 20, 16, 16]}
            minH="70vh">
            {children}
          </Box>
          <JoinForm />
          <Footer
            pl={{ base: 0, md: 0, lg: '18rem', xl: '18rem' }}
            mt={16}
            mb={isMdx ? [20, 20, 10] : 10}
          />
        </Main>
      </SiteContainer>
    </ReactQueryCacheProvider>
  );
};
