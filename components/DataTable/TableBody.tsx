import { chakra } from '@chakra-ui/react';

export const TableBody = chakra('tbody', {
  baseStyle: {
    overflowY: 'scroll',
    '&::-webkit-scrollbar': { display: 'none' },
    '&': { msOverflowStyle: 'none' },
    overflowX: 'hidden',
  },
});
