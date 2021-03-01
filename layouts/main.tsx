import { useMemo } from 'react';
import NextHead from 'next/head';
import { chakra, Box } from '@chakra-ui/react';
import { SEO, Aside, Header, Footer, JoinForm } from '~components';
import { useColorMode, useColorValue, useMobile, useToc } from '~context';
import { useIsMDX } from '~hooks';

import type { BoxProps } from '@chakra-ui/react';

interface LayoutProps extends NoChildren<BoxProps> {
  children: JSX.Element;
}

const SiteContainer = chakra('div', { baseStyle: { minH: '100vh', h: '100%' } });

const Main = chakra('main', {
  baseStyle: {
    pt: 8,
    px: { base: 2, lg: 5 },
    overflowX: 'hidden',
    mx: { base: 2, lg: 20, xl: 32 },
  },
});

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const { children } = props;
  const { colorMode } = useColorMode();
  const isMobile = useMobile();
  const borderColor = useColorValue('blue.500', 'dark.300');
  const { hidden } = useToc();

  const isMdx = useIsMDX(children);

  const pr = useMemo<BoxProps['pr']>(() => {
    if (isMdx && !hidden) {
      return { base: 2, lg: '18rem', xl: '18rem' };
    } else {
      return { base: 2, lg: 0, xl: 0 };
    }
  }, [isMdx, hidden]);

  return (
    <>
      <SEO />
      <NextHead>
        <link rel="icon" type="image/x-icon" href={`/favicon-${colorMode}.ico`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`/favicon-${colorMode}-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`/favicon-${colorMode}-16x16.png`} />
      </NextHead>
      <SiteContainer className="__site-container">
        <Header borderColor={borderColor} />
        {!isMobile && <Aside borderColor={borderColor} />}
        <Main>
          <Box pr={pr} minH="70vh" mt={{ base: 20, lg: 16 }} pl={{ base: 2, lg: '18rem' }}>
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
    </>
  );
};
