import { useQuery } from 'react-query';
import { getJson } from '~util';

import type { IXF } from '~types';

export function useIXF(): IXF.Data | undefined {
  const { data } = useQuery<IXF.Data>('https://ixf.48ix.net/web', getJson, {
    refetchOnWindowFocus: false,
    cacheTime: 900000,
  });
  return data;
}
