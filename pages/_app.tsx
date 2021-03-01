import dynamic from 'next/dynamic';
import { Loading } from '~components';
import { UIProvider, ConfigProvider, QueryProvider } from '~context';

import type { AppProps } from 'next/app';

const Layout = dynamic<BareProps>(() => import('~layouts').then(i => i.Layout), {
  loading: () => <Loading />,
});

const App = (props: AppProps) => {
  const { Component, pageProps } = props;
  return (
    <ConfigProvider>
      <QueryProvider>
        <UIProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UIProvider>
      </QueryProvider>
    </ConfigProvider>
  );
};

export default App;
