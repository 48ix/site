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

export type UtilizationPoint = [string, number];

export interface UtilizationCircuitResponse {
  ingress: UtilizationPoint[];
  egress: UtilizationPoint[];
  ingress_average: number;
  egress_average: number;
  participant_id: number;
  location: string;
  port_id: string;
}

export type UtilizationAllResponse = UtilizationCircuitResponse & { ingress_peak: number };

export type UtilizationResponse = UtilizationAllResponse | UtilizationCircuitResponse;
