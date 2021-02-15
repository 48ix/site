import type { InputProps, SelectProps } from '@chakra-ui/react';
import type { UseControllerOptions } from 'react-hook-form';

export interface BaseField {
  id: string;
  label: string;
  hasError?: boolean;
  required?: boolean;
  error?: string;
  rules?: UseControllerOptions['rules'];
}

export interface SelectOption {
  id: number | string;
  label: string;
  default?: boolean;
}

export interface SelectFieldProps extends BaseField, Omit<SelectProps, 'id'> {
  options: SelectOption[];
}

export type TextFieldProps = BaseField & InputProps;

export type JoinFormData = {
  org: string;
  contact: string;
  asn: string;
  email: string;
  facility: string;
  port_speed: string;
  term: string;
};

export type JoinFormSubmission = {
  memberName: string;
  memberAsn: string;
  contactName: string;
  contactEmail: string;
  facilityName: string;
  portSpeed: string;
  term: string;
  timestamp: number;
};
