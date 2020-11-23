import type { ThemeConfig } from '~types';

interface AsideSubsection {
  id: string;
  title: string;
}

interface AsideSection {
  id: string;
  title: string;
  sections: AsideSubsection[];
}

interface Contributor {
  id: string;
  name: string;
  color: string | null;
  link: string;
  imageFormat: 'svg' | 'png' | 'jpeg' | 'jpg';
}
interface Facility {
  id: string;
  label: string;
  default: boolean;
}

interface PortSpeed {
  id: number;
  label: string;
}

export interface Config {
  title: string;
  siteName: string;
  siteSlogan: string;
  siteDescription: string;
  siteKeywords: string[];
  orgName: string;
  url: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  theme: ThemeConfig;
  sections: AsideSection[];
  links: string[];
  contributors: Contributor[];
  social: {
    github: {
      url: string;
    };
    twitter: {
      url: string;
    };
  };
  facilities: Facility[];
  portSpeeds: PortSpeed[];
  graphBase: number;
  graphUnit: string;
}
