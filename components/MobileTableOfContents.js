import * as React from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  useColorMode,
  useTheme,
} from '@chakra-ui/core';
import { TocContent } from './TableOfContents';

const drawerBg = { dark: 'dark.800', light: 'gray.50' };
const btnColor = { dark: 'dark', light: 'blue' };

const Dots = ({
  stroke,
  color,
  size = '16px',
  width,
  height = 'auto',
  strokeWidth = 0,
  ...props
}) => (
  <Box
    as="svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1024 512"
    stroke={stroke || color || 'currentColor'}
    strokeWidth={strokeWidth}
    width={width || size}
    height={height}
    {...props}>
    <circle fill={stroke || color || 'currentColor'} cx={256} cy={256} r={80} />
    <circle fill={stroke || color || 'currentColor'} cx={512} cy={256} r={80} />
    <circle fill={stroke || color || 'currentColor'} cx={768} cy={256} r={80} />
  </Box>
);

const MobileTableOfContents = ({ headings = [] }) => {
  const { colorMode } = useColorMode();
  const { colors } = useTheme();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const dotColor = { dark: colors.dark[700], light: colors.blue[200] };
  return (
    <Box
      as="nav"
      pos="fixed"
      bottom={0}
      left={0}
      right={0}
      zIndex={4}
      width="full"
      height={[20, 20, 16]}>
      <Box mx="auto" mt={4} w="max-content">
        <Button
          borderRadius="1rem"
          variantColor={btnColor[colorMode]}
          onClick={onToggle}
          aria-label="Open Table of Contents">
          <Dots width="64px" height="auto" color={dotColor[colorMode]} />
        </Button>
        <Drawer size="xs" isOpen={isOpen} placement="bottom" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg={drawerBg[colorMode]}>
            <DrawerBody p={0} mt={2}>
              <TocContent contentHeight="40vh" headings={headings} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Box>
  );
};

export default MobileTableOfContents;
