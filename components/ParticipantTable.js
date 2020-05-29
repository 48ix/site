import * as React from 'react';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Box,
  Button,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Skeleton,
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
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import { useConfig } from './Provider';

const Table = dynamic(() => import('./Table'), { loading: Skeleton });
const Graph = dynamic(() => import('./Graphs/Graph'));
const LittleGraph = dynamic(() => import('./Graphs/LittleGraph'), { loading: Skeleton });
const Refresh = dynamic(() => import('./Icons/Refresh'));

const asnColor = { dark: 'teal.300', light: 'red.500' };
const copiedColor = { dark: 'green.300', light: 'green.600' };
const modalBg = { dark: 'original.dark', light: 'white' };
const idColor = { dark: 'white', light: 'black' };

const PortGraph = ({ v, rowData, ...props }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const label = `View Port Statistics for ${rowData.name}`;
  return (
    <>
      <Tooltip hasArrow label={label} placement="top">
        <Button onClick={onOpen} variant="link" textDecoration="none" aria-label={label}>
          <LittleGraph circuitId={props.v} />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth={['100%', '100%', '75%', '75%']} bg={modalBg[colorMode]}>
          <ModalCloseButton />
          <ModalBody p={8}>
            <Box mb={6}>
              <Text as="h3" fontSize="xl" fontWeight="bold">
                {rowData.name}
              </Text>
              <Text fontSize="sm" opacity={0.6}>{`AS${rowData.asn}`}</Text>
            </Box>
            <Graph circuitId={props.v} />
            <Flex p={0} my={4} justify={['center', 'center', 'flex-end', 'flex-end']}>
              <Stack
                isInline
                flexWrap="wrap"
                align="center"
                mt={4}
                flexWrap="wrap"
                justify={['center', 'center', null, null]}>
                <Tag size="sm" fontFamily="mono" fontWeight="medium" mx={[1, 2, 2, 2]} my={2}>
                  {rowData.ipv4}
                </Tag>
                <Tag size="sm" fontFamily="mono" fontWeight="medium" mx={[1, 2, 2, 2]} my={2}>
                  {rowData.ipv6}
                </Tag>
                <Tag size="sm" mx={[1, 2, 2, 2]} my={2}>{`${rowData.port_speed} Gbps`}</Tag>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const MonoField = ({ v, copyable = false, ...props }) => {
  const [value] = useState(props.v);
  const { onCopy, hasCopied } = useClipboard(value);
  const { colorMode } = useColorMode();
  let copyProps = { _hover: { cursor: 'pointer' }, onClick: onCopy };
  if (!copyable) {
    copyProps = {};
  }
  return (
    <>
      <PseudoBox as={Text} {...copyProps} {...props}>
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
    id: <MonoField v={data.value} color={idColor[colorMode]} />,
    asn: <MonoField v={data.value} color={asnColor[colorMode]} copyable />,
    port_speed: <Text>{`${data.value} Gbps`}</Text>,
    ipv4: <MonoField v={data.value} copyable />,
    ipv6: <MonoField v={data.value} copyable />,
    circuit_id: <PortGraph v={data.value} rowData={rowData} />,
  };
  return component[data.column.id];
};

const ParticipantTable = () => {
  const { endpoints } = useConfig();
  const { data: response, error } = useSWR(endpoints.participants, axios.get);
  error && console.error(error);
  return (
    <Box>
      <Skeleton isLoaded={response?.data}>
        {!error && response?.data && (
          <Table
            bordersHorizontal
            data={response?.data?.rows ?? []}
            columns={response?.data?.columns ?? []}
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
              {error.name ?? 'Error Fetching Current Members'}
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              {error.message ?? 'An error occurred.'}
            </AlertDescription>
            <Button
              mt={2}
              leftIcon={Refresh}
              onClick={() => mutate(endpoints.participants)}
              variantColor="yellow"
              variant="outline">
              Retry
            </Button>
          </Alert>
        )}
      </Skeleton>
    </Box>
  );
};

ParticipantTable.displayName = 'ParticipantTable';

export default ParticipantTable;
