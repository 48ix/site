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

export type UtilizationTimed = { time: string; inBits: number; outBits: number };

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

export interface GraphData {
  graphData: UtilizationTimed[];
  location: string;
  participantId: number;
  portId: string;
  inAvg: number;
  outAvg: number;
  inUnit: string;
  outUnit: string;
}
