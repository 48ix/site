import { useMemo } from 'react';
import { useConfig } from '~context';
import { round } from '~util';

export function useGraphData(utilization) {
  const {
    ingress,
    egress,
    participant_id,
    port_id,
    location,
    ingress_average,
    egress_average,
  } = utilization;
  const { graphBase, graphUnit } = useConfig();
  let graphData = new Array();

  for (let [idx, pair] of Object.entries(ingress)) {
    let inBits = 0;
    let time = '';
    if (pair.length !== 0) {
      inBits = round(pair[1] / graphBase, 2);
      time = pair[0];
    }
    graphData[idx] = { inBits, time };
  }

  for (let [idx, pair] of Object.entries(egress)) {
    let outBits = 0;
    if (pair.length !== 0) {
      outBits = round(pair[1] / graphBase, 2);
    }
    graphData[idx].outBits = outBits;
  }

  return useMemo(
    () => ({
      graphData,
      location,
      participantId: participant_id,
      portId: port_id,
      inAvg: round(ingress_average / graphBase),
      outAvg: round(egress_average / graphBase),
      inUnit: graphUnit,
      outUnit: graphUnit,
    }),
    [utilization],
  );
}
