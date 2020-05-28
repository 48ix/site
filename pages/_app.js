import * as React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Loading from '../components/Loading';
import Provider from '../components/Provider';

const Layout = dynamic(() => import('../components/Layout'), { loading: () => <Loading /> });

const Main = ({ Component, pageProps }) => {
  const { pathname } = useRouter();
  const pageName = pathname.replace('/', '');

  useEffect(() => {
    const WebFont = require('webfontloader');
    WebFont.load({ google: { families: ['Inter:200,400,500,800', 'Fira Code&display=swap'] } });
  }, [pageName]);
  return (
    <>
      <Provider page={pageName}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
};

Main.displayName = 'Main';

export default Main;
