import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Box, Icon, Flex, Skeleton, Text } from '@chakra-ui/react';
import {
  Area,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import dayjs from 'dayjs';
import { useColorValue, useColorToken } from '~context';
import { useGraphData } from '~hooks';

import type { Payload } from 'recharts/types/component/DefaultTooltipContent';
import type { GraphTooltipProps, BaseGraphProps } from './types';

const DownCaret = dynamic<MeronexIcon>(() =>
  import('@meronex/icons/bs').then(i => i.BsCaretDownFill),
);
const UpCaret = dynamic<MeronexIcon>(() => import('@meronex/icons/bs').then(i => i.BsCaretUpFill));

const GraphTooltip: React.FC<GraphTooltipProps> = (props: GraphTooltipProps) => {
  const { payload, label, avg, unit, ...rest } = props;
  const bg = useColorValue('white', 'dark.700');
  const avgColor = useColorValue('red.500', 'yellow.200');
  const color = useColorValue('black', 'white');
  const time = dayjs(label).toString();
  const tooltipProps = useColorValue(
    { borderColor: 'blackAlpha.100', bg, boxShadow: 'xl' },
    { borderColor: 'dark.600', bg },
  );

  const data = useMemo(() => {
    let data = {} as Payload<number, string>;
    if (typeof payload !== 'undefined') {
      [data] = payload;
    }
    return data;
  }, [payload]);

  return (
    <Box px={4} py={2} borderRadius="md" border="1px" {...tooltipProps}>
      <Flex justifyContent="space-between">
        <Flex align="center" color={color} justify="space-between" {...rest}>
          <Icon as={data?.name === 'inBits' ? UpCaret : DownCaret} boxSize="10px" mr={1} />
          <Text as="span" fontWeight={500} fontSize="sm">
            {data?.value}
          </Text>
          <Text as="span" ml={1} fontSize="sm">
            {unit}
          </Text>
        </Flex>
      </Flex>
      <Flex>
        <Text fontSize="xs" color={avgColor}>
          {`${avg} ${unit} Average`}
        </Text>
      </Flex>
      <Flex>
        <Text fontSize="xs" opacity={0.6}>
          {time}
        </Text>
      </Flex>
    </Box>
  );
};

const BaseGraph: React.FC<BaseGraphProps> = (props: BaseGraphProps) => {
  const { data, ...rest } = props;

  const topColor = useColorToken('blue.500', 'blue.400');
  const bottomColor = useColorToken('teal.500', 'teal.400');
  const gridColor = useColorToken('blackAlpha.400', 'whiteAlpha.400');
  const labelColor = useColorToken('blackAlpha.600', 'whiteAlpha.600');
  const refLineColor = useColorToken('red.500', 'yellow.200');

  const { inAvg, outAvg, portId, graphData, inUnit, outUnit } = useGraphData(data);

  const max = useMemo(
    () =>
      Math.ceil(
        Math.max(...[...graphData.map(a => a.inBits), ...graphData.map(a => a.outBits)].flat(2)),
      ),
    [graphData],
  );

  return (
    <Flex flexDir="column" flex="1 0 auto" width="100%" minHeight={400} height={400} {...rest}>
      <ResponsiveContainer>
        <AreaChart
          data={graphData}
          syncId={portId}
          margin={{
            top: 1,
            right: 30,
            left: 0,
            bottom: 0,
          }}>
          <CartesianGrid strokeWidth={0.5} stroke={gridColor} />
          <XAxis dataKey="time" hide />
          <YAxis
            domain={[0, max]}
            tick={{
              stroke: gridColor,
              strokeWidth: 0.1,
              fontSize: '12',
              fill: gridColor,
            }}
            label={{
              value: `Ingress ${inUnit}`,
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: '80%' },
              fill: labelColor,
            }}
          />
          <Tooltip content={<GraphTooltip avg={inAvg} unit={inUnit} />} />
          <ReferenceLine y={inAvg} stroke={refLineColor} strokeWidth={0.5} />
          <Area
            animationDuration={750}
            type="linear"
            dataKey="inBits"
            stroke={topColor}
            fill={topColor}
          />
        </AreaChart>
      </ResponsiveContainer>
      <ResponsiveContainer>
        <AreaChart
          data={graphData}
          syncId={portId}
          margin={{
            top: 1,
            right: 30,
            left: 0,
            bottom: 0,
          }}>
          <CartesianGrid strokeWidth={0.5} stroke={gridColor} />
          <XAxis dataKey="time" hide />
          <YAxis
            domain={[0, max]}
            reversed
            tick={{
              stroke: gridColor,
              strokeWidth: 0.1,
              fontSize: '12',
              fill: gridColor,
            }}
            label={{
              value: `Egress ${outUnit}`,
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: '80%' },
              fill: labelColor,
            }}
          />
          <Tooltip content={<GraphTooltip avg={outAvg} unit={outUnit} />} />
          <ReferenceLine y={outAvg} stroke={refLineColor} strokeWidth={0.5} />
          <Area
            animationDuration={750}
            type="linear"
            dataKey="outBits"
            stroke={bottomColor}
            fill={bottomColor}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Flex>
  );
};

export const Graph: React.FC<BaseGraphProps> = (props: BaseGraphProps) => (
  <Skeleton height={400} width="100%" isLoaded={typeof props.data !== 'undefined'}>
    {props.data && <BaseGraph {...props} />}
  </Skeleton>
);
