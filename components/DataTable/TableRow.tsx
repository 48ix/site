import { useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import { useColorValue } from '~context';
import { useOpposingColor } from '~hooks';

import type { BoxProps } from '@chakra-ui/react';

interface TableRowProps extends BoxProps {
  highlight?: boolean;
  highlightBg?: string;
  doStripe?: boolean;
  doHorizontalBorders?: boolean;
  index?: number;
}

export const TableRow: React.FC<TableRowProps> = (props: TableRowProps) => {
  const {
    highlight = false,
    highlightBg = 'primary',
    doStripe = false,
    doHorizontalBorders = false,
    index = 0,
    ...rest
  } = props;

  const alpha = useColorValue('100', '200');
  const alphaHover = useColorValue('200', '100');
  const bgColor = `${highlightBg}.${alpha}`;
  const bgStripe = useColorValue('blackAlpha.50', 'whiteAlpha.50');
  const hoverBg = useColorValue('blackAlpha.50', 'whiteAlpha.50');
  const rowBorder = useColorValue(
    { borderTop: '1px', borderTopColor: 'blackAlpha.100' },
    { borderTop: '1px', borderTopColor: 'whiteAlpha.100' },
  );

  const bg = useMemo(() => {
    if (highlight) {
      return bgColor;
    } else if (doStripe && index % 2 !== 0) {
      return bgStripe;
    }
  }, [highlight, doStripe, index]);

  const highlightColor = useOpposingColor(bg ?? '#000');

  const borderProps = doHorizontalBorders && index !== 0 ? rowBorder : {};

  return (
    <Box
      as="tr"
      bg={bg}
      fontWeight={highlight ? 'bold' : undefined}
      color={highlight ? highlightColor : undefined}
      _hover={{ backgroundColor: highlight ? `${highlightBg}.${alphaHover}` : hoverBg }}
      {...borderProps}
      {...rest}
    />
  );
};
