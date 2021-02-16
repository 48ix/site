import { useMemo } from 'react';
import { useConfig } from '~context';
import { round } from '~util';

import type { UtilizationCircuitResponse, UtilizationTimed, GraphData } from '~types';

export function useGraphData(utilization?: UtilizationCircuitResponse): GraphData {
  const { graphBase, graphUnit } = useConfig();

  return useMemo<GraphData>(() => {
    if (typeof utilization === 'undefined') {
      return {} as GraphData;
    }
    const {
      ingress,
      egress,
      participant_id,
      port_id,
      location,
      ingress_average,
      egress_average,
    } = utilization;
    const graphData = [] as UtilizationTimed[];

    for (const [idx, pair] of ingress.entries()) {
      const [time, inBitsRaw] = pair;
      const [_, outBitsRaw] = egress[idx];

      const inBits = round(inBitsRaw / graphBase, 2);
      const outBits = round(outBitsRaw / graphBase, 2);

      graphData[idx] = { inBits, outBits, time };
    }
    return {
      graphData,
      location,
      participantId: participant_id,
      portId: port_id,
      inAvg: round(ingress_average / graphBase),
      outAvg: round(egress_average / graphBase),
      inUnit: graphUnit,
      outUnit: graphUnit,
    };
  }, [utilization]);
}
