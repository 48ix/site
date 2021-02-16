import { useMemo } from 'react';
import { useConfig } from '~context';
import { round } from '~util';

import type { UtilizationCircuitResponse, UtilizationTimed, GraphData } from '~types';

function getUnit(graphData: UtilizationTimed[]) {
  const maxIn = Math.max(...graphData.map(g => g.inBits));
  const maxOut = Math.max(...graphData.map(g => g.outBits));
  const max = Math.max(maxIn, maxOut);
  switch (true) {
    case max >= 1_000:
      return 'Kbps';
    case max >= 1e-6:
      return 'Mbps';
    case max >= 1e-9:
      return 'Gbps';
    case max >= 1e12:
      return 'Tbps';
    default:
      return 'bps';
  }
}

export function useGraphData(utilization?: UtilizationCircuitResponse): GraphData {
  const { graphBase, graphUnit } = useConfig();

  return useMemo<GraphData>(() => {
    if (typeof utilization === 'undefined') {
      return {} as GraphData;
    }
    const {
      egress,
      ingress,
      port_id,
      location,
      participant_id,
      egress_average,
      ingress_average,
    } = utilization;
    const graphData = [] as UtilizationTimed[];

    for (const [idx, pair] of ingress.entries()) {
      const [time, inBitsRaw] = pair;
      const [_, outBitsRaw] = egress[idx];

      const inBits = round(inBitsRaw / graphBase, 2);
      const outBits = round(outBitsRaw / graphBase, 2);

      graphData[idx] = { inBits, outBits, time };
    }
    const inUnit = getUnit(graphData);
    return {
      graphData,
      location,
      participantId: participant_id,
      portId: port_id,
      inAvg: round(ingress_average / graphBase),
      outAvg: round(egress_average / graphBase),
      inUnit,
      outUnit: inUnit,
    };
  }, [utilization]);
}
