import type { ParticipantEntry } from './contentful';

export type ParticipantAccessor = keyof ParticipantEntry;

export interface ParticipantColumn {
  Header: string;
  // accessor: string;
  accessor: ParticipantAccessor;
  align: 'left' | 'right' | 'center';
  hidden?: boolean;
}

export interface ParticipantTableData {
  rows: ParticipantEntry[];
  columns: ParticipantColumn[];
}

export type ParticipantField = { [k in keyof ParticipantEntry]: ValueOf<ParticipantEntry> };

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
