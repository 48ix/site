import { useQuery } from 'react-query';

import type { QueryResult } from 'react-query';
import type { UtilizationResponse } from '~types';

async function utilizationFetcher<T extends UtilizationResponse>(circuitId: string): Promise<T> {
  const participantUrl = `${process.env.NEXT_PUBLIC_UTILIZATION_URL}/utilization/${circuitId}?period=1`;
  const allUrl = `${process.env.NEXT_PUBLIC_UTILIZATION_URL}/utilization/all`;
  const url = circuitId === 'all' ? allUrl : participantUrl;
  const res = await fetch(url, { mode: 'cors' });
  return await res.json();
}

export function useUtilization<T extends UtilizationResponse>(circuitId: string): QueryResult<T> {
  return useQuery<T>(circuitId, utilizationFetcher);
}
