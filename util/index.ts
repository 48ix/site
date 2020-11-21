import zeitTitle from 'title';

import type { ParticipantColumn } from '~types';

export function title(text: string, rest: string[] = []) {
  return zeitTitle(text, {
    special: [
      '48 IX',
      'IPv4',
      'IPv6',
      'ASN',
      'RPKI',
      'ROA',
      'IRR',
      'IOS',
      'FRR',
      'ARP',
      'MTU',
      'MAC',
      'ASNs',
      'BGP',
      ...rest,
    ],
  });
}

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
export * from './validators';
