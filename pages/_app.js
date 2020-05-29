import * as React from 'react';
import dynamic from 'next/dynamic';
import Loading from '../components/Loading';
import Provider from '../components/Provider';

const Layout = dynamic(() => import('../components/Layout'), { loading: () => <Loading /> });

const App = ({ Component, pageProps }) => {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default App;
