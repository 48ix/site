import * as React from 'react';
import { Box, useColorMode } from '@chakra-ui/core';

const bg = { light: 'blackAlpha.100', dark: 'whiteAlpha.100' };
const border = { dark: 'whiteAlpha.100', light: 'gray.100' };

const Table = props => {
  const { colorMode } = useColorMode();
  return (
    <Box mt={4} overflow="auto" borderWidth="1px" borderRadius="md" borderColor={border[colorMode]}>
      <Box as="table" textAlign="left" width="full" overflowX="hidden" {...props} />
    </Box>
  );
};

const TableHeader = props => {
  const { colorMode } = useColorMode();
  return <Box as="th" bg={bg[colorMode]} fontWeight="bold" p={2} fontSize="sm" {...props} />;
};

const TableCell = ({ isHeader = false, ...props }) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      as={isHeader ? 'th' : 'td'}
      p={2}
      borderTopWidth="1px"
      borderColor={border[colorMode]}
      fontSize="sm"
      whiteSpace="normal"
      {...props}
    />
  );
};

export { TableCell, TableHeader, Table };
