import dynamic from 'next/dynamic';
import { Loading } from '~components';
import { UIProvider, ConfigProvider } from '~context';

import type { AppProps } from 'next/app';

const Layout = dynamic<BareProps>(() => import('~layouts').then(i => i.Layout), {
  loading: () => <Loading />,
});

const App = (props: AppProps) => {
  const { Component, pageProps } = props;
  return (
    <ConfigProvider>
      <UIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UIProvider>
    </ConfigProvider>
  );
};

export default App;
