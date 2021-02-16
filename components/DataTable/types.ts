import type { CellProps, ColumnInstance, Row } from 'react-table';
import type { ParticipantEntry, ParticipantColumn } from '~types';

export interface DataTableProps {
  striped?: boolean;
  rowHighlightBg?: string;
  data: ParticipantEntry[];
  initialPageSize?: number;
  bordersVertical?: boolean;
  heading?: React.ReactNode;
  bordersHorizontal?: boolean;
  Cell?: React.FC<CellRender>;
  columns: ParticipantColumn[];
  rowHighlightProp?: keyof ParticipantEntry;
}

export type CellRender = {
  column: ColumnInstance<ParticipantEntry>;
  row: Row<ParticipantEntry>;
  value: ValueOf<ParticipantEntry>;
};
