import * as React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Drawer,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  Flex,
  useColorMode,
} from '@chakra-ui/core';
import { Sling as Hamburger } from 'hamburger-react';
import DarkModeToggle from 'react-dark-mode-toggle';
import { AsideContent } from './Aside';
import JoinButton from './JoinButton';
import JoinForm from './JoinForm';
import HeaderGraph from './HeaderGraph';

const burgerColor = { dark: 'white', light: 'black' };

const useRouteChanged = callback => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = url => {
      callback();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, callback]);
};

const MobileNav = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  useRouteChanged(onClose);

  return (
    <>
      <Hamburger toggled={isOpen} toggle={onToggle} rounded color={burgerColor[colorMode]} />
      <Drawer size="xs" isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody p={0}>
            <DrawerHeader>
              <HeaderGraph />
              <Flex mt={10} justifyContent="space-between">
                <DarkModeToggle
                  speed={2.5}
                  onChange={toggleColorMode}
                  checked={colorMode === 'dark'}
                />
                <JoinButton />
                <JoinForm />
              </Flex>
            </DrawerHeader>
            <AsideContent contentHeight="60vh" />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNav;
