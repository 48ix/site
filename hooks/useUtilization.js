import { useQuery } from 'react-query';

async function utilizationFetcher(circuitId) {
  const participantUrl = `${process.env.NEXT_PUBLIC_UTILIZATION_URL}/utilization/${circuitId}?period=1`;
  const allUrl = `${process.env.NEXT_PUBLIC_UTILIZATION_URL}/utilization/all`;
  const url = circuitId === 'all' ? allUrl : participantUrl;
  const res = await fetch(url, { mode: 'cors' });
  return await res.json();
}

export function useUtilization(circuitId) {
  return useQuery(circuitId, utilizationFetcher);
}
