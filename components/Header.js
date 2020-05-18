import * as React from 'react';
import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Flex, Link, useColorMode } from '@chakra-ui/core';
import DarkModeToggle from 'react-dark-mode-toggle';
import JoinButton from './JoinButton';
import MobileNav from './MobileNav';
import { useMedia } from './Provider';
import JoinForm from './JoinForm';
import HeaderGraph from './HeaderGraph';
import { StateOutline } from './Logo';

const bg = { light: 'white', dark: 'original.dark' };

export const BaseHeader = props => {
  const { colorMode } = useColorMode();
  return (
    <Box
      top="0"
      left="0"
      right="0"
      zIndex="4"
      pos="fixed"
      as="header"
      width="full"
      height={[20, 20, 16]}
      bg={bg[colorMode]}
      borderBottomWidth="1px"
      {...props}
    />
  );
};

const Header = props => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isSm, isMd, isLg, isXl } = useMedia();
  const { pathname } = useRouter();
  const [showHeader, setShowHeader] = useState(true);
  useEffect(() => {
    if (isSm || isMd) {
      if (pathname === '/' && showHeader === true) {
        setShowHeader(false);
      }
    }
  }, [isSm, isMd, pathname]);
  return (
    <BaseHeader {...props}>
      <Flex size="100%" px={6} align="center" justify="space-between">
        <Flex justify="flex-start" justify="space-between">
          <Flex align="center">
            {showHeader && (
              <NextLink href="/" passHref>
                <Link aria-label="Home">
                  <StateOutline strokeWidth={30} size={48} />
                </Link>
              </NextLink>
            )}
          </Flex>
          <Flex align="center" ml={5}></Flex>
        </Flex>
        <Flex
          align="center"
          color="gray.500"
          justify={['space-between', 'space-between', 'flex-end']}>
          {(isLg || isXl) && (
            <>
              <HeaderGraph />
              <JoinButton />
              <JoinForm />
              <DarkModeToggle
                speed={2.5}
                onChange={toggleColorMode}
                checked={colorMode === 'dark'}
              />
            </>
          )}
        </Flex>
        {(isSm || isMd) && <MobileNav />}
      </Flex>
    </BaseHeader>
  );
};

export default Header;
