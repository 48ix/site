import ReactGA from 'react-ga';

export const initGA = trackingId => {
  ReactGA.initialize(trackingId);
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
