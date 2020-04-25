export const theme = {
  colors: {
    dark: '#0A192F',
    gray: '#403F4C',
    white: '#fff',
    black: '#000',
    green: '#52FFB8',
    red: '#ED254E',
    yellow: '#F9DC5C',
    orange: '#C44900',
    teal: '#00C2D1',
    blue: '#3E78B2',
    purple: '#8F3985',
    pink: '#F08CAE',
  },
  fonts: { body: 'Poppins', mono: 'Roboto Mono' },
};

const asideLinks = [];

const asideSections = [
  {
    id: 'information',
    title: 'Information',
    sections: [
      { id: 'about', title: 'About' },
      { id: 'contributors', title: 'Contributors' },
      { id: 'governance', title: 'Governance' },
    ],
  },
  {
    id: 'exchange',
    title: 'Exchange',
    sections: [
      { id: 'network', title: 'Network' },
      { id: 'members', title: 'Members' },
      { id: 'fees', title: 'Fees' },
    ],
  },
  {
    id: 'documentation',
    title: 'Documentation',
    sections: [
      { id: 'interfaces', title: 'Interface Specifications' },
      { id: 'allowedTraffic', title: 'Allowed Traffic' },
      { id: 'configGuides', title: 'Configuration Guides' },
      { id: 'routeServers', title: 'Route Serverrs' },
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

export default {
  title: '48-IX',
  siteName: '48-IX Internet Exchange',
  siteDescription: 'The hottest Arizona Internet Exchange',
  siteKeywords: [],
  orgName: '48-IX Inc.',
  googleAnalytics: { trackingId: null },
  theme: theme,
  sections: asideSections,
  links: asideLinks,
  joinForm: joinForm,
};
