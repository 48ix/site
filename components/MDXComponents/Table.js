import * as React from 'react';
import { Box, useColorMode } from '@chakra-ui/core';

const bg = { light: 'blackAlpha.50', dark: 'whiteAlpha.50' };
const border = { dark: 'original.dark.50', light: 'gray.100' };

const Table = props => {
  const { colorMode } = useColorMode();
  return (
    <Box
      as="table"
      textAlign="left"
      mt={4}
      borderWidth="1px"
      borderColor={border[colorMode]}
      width="full"
      {...props}
    />
  );
};

const TableHeader = props => {
  const { colorMode } = useColorMode();
  return <Box as="th" bg={bg[colorMode]} fontWeight="semibold" p={2} fontSize="sm" {...props} />;
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
