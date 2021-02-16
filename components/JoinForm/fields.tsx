import {
  chakra,
  Input,
  Radio,
  Select,
  HStack,
  FormLabel,
  RadioGroup,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { useJoinTerm } from '~context';

import type { RadioGroupProps } from '@chakra-ui/react';
import type { UseControllerOptions } from 'react-hook-form';

import type { SelectFieldProps, TextFieldProps } from './types';

const FormField = chakra('div', { baseStyle: { my: 2, p: 2 } });

export const TextField: React.FC<TextFieldProps> = (props: TextFieldProps) => {
  const {
    id,
    label,
    rules = {},
    required = false,
    error = 'This field is invalid or required.',
    ...rest
  } = props;

  const { control, errors } = useFormContext();
  const controlRules = { maxLength: 32, ...rules };
  if (required === true && controlRules.required !== true) {
    controlRules.required = true;
  }

  return (
    <FormField>
      <FormControl isInvalid={typeof errors[id] !== 'undefined'}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <Controller
          name={id}
          defaultValue=""
          rules={rules}
          control={control}
          render={({ value, onChange }) => (
            <Input id={id} name={id} value={value} onChange={onChange} {...rest} />
          )}
        />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </FormField>
  );
};

export const SelectField: React.FC<SelectFieldProps> = (props: SelectFieldProps) => {
  const {
    id,
    label,
    options,
    rules = {},
    required = false,
    error = 'This field is invalid or required.',
    ...rest
  } = props;
  const { control, errors } = useFormContext();

  if (required === true && rules.required !== true) {
    rules.required = true;
  }

  const controlProps = {} as Partial<UseControllerOptions>;

  for (const opt of options) {
    if (opt.default === true) {
      controlProps.defaultValue = opt.id;
    }
  }

  return (
    <FormField>
      <FormControl isInvalid={typeof errors[id] !== 'undefined'}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <Controller
          name={id}
          rules={rules}
          control={control}
          {...controlProps}
          render={({ value, onChange }) => (
            <Select id={id} name={id} value={value} onChange={onChange} {...rest}>
              {options.map(opt => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </Select>
          )}
        />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </FormField>
  );
};

export const TermField: React.FC<NoChildren<RadioGroupProps>> = (
  props: NoChildren<RadioGroupProps>,
) => {
  const { control } = useFormContext();
  const { term } = useJoinTerm();
  return (
    <FormField>
      <Controller
        name="term"
        defaultValue={term}
        control={control}
        render={({ value, onChange }) => (
          <RadioGroup name="term" value={value} onChange={onChange} {...props}>
            <HStack spacing={8}>
              <Radio value="monthly">Monthly</Radio>
              <Radio value="annual">Annual</Radio>
            </HStack>
          </RadioGroup>
        )}
      />
    </FormField>
  );
};
