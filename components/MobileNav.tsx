import {
  Flex,
  Drawer,
  useToken,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { Sling as Hamburger } from 'hamburger-react';
import { useColorValue } from '~context';
import { AsideContent, ColorModeButton, JoinButton, HeaderStats } from '~components';
import { useRouteChanged } from '~hooks';

export const MobileNav: React.FC = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const drawerBg = useColorValue('gray.50', 'dark.800');
  const burgerColor = useColorValue(useToken('colors', 'blue.500'), useToken('colors', 'dark.300'));

  useRouteChanged(onClose);

  return (
    <>
      <Hamburger
        rounded
        toggled={isOpen}
        toggle={onToggle}
        color={burgerColor}
        label="Navigation Menu"
      />
      <Drawer size="xs" isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={drawerBg}>
          <DrawerBody p={0}>
            <DrawerHeader>
              <HeaderStats />
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
