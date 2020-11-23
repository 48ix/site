import { Box } from '@chakra-ui/react';
import { useColorValue } from '~context';
import { useOpposingColor } from '~hooks';

export const TableRow = ({
  highlight = false,
  highlightBg = 'primary',
  doStripe = false,
  doHorizontalBorders = false,
  index = 0,
  children = false,
  ...props
}) => {
  const alpha = useColorValue('100', '200');
  const alphaHover = useColorValue('200', '100');
  const bgColor = `${highlightBg}.${alpha}`;
  const bgStripe = useColorValue('blackAlpha.50', 'whiteAlpha.50');
  const hoverBg = useColorValue('blackAlpha.50', 'whiteAlpha.50');
  const rowBorder = useColorValue(
    { borderTop: '1px', borderTopColor: 'blackAlpha.100' },
    { borderTop: '1px', borderTopColor: 'whiteAlpha.100' },
  );

  let bg;
  if (highlight) {
    bg = bgColor;
  } else if (doStripe && index % 2 !== 0) {
    bg = bgStripe;
  }
  const highlightColor = useOpposingColor(bg);

  const borderProps = doHorizontalBorders && index !== 0 ? rowBorder : {};

  return (
    <Box
      as="tr"
      _hover={{
        backgroundColor: highlight ? `${highlightBg}.${alphaHover}` : hoverBg,
      }}
      bg={bg}
      color={highlight ? highlightColor : undefined}
      fontWeight={highlight ? 'bold' : undefined}
      {...borderProps}
      {...props}>
      {children}
    </Box>
  );
};
