import { chakra } from '@chakra-ui/react';

export const CardFooter = chakra('div', {
  baseStyle: {
    p: 4,
    flexDir: 'row',
    overflowX: 'hidden',
    overflowY: 'hidden',
    borderTopWidth: '1px',
    roundedBottomLeft: 4,
    roundedBottomRight: 4,
    justifyContent: 'space-between',
    display: 'flex',
  },
});
