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
  useTheme,
} from '@chakra-ui/core';
import { Sling as Hamburger } from 'hamburger-react';
import ColorModeButton from './ColorModeButton';
import { AsideContent } from './Aside';
import JoinButton from './JoinButton';
import JoinForm from './JoinForm';
import HeaderGraph from './HeaderGraph';

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

const drawerBg = { dark: 'dark.800', light: 'gray.50' };

const MobileNav = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const burgerColor = { dark: theme.colors.dark[300], light: theme.colors.blue[500] };
  useRouteChanged(onClose);

  return (
    <>
      <Hamburger
        rounded
        toggled={isOpen}
        alt="Navigation"
        toggle={onToggle}
        aria-label="Navigation"
        color={burgerColor[colorMode]}
      />
      <Drawer size="xs" isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={drawerBg[colorMode]}>
          <DrawerBody p={0}>
            <DrawerHeader>
              <HeaderGraph />
              <Flex mt={10} justifyContent="space-between">
                <ColorModeButton />
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

MobileNav.displayName = 'MobileNav';
export default MobileNav;
