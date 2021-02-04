import { useQuery } from 'react-query';
import { H1, H2, Graph } from '~components';

interface GraphPeriod {
  title: string;
  period: number;
}

const graphPeriods = [
  { title: 'Last Hour', period: 1 },
  { title: 'Last Day', period: 24 },
  // { title: 'Last Week', period: 168 },
] as GraphPeriod[];

async function getData(url: string) {
  const res = await fetch(url);
  return await res.json();
}

const TrafficGraph: React.FC<GraphPeriod> = (props: GraphPeriod) => {
  const { title, period } = props;
  const url = `${process.env.NEXT_PUBLIC_UTILIZATION_URL}/utilization/all?period=${period}`;
  const { data, error, isError } = useQuery(url, getData, {
    retry: false,
    cacheTime: 900000,
    staleTime: 900000,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
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
