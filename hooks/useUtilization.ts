import { useQuery } from 'react-query';
import queryString from 'query-string';

import type { QueryObserverResult, QueryFunctionContext } from 'react-query';
import type { UtilizationResponse } from '~types';

type UtilizationOptions = {
  period?: number;
  granularity?: number;
};

export function useUtilization<T extends UtilizationResponse>(
  circuitId: string,
  options: UtilizationOptions = { period: 1, granularity: 60 * 10 },
): QueryObserverResult<T, Error> {
  async function utilizationFetcher<T extends UtilizationResponse>(
    ctx: QueryFunctionContext,
  ): Promise<T> {
    const [circuitId] = ctx.queryKey;
    const participantUrl = queryString.stringifyUrl({
      url: `${process.env.NEXT_PUBLIC_UTILIZATION_URL}/utilization/${circuitId}`,
      query: options,
    });

    const allUrl = queryString.stringifyUrl({
      url: `${process.env.NEXT_PUBLIC_UTILIZATION_URL}/utilization/all`,
      query: options,
    });

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
  return useQuery<T, Error>(circuitId, utilizationFetcher);
}
