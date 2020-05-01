export const theme = {
  colors: {
    dark: '#0A192F',
    gray: '#403F4C',
    white: '#fff',
    black: '#000',
    green: '#52FFB8',
    red: '#ED254E',
    yellow: '#EEC643',
    orange: '#C44900',
    teal: '#00C2D1',
    blue: '#0D21A1',
    purple: '#8F3985',
    pink: '#F08CAE',
  },
  fonts: { body: 'Inter', mono: 'Fira Code' },
};

const keywordsGlobal = ['internet', 'exchange', 'ix', 'phoenix', 'arizona', 'az'];

const asideLinks = [];

const asideSections = [
  {
    id: 'information',
    title: 'Information',
    sections: [
      { id: 'about', title: 'About' },
      {
        id: 'contributors',
        title: 'Contributors',
        description: '48-IX Contributors',
        keywords: [
          'donate',
          'donations',
          'contribute',
          'edgeconnex',
          'stellar',
          'delta dental',
          'delta dental of arizona',
          ...keywordsGlobal,
        ],
      },
      {
        id: 'governance',
        title: 'Governance',
        description: '48-IX Governance & Leadership',
        keywords: [
          'governance',
          'board',
          'directors',
          'owner',
          'owners',
          'leadership',
          ...keywordsGlobal,
        ],
      },
    ],
  },
  {
    id: 'exchange',
    title: 'Exchange',
    sections: [
      {
        id: 'network',
        title: 'Network',
        description: '48-IX Network Locations & Architecture',
        keywords: ['network', 'architecture', 'topology', 'locations', 'design', ...keywordsGlobal],
      },
      {
        id: 'members',
        title: 'Members',
        description: '48-IX Members',
        keywords: ['members', 'participants', 'networks', 'asns', ...keywordsGlobal],
      },
      {
        id: 'communication',
        title: 'Communication',
        description: '48-IX Communication Policy',
        keywords: [
          'communication',
          'email',
          'slack',
          'mailing list',
          'feedback',
          'help',
          'support',
          ...keywordsGlobal,
        ],
      },
      {
        id: 'fees',
        title: 'Fees',
        description: '48-IX Fee Scheduled',
        keywords: ['fees', 'cost', 'fee', 'annual', 'monthly', 'free', ...keywordsGlobal],
      },
    ],
  },
  {
    id: 'documentation',
    title: 'Documentation',
    sections: [
      {
        id: 'interfaces',
        title: 'Interface Specifications',
        description: '48-IX Documentation - Interfaces',
        keywords: [
          'port',
          'ports',
          'docs',
          'documentation',
          'interface',
          'interfaces',
          'mac address',
          'spanning-tree',
          ...keywordsGlobal,
        ],
      },
      {
        id: 'traffic',
        title: 'Traffic',
        description: '48-IX Documentation - Traffic',
        keywords: [
          'traffic',
          'allowed',
          'security',
          'arp',
          'ipv4',
          'ipv6',
          'icmp',
          'proxy arp',
          'unicast',
          'multicast',
          'flood',
          ...keywordsGlobal,
        ],
      },
      {
        id: 'config-guides',
        title: 'Configuration Guides',
        description: '48-IX Documentation - Configuration Guides',
        keywords: [
          'example',
          'configuration',
          'config',
          'guide',
          'help',
          'cisco',
          'juniper',
          'bgp',
          ...keywordsGlobal,
        ],
      },
      {
        id: 'route-servers',
        title: 'Route Servers',
        description: '48-IX Documentation - Route Servers',
        keywords: [
          'route server',
          'rs',
          'frr',
          'frrouting',
          'bgp',
          'rpki',
          'peering',
          'multilateral',
          ...keywordsGlobal,
        ],
      },
      {
        id: 'bogons',
        title: 'Bogon Addresses',
        description: '48-IX Documentation - Bogons & Martians',
        keywords: [
          'bogons',
          'allowed',
          'martians',
          'bogon',
          'martian',
          'denied',
          'security',
          'filtering',
          ...keywordsGlobal,
        ],
      },
    ],
  },
  {
    id: 'policy',
    title: 'Policy & Procedure',
    sections: [
      {
        id: 'connection-agreement',
        title: 'Connection Agreement',
        description: '48-IX Connection Agreement',
        keywords: ['legal', 'msa', 'agreement', 'paperwork', ...keywordsGlobal],
      },
      {
        id: 'sla',
        title: 'Service Level Agreement',
        description: '48-IX Service Level Agreement',
        keywords: ['sla', 'uptime', 'guarantee', 'service level agreement', ...keywordsGlobal],
      },
      {
        id: 'maintenance',
        title: 'Maintenance',
        description: '48-IX Maintenance Policy',
        keywords: [
          'maintenance',
          'outage',
          'notification',
          'window',
          'downtime',
          ...keywordsGlobal,
        ],
      },
    ],
  },
];

const joinForm = {
  fields: [
    {
      id: 'org',
      label: 'Organization',
      required: true,
      error: 'This field is required.',
      element: 'input',
    },
    {
      id: 'asn',
      label: 'Autonomous System Number',
      required: true,
      error: 'This field is required.',
      element: 'input',
    },
    {
      id: 'contact',
      label: 'Contact Name',
      required: true,
      error: 'This field is required.',
      element: 'input',
    },
    {
      id: 'facility',
      label: 'Facility',
      required: true,
      error: 'This field is required.',
      element: 'select',
      elementProps: { isReadOnly: true, defaultValue: 'ecdphx01' },
      options: [{ value: 'ecdphx01', label: 'EdgeConneX ECDPHX01' }],
    },
    {
      id: 'port_speed',
      label: 'Desired Port Speed',
      required: false,
      error: '',
      element: 'select',
      options: [
        { value: 1, label: '1 Gbps' },
        { value: 10, label: '10 Gbps' },
      ],
    },
  ],
  buttonText: 'Submit Request',
};

const endpoints = {
  members: 'https://webhook.site/289773ff-6d22-4dec-bc51-db0c0c649acb',
  subscribe: 'https://webhook.site/289773ff-6d22-4dec-bc51-db0c0c649acb',
};

const contributors = [
  {
    id: 'edgeconnex',
    name: 'EdgeConneX',
    color: null,
    link: 'https://www.edgeconnex.com',
    imageFormat: 'svg',
  },
  {
    id: 'stellar',
    name: 'Stellar',
    color: '#2a3d8f',
    link: 'https://stellar.tech',
    imageFormat: 'svg',
  },
  {
    id: 'ddaz',
    name: 'Delta Dental of Arizona',
    color: '#43B02A',
    link: 'https://www.deltadentalaz.com',
    imageFormat: 'svg',
  },
];

export default {
  title: '48-IX',
  siteName: "48-IX | Arizona's Open Internet Exchange",
  siteDescription:
    'The network fabric where ISPs, content providers, and enterprises can freely interconnect.',
  siteKeywords: keywordsGlobal,
  orgName: '48-IX Inc.',
  url: 'https://48ix.net',
  address: {
    streetAddress: '3011 S 52nd St',
    addressLocality: 'Tempe',
    addressRegion: 'AZ',
    postalCode: '85282',
    addressCountry: 'US',
  },
  googleAnalytics: { trackingId: null },
  theme: theme,
  sections: asideSections,
  links: asideLinks,
  joinForm: joinForm,
  endpoints: endpoints,
  contributors: contributors,
};
