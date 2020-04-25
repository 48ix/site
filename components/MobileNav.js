import * as React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Drawer,
  DrawerBody,
  IconButton,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/core';
import { MdDehaze } from 'react-icons/md';
import { AsideContent } from './Aside';

const useRouteChanged = callback => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = url => {
      callback();
      console.log('App is changing to: ', url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, callback]);
};

const MobileNav = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  useRouteChanged(onClose);

  return (
    <>
      <IconButton
        display={{ sm: 'inline-flex', md: 'none' }}
        aria-label="Navigation Menu"
        fontSize="20px"
        variant="ghost"
        icon={MdDehaze}
        onClick={onToggle}
        marginRight="-16px"
      />
      <Drawer size="xs" isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody p={0}>
            <AsideContent contentHeight="100vh" top="0" />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNav;
