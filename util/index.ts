import type { ParticipantColumn } from '~types';

export function insertAt(arr: any[], index: number, newItem: any) {
  return [...arr.slice(0, index), newItem, ...arr.slice(index)];
}

export function round(num: number, decimalPlaces: number = 2) {
  const rounded = +(Math.round(Number(`${num}e+${decimalPlaces}`)) + `e-${decimalPlaces}`);
  if (isNaN(rounded)) {
    return 0;
  }
  return rounded;
}

const idCounter = {} as any;

export function uniqueId(prefix: string) {
  if (!idCounter[prefix]) {
    idCounter[prefix] = 0;
  }

  const id = ++idCounter[prefix];
  if (prefix === undefined) {
    return `${id}`;
  }

  return `${prefix}${id}`;
}

export const participantColumns = [
  {
    Header: 'Participant Name',
    accessor: 'name',
    align: 'left',
  },
  {
    Header: 'ID',
    accessor: 'id',
    align: 'left',
  },
  {
    Header: 'ASN',
    accessor: 'asn',
    align: 'center',
  },
  {
    Header: 'IPv4 Peer',
    accessor: 'ipv4',
    align: 'left',
  },
  {
    Header: 'IPv6 Peer',
    accessor: 'ipv6',
    align: 'left',
  },
  {
    Header: 'Port Speed',
    accessor: 'port_speed',
    align: 'right',
  },
  {
    Header: 'Daily Utilization',
    accessor: 'circuit_id',
    align: 'right',
  },
] as ParticipantColumn[];

export * from './contentful';
export * from './theme';
