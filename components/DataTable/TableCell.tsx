import { Box } from '@chakra-ui/react';
import { useColorValue } from '~context';

import type { BoxProps } from '@chakra-ui/react';

interface TableCellProps extends BoxProps {
  align: BoxProps['textAlign'];
  bordersVertical?: [boolean, number];
}

export const TableCell: React.FC<TableCellProps> = (props: TableCellProps) => {
  const { bordersVertical = [false, 0], align, children, ...rest } = props;

  const cellBorder = useColorValue(
    { borderLeft: '1px', borderLeftColor: 'blackAlpha.100' },
    { borderLeft: '1px', borderLeftColor: 'whiteAlpha.100' },
  );

  const [doVerticalBorders, index] = bordersVertical;

  let borderProps = {} as BoxProps;
  if (doVerticalBorders && index !== 0) {
    borderProps = cellBorder;
  }

  return (
    <Box
      m={0}
      px={3}
      w="1%"
      as="td"
      textAlign={align}
      whiteSpace="nowrap"
      {...borderProps}
      {...rest}>
      {children}
    </Box>
  );
};
