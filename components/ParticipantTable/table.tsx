import { useMemo } from 'react';
import { Box, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { DataTable } from '~components';
import { useColorValue } from '~context';
import { MonoField, TextField, BooleanField } from './fields';
import { PortGraph } from './portGraph';

import type { CellRender } from '~components';
import type { ParticipantEntry } from '~types';
import type { CellProps, ParticipantTableProps } from './types';

const Cell: React.FC<CellProps> = (props: CellProps) => {
  const { data } = props;

  const asnColor = useColorValue('red.500', 'teal.300');
  const idColor = useColorValue('black', 'white');

  const component = useMemo<JSX.Element>(() => {
    switch (data.column.id) {
      case 'name':
        return <TextField>{data.value}</TextField>;
      case 'port_id':
        return <MonoField v={data.value as string} color={idColor} />;
      case 'asn':
        return <MonoField v={data.value as number} color={asnColor} copyable />;
      case 'port_speed':
        return <TextField>{`${data.value as number} Gbps`}</TextField>;
      case 'ipv4':
        return <MonoField v={data.value as string} copyable />;
      case 'ipv6':
        return <MonoField v={data.value as string} copyable />;
      case 'circuit_id':
        return <PortGraph rowData={data.row.original as ParticipantEntry} />;
      case 'routeServerClient':
        const value = data.value as boolean;
        const clause = value ? "is" : "is not";
        const label = `${data.row.original.name} ${clause} a Route Server Peer`;
        return <BooleanField v={value} label={label} />;
      default:
        return <></>;
    }
  }, [data.column.id, idColor]);

  return component;
};

export const ParticipantTable: React.FC<ParticipantTableProps> = (props: ParticipantTableProps) => {
  const { data, error } = props;
  const { columns, rows } = data;
  return (
    <Box>
      {error !== null ? (
        <Alert
          status="error"
          height="200px"
          variant="subtle"
          borderRadius="md"
          textAlign="center"
          flexDirection="column"
          justifyContent="center">
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            {error ?? 'Error'}
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            {error ?? 'Something went wrong while fetching participants.'}
          </AlertDescription>
        </Alert>
      ) : (
        <DataTable
          data={rows}
          bordersHorizontal
          columns={columns}
          Cell={(d: CellRender) => <Cell data={d} />}
        />
      )}
    </Box>
  );
};
