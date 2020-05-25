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

const keywordsGlobal = [
  'internet exchange',
  'internet',
  'exchange',
  'ix',
  'isp',
  'ixp',
  'traffic',
  'local',
  'carrier',
  'content delivery network',
  'networks',
  'peering',
  'phoenix',
  'arizona',
  'az',
];

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
      },
      {
        id: 'governance',
        title: 'Governance',
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
      },
      {
        id: 'members',
        title: 'Members',
      },
      {
        id: 'communication',
        title: 'Communication',
      },
      {
        id: 'fees',
        title: 'Fees',
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
      },
      {
        id: 'traffic',
        title: 'Traffic',
      },
      {
        id: 'config-guides',
        title: 'Configuration Guides',
      },
      {
        id: 'route-servers',
        title: 'Route Servers',
      },
      {
        id: 'bogons',
        title: 'Bogon Addresses',
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
      },
      {
        id: 'sla',
        title: 'Service Level Agreement',
      },
      {
        id: 'maintenance',
        title: 'Maintenance',
      },
      {
        id: 'privacy',
        title: 'Privacy Policy',
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
      id: 'email',
      label: 'Email Address',
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
  members: 'https://square-frost-ee00.48ix.workers.dev',
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

const social = {
  github: {
    url: 'https://github.com/48ix',
  },
  twitter: {
    url: 'https://twitter.com/checktheroads',
  },
};

export default {
  title: '48 IX',
  siteName: '48 IX',
  siteSlogan: "Arizona's Open Internet Exchange",
  siteDescription:
    'The network fabric where ISPs, content providers, and enterprises can freely interconnect.',
  siteKeywords: keywordsGlobal,
  orgName: '48 IX, Inc.',
  url: 'https://48ix.net',
  address: {
    streetAddress: '3011 S 52nd St',
    addressLocality: 'Tempe',
    addressRegion: 'AZ',
    postalCode: '85282',
    addressCountry: 'US',
  },
  theme: theme,
  sections: asideSections,
  links: asideLinks,
  joinForm: joinForm,
  endpoints: endpoints,
  contributors: contributors,
  social: social,
};
