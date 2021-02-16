import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

export const QueryProvider: React.FC = props => {
  return <QueryClientProvider client={client} {...props} />;
};
