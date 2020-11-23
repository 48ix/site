import { Box } from '@chakra-ui/react';
import { useColorValue } from '~context';

export const TableCell = ({ bordersVertical = [false, 0, 0], align, cell, children, ...props }) => {
  const cellBorder = useColorValue(
    { borderLeft: '1px', borderLeftColor: 'blackAlpha.100' },
    { borderLeft: '1px', borderLeftColor: 'whiteAlpha.100' },
  );
  const [doVerticalBorders, index] = bordersVertical;

  let borderProps = {};
  if (doVerticalBorders && index !== 0) {
    borderProps = cellBorder;
  }

  return (
    <Box
      as="td"
      px={3}
      m={0}
      w="1%"
      whiteSpace="nowrap"
      textAlign={align}
      {...borderProps}
      {...props}>
      {children}
    </Box>
  );
};
