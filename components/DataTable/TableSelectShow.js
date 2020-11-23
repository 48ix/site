import { Select } from '@chakra-ui/react';

export const TableSelectShow = ({ value, onChange, ...props }) => {
  return (
    <Select borderRadius="md" size="sm" onChange={onChange} {...props}>
      {[5, 10, 20, 30, 40, 50].map(value => (
        <option key={value} value={value}>
          Show {value}
        </option>
      ))}
    </Select>
  );
};
