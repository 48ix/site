import { H1, H2, Graph } from '~components';
import { useTraffic } from '~hooks';

interface GraphPeriod {
  title: string;
  period: number;
}

const graphPeriods = [
  { title: 'Last Hour', period: 1 },
  { title: 'Last Day', period: 24 },
  // { title: 'Last Week', period: 168 },
] as GraphPeriod[];

const TrafficGraph: React.FC<GraphPeriod> = (props: GraphPeriod) => {
  const { title, period } = props;
  const data = useTraffic(period);

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
