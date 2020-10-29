import * as React from 'react';
import { H1 } from '../components/MDXComponents/Headings';
import ParticipantTable from '../components/ParticipantTable';
import { insertAt } from '../util';

const Participants = ({ participants, error }) => {
  return (
    <>
      <H1>Participants</H1>
      <ParticipantTable data={participants} error={error} />
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
