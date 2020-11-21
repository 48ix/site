import type { ParticipantEntry } from '~types';

export interface ParticipantColumn {
  Header: string;
  accessor: string;
  align: 'left' | 'right' | 'center';
}

export interface ParticipantTableProps {
  rows: ParticipantEntry[];
  columns: ParticipantColumn[];
}
