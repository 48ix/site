import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Flex, Link } from '@chakra-ui/react';
import { useColorValue, useMobile } from '~context';
import { JoinButton, MobileNav, JoinForm, HeaderStats, Logo, ColorModeButton } from '~components';

export const BaseHeader = ({ showBorder, ...props }) => {
  const bg = useColorValue('white', 'original.dark');
  return (
    <Box
      top={0}
      bg={bg}
      left={0}
      right={0}
      zIndex={4}
      pos="fixed"
      as="header"
      width="100%"
      height={{ base: 20, lg: 16 }}
      borderBottomWidth={showBorder ? '1px' : null}
      {...props}
    />
  );
};

export const Header = props => {
  const { pathname } = useRouter();
  const [showHeader, setShowHeader] = useState(true);
  const isMobile = useMobile();

  useEffect(() => {
    if (isMobile) {
      if (pathname === '/' && showHeader === true) {
        setShowHeader(false);
      } else if (pathname !== '/' && showHeader === false) {
        setShowHeader(true);
      }
    }
  }, [isMobile, pathname]);

  return (
    <BaseHeader showBorder={showHeader} py={{ base: showHeader ? 2 : 6, lg: 0 }} {...props}>
      <Flex size="100%" px={6} align="center" justify="space-between">
        <Flex justify="flex-start" justify="space-between">
          <Flex align="center">
            {showHeader && (
              <NextLink href="/" passHref>
                <Link aria-label="Home">
                  <Logo strokeWidth={30} size={48} noanimate />
                </Link>
              </NextLink>
            )}
          </Flex>
          <Flex align="center" ml={5} />
        </Flex>
        <Flex align="center" color="gray.500" justify={{ base: 'space-between', lg: 'flex-end' }}>
          {!isMobile && (
            <>
              <HeaderStats />
              <JoinButton />
              <JoinForm />
              <ColorModeButton />
            </>
          )}
        </Flex>
        {isMobile && <MobileNav />}
      </Flex>
    </BaseHeader>
  );
};
