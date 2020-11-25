import { useQuery } from 'react-query';

import type { IXF } from '~types';

async function fetcher(): Promise<IXF.Data> {
  const res = await fetch('https://ixf.48ix.net/web', { mode: 'cors' });
  const data: IXF.Data = await res.json();
  return data;
}

export function useIXF(): IXF.Data | undefined {
  const { data, error, isError } = useQuery('ixfData', fetcher, {
    refetchOnWindowFocus: false,
    cacheTime: 900000,
  });
  isError && console.error(error);

  return data;
}
