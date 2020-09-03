import fileSize from 'filesize';
import { round } from '../../util';

export const buildData = utilization => {
  const {
    ingress,
    egress,
    participant_id,
    port_id,
    location,
    ingress_average,
    egress_average,
  } = utilization;

  let graphData = [];
  let inMax = Math.max(...ingress.map(b => b[1] ?? 0));
  let outMax = Math.max(...egress.map(b => b[1] ?? 0));
  let [_0, inMaxUnit] = fileSize(inMax, { bits: true, round: 0, output: 'array' });
  let [_1, outMaxUnit] = fileSize(outMax, { bits: true, round: 0, output: 'array' });
  let inBase = 0;
  let outBase = 0;
  switch (inMaxUnit) {
    case 'Kb':
      inBase = 1000;
      break;
    case 'Mb':
      inBase = 1e6;
      break;
    case 'Gb':
      inBase = 1e9;
      break;
    case 'Tb':
      inBase = 1e12;
      break;
    default:
      inBase = 0;
  }
  switch (outMaxUnit) {
    case 'Kb':
      outBase = 1000;
      break;
    case 'Mb':
      outBase = 1e6;
      break;
    case 'Gb':
      outBase = 1e9;
      break;
    case 'Tb':
      outBase = 1e12;
      break;
    default:
      outBase = 0;
  }

  ingress.map((b, i) => {
    let inBits = 0;
    let outBits = 0;
    let time = '';

    if (b.length !== 0) {
      inBits = round(b[1] / inBase);
      outBits = round(egress[i][1] / outBase);
      time = b[0];
    }
    graphData.push({
      inBits,
      outBits,
      time,
    });
  });
  const inUnit = `${inMaxUnit}ps`;
  const outUnit = `${outMaxUnit}ps`;

  return {
    graphData,
    location,
    participantId: participant_id,
    portId: port_id,
    inAvg: round(ingress_average / inBase),
    outAvg: round(egress_average / outBase),
    inUnit,
    outUnit,
  };
};
