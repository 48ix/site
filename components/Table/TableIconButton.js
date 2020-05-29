import * as React from 'react';
import { IconButton } from '@chakra-ui/core';

const TableIconButton = ({ icon, onClick, isDisabled, color, ...props }) => {
  return (
    <IconButton
      size="sm"
      icon={icon}
      borderWidth={1}
      borderRadius="md"
      onClick={onClick}
      variantColor={color}
      isDisabled={isDisabled}
      aria-label="Table Icon Button"
      {...props}
    />
  );
};

export default TableIconButton;
