import { Select } from '@chakra-ui/react';

import type { SelectProps } from '@chakra-ui/react';

export const TableSelectShow: React.FC<SelectProps> = (props: SelectProps) => {
  const { value, onChange, ...rest } = props;
  return (
    <Select borderRadius="md" size="sm" onChange={onChange} {...rest}>
      {[5, 10, 20, 30, 40, 50].map(value => (
        <option key={value} value={value}>
          Show {value}
        </option>
      ))}
    </Select>
  );
};
