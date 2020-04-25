import * as React from 'react';
import NextLink from 'next/link';
import { Box, Flex, Link, useDisclosure, useColorMode } from '@chakra-ui/core';
import DarkModeToggle from 'react-dark-mode-toggle';
import JoinButton from './JoinButton';
import MobileNav from './MobileNav';
import { useConfig } from './Provider';
import JoinForm from './JoinForm';
import HeaderGraph from './HeaderGraph';

const bg = { light: 'white', dark: 'original.dark' };
const borderColor = { dark: 'dark.300', light: 'teal.500' };

export const BaseHeader = props => {
  const { colorMode } = useColorMode();
  return (
    <Box
      pos="fixed"
      as="header"
      top="0"
      zIndex="4"
      left="0"
      right="0"
      borderBottomWidth="1px"
      borderColor={borderColor[colorMode]}
      width="full"
      height="4rem"
      {...props}
    />
  );
};

const Header = props => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const config = useConfig();

  return (
    <BaseHeader bg={bg[colorMode]} {...props}>
      <Flex size="100%" px="6" align="center" justify="space-between">
        <Flex justify="flex-start" justify="space-between">
          <Flex align="center" mr={5}>
            <NextLink href="/" passHref>
              <Link>{config.title}</Link>
            </NextLink>
          </Flex>
          <Flex align="center" ml={5}></Flex>
        </Flex>
        <Flex
          flex={{ sm: '1', md: 'none' }}
          ml={5}
          align="center"
          color="gray.500"
          justify="flex-end">
          <HeaderGraph />
          <JoinButton onClick={onOpen} />
          <JoinForm isOpen={isOpen} onClose={onClose} />
          <DarkModeToggle speed={2.5} onChange={toggleColorMode} checked={colorMode === 'dark'} />
          <MobileNav />
        </Flex>
      </Flex>
    </BaseHeader>
  );
};

export default Header;
