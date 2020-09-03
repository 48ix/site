import * as React from 'react';
import { H1 } from '../components/MDXComponents/Headings';
import Admonition from '../components/Admonition';
import ParticipantTable from '../components/ParticipantTable';
import { insertAt } from '../util';

const Participants = ({ participants, error }) => {
  return (
    <>
      <H1>Participants</H1>
      <ParticipantTable data={participants} error={error} />

      <Admonition
        title="Port Graphs"
        message="Because the exchange is not online yet, these statistics aren't real. However, once the exchange comes online, this is exactly how it will look (but with real data)."
        type="important"
      />
    </>
  );
};

export default Participants;

export const getStaticProps = async () => {
  const {
    NEXT_PUBLIC_PARTICIPANT_URL: PARTICIPANT_URL,
    NEXT_PUBLIC_UTILIZATION_URL: UTILIZATION_URL,
  } = process.env;
  let participants = {};
  let error = null;
  try {
    const participantsRes = await fetch(PARTICIPANT_URL);
    participants = await participantsRes.json();
    for (let [i, p] of participants.rows.entries()) {
      if (p.circuit_id) {
        const dataRes = await fetch(`${UTILIZATION_URL}/utilization/${p.circuit_id}?period=1`);
        const data = await dataRes.json();
        participants.rows[i].utilization = data;
      }
    }
  } catch (err) {
    error = err.message;
    console.error(err);
  }
  const excludeColumns = ['id'];
  participants.columns =
    participants.columns?.filter(c => !excludeColumns.includes(c.accessor)) ?? [];
  [].i;
  participants.columns = insertAt(participants.columns, -1, {
    Header: 'Port ID',
    accessor: 'port_id',
    align: 'right',
  });

  for (let [i, r] of participants.rows.entries()) {
    participants.rows[i].port_id = r.circuit_id;
  }
  return { props: { participants, error } };
};
