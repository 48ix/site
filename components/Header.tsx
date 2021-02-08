import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Flex, Link } from '@chakra-ui/react';
import { useColorValue, useMobile } from '~context';
import { JoinButton, MobileNav, JoinForm, HeaderStats, Logo, ColorModeButton } from '~components';

import type { BoxProps } from '@chakra-ui/react';

interface BaseHeaderProps extends BoxProps {
  showBorder: boolean;
}

export const BaseHeader: React.FC<BaseHeaderProps> = (props: BaseHeaderProps) => {
  const { showBorder, ...rest } = props;
  const bg = useColorValue('white', 'dark.500');
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
      borderBottom={showBorder ? '1px' : undefined}
      {...rest}
    />
  );
};

export const Header: React.FC<BoxProps> = (props: BoxProps) => {
  const { pathname } = useRouter();
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const isMobile = useMobile();

  useEffect(() => {
    if (isMobile) {
      if (pathname === '/' && showHeader === true) {
        setShowHeader(false);
      } else if (pathname !== '/' && showHeader === false) {
        setShowHeader(true);
      }
    }
  }, [isMobile, pathname, setShowHeader]);

  return (
    <BaseHeader showBorder={showHeader} py={{ base: showHeader ? 2 : 6, lg: 0 }} {...props}>
      <Flex size="100%" px={6} align="center" justify="space-between">
        <Flex justify="space-between">
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
