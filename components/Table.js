import { Box } from '@chakra-ui/react';
import { useColorValue } from '~context';

export const Table = props => {
  const border = useColorValue('gray.100', 'whiteAlpha.100');
  return (
    <Box mt={4} overflow="auto" borderWidth="1px" borderRadius="md" borderColor={border}>
      <Box as="table" textAlign="left" width="full" overflowX="hidden" {...props} />
    </Box>
  );
};

export const TableHeader = props => {
  const bg = useColorValue('blackAlpha.100', 'whiteAlpha.100');
  return <Box as="th" bg={bg} fontWeight="bold" p={2} fontSize="sm" {...props} />;
};

export const TableCell = ({ isHeader = false, ...props }) => {
  const border = useColorValue('gray.100', 'whiteAlpha.100');
  return (
    <Box
      p={2}
      fontSize="sm"
      whiteSpace="normal"
      borderTopWidth="1px"
      borderColor={border}
      as={isHeader ? 'th' : 'td'}
      {...props}
    />
  );
};
