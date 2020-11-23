import { Box } from '@chakra-ui/react';
import { useColorValue } from '~context';

export const TableHead = ({ children, ...props }) => {
  const bg = useColorValue('blackAlpha.100', 'whiteAlpha.100');
  return (
    <Box as="thead" overflowX="hidden" overflowY="auto" bg={bg} {...props}>
      {children}
    </Box>
  );
};
