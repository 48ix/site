import * as React from 'react';
import { useMemo } from 'react';
import { Box, Flex, Icon, Skeleton, Text, useColorMode, useTheme } from '@chakra-ui/core';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import dayjs from 'dayjs';
import { useGraphData } from '../../hooks/useGraphData';

const bg = { dark: 'dark.700', light: 'gray.100' };
const avgColor = { dark: 'yellow.200', light: 'red.500' };
const color = { dark: 'white', light: 'black' };

const GraphTooltip = ({ payload, label, avg, unit, ...props }) => {
  const { colorMode } = useColorMode();
  const time = dayjs(label).toString();
  let data = {};
  if (payload) {
    [data] = payload;
  }

  return (
    <Box bg={bg[colorMode]} px={4} py={2} borderRadius="md">
      <Flex justifyContent="space-between">
        <Flex
          alignItems="center"
          color={color[colorMode]}
          justifyContent="space-between"
          {...props}>
          <Icon
            name={data?.name === 'inBits' ? 'triangle-down' : 'triangle-up'}
            size="10px"
            mr={1}
          />
          <Text as="span" fontWeight={500} fontSize="sm">
            {data?.value}
          </Text>
          <Text as="span" ml={1} fontSize="sm">
            {unit}
          </Text>
        </Flex>
      </Flex>
      <Flex>
        <Text fontSize="xs" color={avgColor[colorMode]}>
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

const Graph = ({ data, ...props }) => {
  const { colorMode } = useColorMode();
  const { colors } = useTheme();
  const topColor = { dark: colors.blue[400], light: colors.blue[500] };
  const bottomColor = { dark: colors.teal[300], light: colors.teal[400] };
  const gridColor = { dark: colors.whiteAlpha[400], light: colors.blackAlpha[400] };
  const labelColor = { dark: colors.whiteAlpha[600], light: colors.blackAlpha[600] };
  const refLineColor = { dark: colors.yellow[200], light: colors.red[500] };
  const { inAvg, outAvg, portId, graphData, inUnit, outUnit } = useGraphData(data);

  const max = useMemo(
    () =>
      Math.ceil(
        Math.max(...[...graphData.map(a => a.inBits), ...graphData.map(a => a.outBits)].flat(2)),
      ),
    [graphData],
  );
  return (
    <Flex flexDir="column" flex="1 0 auto" width="100%" minHeight={400} height={400} {...props}>
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
          <CartesianGrid strokeWidth={0.5} stroke={gridColor[colorMode]} />
          <XAxis dataKey="time" hide />
          <YAxis
            domain={[0, max]}
            tick={{
              stroke: gridColor[colorMode],
              strokeWidth: 0.1,
              fontSize: '12',
              fill: gridColor[colorMode],
            }}
            label={{
              value: `Ingress ${inUnit}`,
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: '80%' },
              fill: labelColor[colorMode],
            }}
          />
          <Tooltip content={<GraphTooltip avg={inAvg} unit={inUnit} />} />
          <ReferenceLine y={inAvg} stroke={refLineColor[colorMode]} strokeWidth={0.5} />
          <Area
            animationDuration={750}
            type="linear"
            dataKey="inBits"
            stroke={topColor[colorMode]}
            fill={topColor[colorMode]}
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
          <CartesianGrid strokeWidth={0.5} stroke={gridColor[colorMode]} />
          <XAxis dataKey="time" hide />
          <YAxis
            domain={[0, max]}
            reversed
            tick={{
              stroke: gridColor[colorMode],
              strokeWidth: 0.1,
              fontSize: '12',
              fill: gridColor[colorMode],
            }}
            label={{
              value: `Egress ${outUnit}`,
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: '80%' },
              fill: labelColor[colorMode],
            }}
          />
          <Tooltip content={<GraphTooltip avg={outAvg} unit={outUnit} />} />
          <ReferenceLine y={outAvg} stroke={refLineColor[colorMode]} strokeWidth={0.5} />
          <Area
            animationDuration={750}
            type="linear"
            dataKey="outBits"
            stroke={bottomColor[colorMode]}
            fill={bottomColor[colorMode]}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Flex>
  );
};

const GraphWrapper = props => (
  <Skeleton height={400} width="100%" isLoaded={props.data}>
    {props.data && <Graph {...props} />}
  </Skeleton>
);

export default GraphWrapper;
