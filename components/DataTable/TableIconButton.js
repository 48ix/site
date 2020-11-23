import { IconButton } from '@chakra-ui/react';

export const TableIconButton = ({ icon, onClick, isDisabled, color, ...props }) => {
  return (
    <IconButton
      size="sm"
      icon={icon}
      borderWidth={1}
      borderRadius="md"
      onClick={onClick}
      colorScheme={color}
      isDisabled={isDisabled}
      aria-label="Table Icon Button"
      {...props}
    />
  );
};
