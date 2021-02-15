import {
  Box,
  Icon,
  chakra,
  Button,
  Drawer,
  useToken,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useColorValue } from '~context';
import { TocContent } from './desktop';

import type { BoxProps, IconProps } from '@chakra-ui/react';

interface DotsProps extends IconProps {
  size?: string;
}

interface MTocProps extends BoxProps {
  headings: TocHeading[];
}

const Dots: React.FC<DotsProps> = (props: DotsProps) => {
  const { stroke, color, size = '16px', width, height = 'auto', strokeWidth = 0, ...rest } = props;
  return (
    <Icon
      height={height}
      width={width || size}
      viewBox="0 0 1024 512"
      strokeWidth={strokeWidth}
      stroke={stroke || color || 'currentColor'}
      {...rest}>
      <chakra.circle fill={stroke || color || 'currentColor'} cx={256} cy={256} r={80} />
      <chakra.circle fill={stroke || color || 'currentColor'} cx={512} cy={256} r={80} />
      <chakra.circle fill={stroke || color || 'currentColor'} cx={768} cy={256} r={80} />
    </Icon>
  );
};

export const MToc: React.FC<MTocProps> = (props: MTocProps) => {
  const { headings = [], ...rest } = props;
  const { isOpen, onToggle, onClose } = useDisclosure();

  const dotColor = useColorValue(useToken('colors', 'blue.200'), useToken('colors', 'dark.700'));
  const drawerBg = useColorValue('gray.50', 'dark.800');
  const btnColor = useColorValue('blue', 'dark');

  return (
    <Box
      as="nav"
      left={0}
      right={0}
      bottom={0}
      zIndex={4}
      pos="fixed"
      width="full"
      height={{ base: 20, lg: 16 }}
      {...rest}>
      <Box mx="auto" mt={4} w="max-content">
        <Button
          onClick={onToggle}
          borderRadius="1rem"
          colorScheme={btnColor}
          aria-label="Open Table of Contents">
          <Dots width="64px" height="auto" color={dotColor} />
        </Button>
        <Drawer
          size="xs"
          isOpen={isOpen}
          onClose={onClose}
          placement="bottom"
          motionPreset="slideInBottom">
          <DrawerOverlay />
          <DrawerContent bg={drawerBg}>
            <DrawerBody p={0} mt={2}>
              <TocContent contentHeight="40vh" headings={headings} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Box>
  );
};
