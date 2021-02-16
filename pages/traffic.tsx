import { H1, H2, Graph } from '~components';
import { useTraffic } from '~hooks';

interface GraphPeriod {
  title: string;
  period: number;
  granularity: number;
}

const graphPeriods = [
  { title: 'Last Hour', period: 1, granularity: 30 },
  { title: 'Last Day', period: 24, granularity: 60 * 15 },
  { title: 'Last Week', period: 168, granularity: 60 * 60 * 2 },
] as GraphPeriod[];

const TrafficGraph: React.FC<GraphPeriod> = (props: GraphPeriod) => {
  const { title, period, granularity } = props;
  const data = useTraffic(period, granularity);

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
      {graphPeriods.map(({ title, period, granularity }) => (
        <TrafficGraph key={title} title={title} period={period} granularity={granularity} />
      ))}
    </>
  );
};

export default Traffic;
