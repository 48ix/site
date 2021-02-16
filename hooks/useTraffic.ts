import { useQuery } from 'react-query';
import queryString from 'query-string';
import { getJson } from '~util';

import type { UtilizationCircuitResponse } from '~types';

export function useTraffic(
  period: number,
  granularity: number,
): UtilizationCircuitResponse | undefined {
  const url = queryString.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_UTILIZATION_URL}/utilization/all`,
    query: { period, granularity },
  });
  const { data, isError, error } = useQuery<UtilizationCircuitResponse>(url, getJson, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    cacheTime: 900000,
    staleTime: 900000,
    retry: false,
  });
  isError && console.error(error);
  return data;
}
