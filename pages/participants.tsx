import { H1, ParticipantTable } from '~components';
import { insertAt, getContent, participantColumns } from '~util';

import type { GetStaticProps } from 'next';
import type { ParticipantsEntry, ParticipantTableProps } from '~types';

type Props = {
  participants: ParticipantTableProps;
  error: string | null;
};

const Participants = (props: Props) => {
  const { participants, error } = props;
  return (
    <>
      <H1>Participants</H1>
      <ParticipantTable data={participants} error={error} />
    </>
  );
};

export default Participants;

export const getStaticProps: GetStaticProps<Props> = async () => {
  let participants = {} as ParticipantTableProps;
  let error = null;
  try {
    const participantsData = await getContent<ParticipantsEntry>('participants');
    const excludeColumns = ['id'];

    const columns = insertAt(
      participantColumns.filter(c => !excludeColumns.includes(c.accessor)) ?? [],
      -1,
      { Header: 'Port ID', accessor: 'port_id', align: 'right' },
    ) as ParticipantTableProps['columns'];

    const rows = participantsData.items[0].fields.all.map((p, i) => ({
      ...p.fields,
      port_id: p.fields.circuit_id,
    }));
    participants = { columns, rows };
  } catch (err) {
    error = err.message;
    console.error(err);
  }

  return { props: { participants, error } };
};
