import * as React from 'react';
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
import HeaderGraph from './HeaderGraph';
import useRouteChanged from '../hooks/useRouteChanged';

const drawerBg = { dark: 'dark.800', light: 'gray.50' };

const MobileNav = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const { colors } = useTheme();
  const burgerColor = { dark: colors.dark[300], light: colors.blue[500] };
  useRouteChanged(onClose);

  return (
    <>
      <Hamburger
        rounded
        toggled={isOpen}
        alt="Navigation"
        toggle={onToggle}
        label="Navigation Menu"
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
