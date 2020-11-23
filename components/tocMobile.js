import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  useToken,
} from '@chakra-ui/react';
import { TocContent } from '~components';
import { useColorValue } from '~context';

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

export const MToc = ({ headings = [] }) => {
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
      height={[20, 20, 16]}>
      <Box mx="auto" mt={4} w="max-content">
        <Button
          onClick={onToggle}
          borderRadius="1rem"
          colorScheme={btnColor}
          aria-label="Open Table of Contents">
          <Dots width="64px" height="auto" color={dotColor} />
        </Button>
        <Drawer size="xs" isOpen={isOpen} placement="bottom" onClose={onClose}>
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
