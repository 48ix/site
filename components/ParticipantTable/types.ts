import type { ModalContentProps, TextProps, BoxProps } from '@chakra-ui/react';
import type { CellRender } from '~components';
import type { ParticipantEntry, ParticipantTableData } from '~types';

export interface MonoFieldProps extends TextProps {
  v: React.ReactText;
  copyable?: boolean;
}

export interface PortGraphProps extends ModalContentProps {
  rowData: ParticipantEntry;
}

export interface CellProps {
  data: CellRender;
}

export interface ParticipantTableProps {
  data: ParticipantTableData;
  error: string | null;
}

export interface BooleanFieldProps extends BoxProps {
  v: boolean;
  label: string;
}
