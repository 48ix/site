import * as React from 'react';
import dynamic from 'next/dynamic';
import {
  Box,
  Button,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Text,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Stack,
  PseudoBox,
  Tag,
  Tooltip,
  useColorMode,
  useClipboard,
  useDisclosure,
} from '@chakra-ui/core';
import { useUtilization } from '../hooks/useUtilization';

const Table = dynamic(() => import('./Table'));
const Graph = dynamic(() => import('./Graphs/Graph'));
const LittleGraph = dynamic(() => import('./Graphs/LittleGraph'));

const asnColor = { dark: 'teal.300', light: 'red.500' };
const copiedColor = { dark: 'green.300', light: 'green.600' };
const modalBg = { dark: 'original.dark', light: 'white' };
const idColor = { dark: 'white', light: 'black' };

const InfoTag = props => (
  <Tag size="sm" fontFamily="mono" fontWeight="normal" mx={[1, 2, 2, 2]} my={2} {...props} />
);

const PortGraph = ({ v, rowData, ...props }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
            <ModalContent
              maxWidth={['100%', '100%', '75%', '75%']}
              bg={modalBg[colorMode]}
              {...props}>
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
  const { colorMode } = useColorMode();
  let copyProps = { _hover: { cursor: 'pointer' }, onClick: onCopy };
  if (!copyable) {
    copyProps = {};
  }
  return (
    <>
      <PseudoBox {...copyProps} {...props}>
        {hasCopied ? (
          <Box
            ml={2}
            color={copiedColor[colorMode]}
            opacity={hasCopied ? '1' : '0'}
            transition="opacity .25s ease-in-out">
            <Icon name="check" color="green" />
            <Text ml={1} as="span" fontSize="sm" _hover={{ cursor: 'pointer' }}>
              Copied
            </Text>
          </Box>
        ) : (
          <Text
            as="span"
            opacity={hasCopied ? '0' : '1'}
            transition="opacity .25s ease-in-out"
            fontFamily="mono">
            {v}
          </Text>
        )}
      </PseudoBox>
    </>
  );
};

const Cell = ({ data }) => {
  const rowData = data.rowsById[data.row.id].original;
  const { colorMode } = useColorMode();
  const component = {
    name: <Text>{data.value}</Text>,
    port_id: <MonoField v={data.value} color={idColor[colorMode]} />,
    asn: <MonoField v={data.value} color={asnColor[colorMode]} copyable />,
    port_speed: <Text>{`${data.value} Gbps`}</Text>,
    ipv4: <MonoField v={data.value} copyable />,
    ipv6: <MonoField v={data.value} copyable />,
    circuit_id: <PortGraph v={data.value} rowData={rowData} />,
  };
  return component[data.column.id];
};

const ParticipantTable = ({ data, error }) => {
  const { columns, rows } = data;
  return (
    <Box>
      {!error && data && (
        <Table
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

export default ParticipantTable;
