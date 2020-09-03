import * as React from 'react';
import useSWR from 'swr';
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
  const { NEXT_PUBLIC_UTILIZATION_URL: UTILIZATION_URL } = process.env;
  const { data, error } = useSWR(`${UTILIZATION_URL}/utilization/all?period=${period}`, getData);
  error && console.error(error);
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
