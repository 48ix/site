import { Box } from '@chakra-ui/core';

const TableBody = ({ children, ...props }) => (
  <Box
    as="tbody"
    overflowY="scroll"
    css={{
      '&::-webkit-scrollbar': { display: 'none' },
      '&': { msOverflowStyle: 'none' },
    }}
    overflowX="hidden"
    {...props}>
    {children}
  </Box>
);

export default TableBody;
