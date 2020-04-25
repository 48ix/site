import * as React from 'react';
import Provider from '../components/Provider';
import Layout from '../components/Layout';
import siteConfig from '../siteConfig';

const Main = ({ Component, pageProps }) => {
  return (
    <Provider config={siteConfig}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

Main.displayName = 'Main';

export default Main;
