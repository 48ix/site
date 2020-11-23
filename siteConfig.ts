import type { ThemeConfig, Config } from '~types';

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
  fonts: { body: 'Inter', heading: 'Inter', mono: 'Fira Code' },
  fontWeights: {
    light: 200,
    normal: 400,
    semibold: 600,
    medium: 600,
    bold: 800,
  },
} as ThemeConfig;

const keywordsGlobal = [
  'content delivery network',
  'internet exchange',
  'internet',
  'exchange',
  'networks',
  'traffic',
  'carrier',
  'peering',
  'phoenix',
  'arizona',
  'local',
  'isp',
  'ixp',
  'ix',
  'az',
];

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
      {
        id: 'traffic',
        title: 'Traffic',
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
        id: 'allowed-traffic',
        title: 'Allowed Traffic',
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
    url: 'https://twitter.com/AS62484',
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
  theme,
  sections: asideSections,
  links: [],
  contributors,
  social,
  facilities: [{ id: 'ecdphx01', label: 'EdgeConneX ECDPHX01', default: true }],
  portSpeeds: [
    { id: 1, label: '1 Gbps' },
    { id: 10, label: '10 Gbps' },
  ],
  graphBase: 1e9, // Gbps
  graphUnit: 'Gbps',
} as Config;
