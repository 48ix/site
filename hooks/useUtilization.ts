import { useQuery } from 'react-query';

import type { QueryObserverResult, QueryFunctionContext } from 'react-query';
import type { UtilizationResponse } from '~types';

async function utilizationFetcher<T extends UtilizationResponse>(
  ctx: QueryFunctionContext,
): Promise<T> {
  const [circuitId] = ctx.queryKey;

  const participantUrl = `${process.env.NEXT_PUBLIC_UTILIZATION_URL}/utilization/${circuitId}?period=1`;
  const allUrl = `${process.env.NEXT_PUBLIC_UTILIZATION_URL}/utilization/all`;

  const url = circuitId === 'all' ? allUrl : participantUrl;

  const res = await fetch(url, { headers: { accept: 'application/json' } });
  if (!res.ok) {
    throw new Error(`Error fetching utilization for ${circuitId}: ${res.statusText}`);
  }

  try {
    return await res.json();
  } catch (err) {
    throw new Error(`Error reading utilization response: ${err.message}`);
  }
}

export function useUtilization<T extends UtilizationResponse>(
  circuitId: string,
): QueryObserverResult<T, Error> {
  return useQuery<T, Error>(circuitId, utilizationFetcher);
}
