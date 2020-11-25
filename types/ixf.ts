export namespace IXF {
  type Policies = 'open' | 'selective' | 'closed' | 'case-by-case' | 'custom';

  interface L3Connection {
    address: string;
    routeserver: boolean;
    max_prefix: number;
    as_macro: string;
  }

  interface VlanConnection {
    vlan_id: number;
    ipv4: L3Connection;
    ipv6: L3Connection;
  }

  interface Interface {
    switch_id: number;
    if_speed: number;
    if_type: 'LR4' | 'SR4';
  }

  interface Connection {
    ixp_id: number;
    state: 'active' | 'inactive';
    if_list: Interface[];
    vlan_list: VlanConnection[];
  }

  interface Member {
    asnum: number;
    member_type: 'peering' | 'ixp' | 'other';
    name: string;
    url: string;
    contact_email: string[];
    contact_phone: string[];
    peering_policy: Policies;
    peering_policy_url: string;
    member_since: string;
    connection_list: Connection[];
  }

  interface Network {
    prefix: string;
    mask_length: number;
  }

  interface Vlan {
    id: number;
    name: string;
    ipv4: Network;
    ipv6: Network;
  }

  interface Switch {
    id: number;
    name: string;
    colo: string;
    pdb_facility_id: number;
    city: string;
    country: string;
    manufacturer: string;
    model: string;
    software: string;
  }

  export interface IXP {
    shortname: string;
    name: string;
    ixp_id: number;
    ixf_id: number;
    peeringdb_id: number;
    country: string;
    url: string;
    support_email: string;
    support_phone: string;
    support_contact_hours: string;
    emergency_email: string;
    emergency_phone: string;
    emergency_contact_hours: string;
    billing_email: string;
    billing_phone: string;
    billing_contact_hours: string;
    switch: Switch[];
    vlan: Vlan[];
  }
  export interface Data {
    version: string;
    timestamp: string;
    ixp_list: IXP[];
    member_list: Member[];
  }
}
