import ReactGA from 'react-ga';

export const initGA = trackingId => {
  ReactGA.initialize(trackingId, { gaOptions: { siteSpeedSampleRate: 100, anonymizeIp: false } });
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname + window.location.search);
};
