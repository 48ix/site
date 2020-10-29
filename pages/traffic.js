import * as React from 'react';
import { useQuery, useQueryCache } from 'react-query';
import Graph from '../components/Graphs/Graph';
import { H1, H2 } from '../components/MDXComponents/Headings';

const graphPeriods = [
  { title: 'Last Hour', period: 1 },
  { title: 'Last Day', period: 24 },
  { title: 'Last Week', period: 168 },
];

const getData = async url => {
  const res = await fetch(url);
  return await res.json();
};

const TrafficGraph = ({ title, period }) => {
  const cache = useQueryCache();
  const url = `${process.env.NEXT_PUBLIC_UTILIZATION_URL}/utilization/all?period=${period}`;
  const { data, error, isError } = useQuery(url, getData, {
    cacheTime: 900000,
    staleTime: 900000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
  isError && console.error(error);
  return (
    <>
      <H2 mb={8}>{title}</H2>
      <Graph data={data} />
    </>
  );
};

const Traffic = () => {
  return (
    <>
      <H1>Traffic</H1>
      {graphPeriods.map(({ title, period }) => (
        <TrafficGraph key={title} title={title} period={period} />
      ))}
    </>
  );
};

export default Traffic;
