import { useMemo } from 'react';
import { useQuery } from 'react-query';

async function utilizationFetcher(circuitId) {
  const participantUrl = `${process.env.NEXT_PUBLIC_UTILIZATION_URL}/utilization/${circuitId}?period=1`;
  const allUrl = `${process.env.NEXT_PUBLIC_UTILIZATION_URL}/utilization/all`;
  const url = circuitId === 'all' ? allUrl : participantUrl;
  const res = await fetch(url);
  return await res.json();
}

async function statsFetcher() {
  const res = await fetch(process.env.NEXT_PUBLIC_PARTICIPANT_URL);
  return await res.json();
}

export function useUtilization(circuitId) {
  return useQuery(circuitId, utilizationFetcher);
}

export function useParticipantStats() {
  let asns = [];
  const { data, error, isError } = useQuery('participantStats', statsFetcher, {
    refetchOnWindowFocus: false,
    cacheTime: 900000,
  });
  isError && console.error(error);

  if (data) {
    asns = data.rows.map(r => r.asn);
  }

  return { asns };
}
