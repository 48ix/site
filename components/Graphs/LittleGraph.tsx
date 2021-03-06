import { Flex, useToken } from '@chakra-ui/react';
import { AreaChart, Area, ResponsiveContainer, YAxis, ReferenceLine } from 'recharts';
import { useColorToken } from '~context';
import { useGraphData } from '~hooks';

import type { LittleGraphProps } from './types';

const margin = { top: 1, right: 0, left: 0, bottom: 5 };

export const LittleGraph: React.FC<LittleGraphProps> = (props: LittleGraphProps) => {
  const { data, yRef = false, ...rest } = props;
  const refColor = useToken('colors', 'red.500');
  const topColor = useColorToken('blue.500', 'blue.400');
  const bottomColor = useColorToken('teal.400', 'teal.300');

  const utilizationData = useGraphData(data);

  let topRef, bottomRef;
  if (yRef) {
    topRef = utilizationData.inAvg ?? 0;
    bottomRef = utilizationData.outAvg ?? 0;
  }

  return (
    <Flex
      width={150}
      height={50}
      flex="1 0 auto"
      pointerEvents="none"
      display="inline-flex"
      flexDirection="column"
      {...rest}>
      <ResponsiveContainer>
        <AreaChart data={utilizationData.graphData} margin={margin}>
          {yRef && <ReferenceLine y={topRef} stroke={refColor} strokeWidth={0.5} />}
          <Area
            type="linear"
            fill={topColor}
            dataKey="inBits"
            stroke={topColor}
            animationDuration={200}
          />
        </AreaChart>
      </ResponsiveContainer>
      <ResponsiveContainer>
        <AreaChart width={200} height={60} data={utilizationData.graphData} margin={margin}>
          <YAxis reversed hide />
          {yRef && <ReferenceLine y={bottomRef} stroke={refColor} strokeWidth={0.5} />}
          <Area
            type="linear"
            dataKey="outBits"
            fill={bottomColor}
            stroke={bottomColor}
            animationDuration={200}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Flex>
  );
};
