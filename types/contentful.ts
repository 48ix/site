import type { CreateClientParams, Entry } from 'contentful';

export type ClientParams = Omit<CreateClientParams, 'space' | 'accessToken'>;

export interface ParticipantEntry {
  name: string;
  id: number;
  asn: number;
  port_speed: number;
  circuit_id: string;
  ipv4: string[];
  ipv6: string[];
  routeServerClient: boolean;
  memberSince: string;
}

export interface ParticipantsEntry {
  name: string;
  main: 1;
  all: Entry<ParticipantEntry>[];
}
