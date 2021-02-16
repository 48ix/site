import { useQuery } from 'react-query';
import { getJson } from '~util';

import type { UtilizationCircuitResponse } from '~types';

export function useTraffic(period: number): UtilizationCircuitResponse | undefined {
  const url = `${process.env.NEXT_PUBLIC_UTILIZATION_URL}/utilization/all?period=${period}`;
  const { data, isError, error } = useQuery<UtilizationCircuitResponse>(url, getJson, {
    retry: false,
    cacheTime: 900000,
    staleTime: 900000,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  isError && console.error(error);
  return data;
}
