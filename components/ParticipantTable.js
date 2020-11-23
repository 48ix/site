import {
  Box,
  Tag,
  Flex,
  Icon,
  Text,
  Alert,
  Modal,
  Stack,
  Button,
  Tooltip,
  AlertIcon,
  ModalBody,
  AlertTitle,
  ModalContent,
  ModalOverlay,
  useClipboard,
  useDisclosure,
  AlertDescription,
  ModalCloseButton,
} from '@chakra-ui/react';
import { DataTable, Graph, LittleGraph } from '~components';
import { useColorValue } from '~context';
import { useUtilization } from '~hooks';

const InfoTag = props => (
  <Tag size="sm" fontFamily="mono" fontWeight="normal" mx={[1, 2, 2, 2]} my={2} {...props} />
);

const PortGraph = ({ v, rowData, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalBg = useColorValue('white', 'original.dark');
  const label = `View Port Statistics for ${rowData.name}`;
  const { data: utilization, isError, error, isLoading } = useUtilization(rowData.circuit_id);
  isError && console.error(error);
  return (
    <>
      {isError ? (
        <Alert
          status="error"
          variant="subtle"
          borderRadius="md"
          textAlign="center"
          flexDirection="column"
          justifyContent="center">
          <AlertTitle fontSize="sm">
            {error?.name ?? `Error Fetching Data for ${rowData.name}`}
          </AlertTitle>
          <AlertDescription fontSize="xs">
            {error?.message ?? 'An error occurred.'}
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <Tooltip hasArrow label={label} placement="top" fontWeight="normal">
            <Button
              isLoading={isLoading}
              onClick={onOpen}
              variant="link"
              textDecoration="none"
              aria-label={label}>
              <LittleGraph data={utilization} />
            </Button>
          </Tooltip>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxWidth={['100%', '100%', '75%', '75%']} bg={modalBg} {...props}>
              <ModalCloseButton />
              <ModalBody p={8}>
                <Box mb={6}>
                  <Text as="h3" fontSize="xl" fontWeight="bold">
                    {rowData.name}
                  </Text>
                  <Text fontSize="sm" opacity={0.6}>{`AS${rowData.asn}`}</Text>
                </Box>
                <Graph data={utilization} />
                <Flex p={0} my={4} justify={['center', 'center', 'flex-end', 'flex-end']}>
                  <Stack
                    isInline
                    flexWrap="wrap"
                    align="center"
                    mt={4}
                    flexWrap="wrap"
                    justify={['center', 'center', null, null]}>
                    <InfoTag>{rowData.circuit_id}</InfoTag>
                    <InfoTag>{rowData.ipv4}</InfoTag>
                    <InfoTag>{rowData.ipv6}</InfoTag>
                    <InfoTag>{`${rowData.port_speed} Gbps`}</InfoTag>
                  </Stack>
                </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

const MonoField = ({ v, copyable = false, ...props }) => {
  const { onCopy, hasCopied } = useClipboard(v);
  const copiedColor = useColorValue('green.600', 'green.300');

  let copyProps = { _hover: { cursor: 'pointer' }, onClick: onCopy };
  if (!copyable) {
    copyProps = {};
  }

  return (
    <>
      <Box {...copyProps} {...props}>
        <Box
          pos="relative"
          transition="opacity .25s ease-in-out"
          color={hasCopied ? copiedColor : undefined}>
          {hasCopied && <Icon name="check" color="green" mr={1} />}
          <Text
            as="span"
            fontSize="sm"
            _hover={{ cursor: 'pointer' }}
            fontFamily={hasCopied ? 'body' : 'mono'}>
            {hasCopied ? 'Copied' : v}
          </Text>
        </Box>
      </Box>
    </>
  );
};

const TextField = props => <Text as="span" fontSize="sm" {...props} />;

const Cell = ({ data }) => {
  const rowData = data.rowsById[data.row.id].original;
  const asnColor = useColorValue('red.500', 'teal.300');
  const idColor = useColorValue('black', 'white');
  const component = {
    name: <TextField>{data.value}</TextField>,
    port_id: <MonoField v={data.value} color={idColor} />,
    asn: <MonoField v={data.value} color={asnColor} copyable />,
    port_speed: <Text>{`${data.value} Gbps`}</Text>,
    ipv4: <MonoField v={data.value} copyable />,
    ipv6: <MonoField v={data.value} copyable />,
    circuit_id: <PortGraph v={data.value} rowData={rowData} />,
  };
  return component[data.column.id];
};

export const ParticipantTable = ({ data, error }) => {
  const { columns, rows } = data;
  return (
    <Box>
      {!error && data && (
        <DataTable
          bordersHorizontal
          data={rows}
          columns={columns}
          cellRender={d => <Cell data={d} />}
        />
      )}
      {error && (
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          justifyContent="center"
          textAlign="center"
          height="200px"
          borderRadius="md">
          <AlertIcon size="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            {error.name ?? 'Error Fetching Participants'}
          </AlertTitle>
          <AlertDescription maxWidth="sm">{error.message ?? 'An error occurred.'}</AlertDescription>
        </Alert>
      )}
    </Box>
  );
};
