export const theme = {
  colors: {
    dark: '#0a192f',
    light: '#dee0e3',
    gray: '#403f4c',
    white: '#ffffff',
    black: '#000',
    green: '#52ffb8',
    red: '#ed254e',
    yellow: '#eec643',
    orange: '#c44900',
    teal: '#00c2d1',
    blue: '#0d21a1',
    purple: '#8f3985',
    pink: '#f08cae',
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
        id: 'contact',
        title: 'Contact',
      },
      {
        id: 'contributors',
        title: 'Contributors',
      },
    ],
  },
  {
    id: 'exchange',
    title: 'Exchange',
    sections: [
      {
        id: 'fees',
        title: 'Fees',
      },
      {
        id: 'network',
        title: 'Network',
      },
      {
        id: 'participants',
        title: 'Participants',
      },
      {
        id: 'support',
        title: 'Support',
      },
    ],
  },
  {
    id: 'documentation',
    title: 'Documentation',
    sections: [
      {
        id: 'bogons',
        title: 'Bogon Addresses',
      },
      {
        id: 'config-guides',
        title: 'Configuration Guides',
      },
      {
        id: 'interfaces',
        title: 'Interface Specifications',
      },
      {
        id: 'traffic',
        title: 'Traffic',
      },
    ],
  },
  {
    id: 'policy',
    title: 'Policy & Procedure',
    sections: [
      {
        id: 'connection-policy',
        title: 'Connection Policy',
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
      id: 'interval',
      label: 'Term',
      required: true,
      error: 'This field is required.',
      element: 'radio',
      elementProps: { defaultValue: 'annual' },
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'annual', label: 'Annual' },
      ],
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
  siteDescription: "Arizona's neutral interconnection fabric for a better internet.",
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
