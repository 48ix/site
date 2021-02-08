import { IconButton } from '@chakra-ui/react';

import type { IconButtonProps } from '@chakra-ui/react';

interface TableIconButtonProps extends NoAria<IconButtonProps> {
  color: IconButtonProps['colorScheme'];
}

export const TableIconButton: React.FC<TableIconButtonProps> = (props: TableIconButtonProps) => {
  const { color, ...rest } = props;
  return (
    <IconButton
      size="sm"
      borderWidth={1}
      borderRadius="md"
      colorScheme={color}
      aria-label="Table Icon Button"
      {...rest}
    />
  );
};
