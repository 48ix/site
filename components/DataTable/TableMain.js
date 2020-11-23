import { Box } from '@chakra-ui/react';
import { useColorValue } from '~context';

export const TableMain = props => {
  const scrollbar = useColorValue('blackAlpha.300', 'whiteAlpha.300');
  const scrollbarHover = useColorValue('blackAlpha.400', 'whiteAlpha.400');
  const scrollbarBg = useColorValue('blackAlpha.50', 'whiteAlpha.50');

  return (
    <Box
      as="table"
      display="block"
      css={{
        '&::-webkit-scrollbar': { height: '5px' },
        '&::-webkit-scrollbar-track': {
          backgroundColor: scrollbarBg,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: scrollbar,
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: scrollbarHover,
        },

        '-ms-overflow-style': { display: 'none' },
      }}
      overflowX="auto"
      borderRadius="md"
      boxSizing="border-box"
      {...props}
    />
  );
};
