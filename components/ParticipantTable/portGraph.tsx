import {
  Box,
  Tag,
  Flex,
  Text,
  chakra,
  Alert,
  Modal,
  Stack,
  Button,
  Tooltip,
  ModalBody,
  AlertTitle,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  AlertDescription,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Graph, LittleGraph } from '~components';
import { useColorValue } from '~context';
import { useUtilization } from '~hooks';

import type { UtilizationCircuitResponse } from '~types';
import type { PortGraphProps } from './types';

const InfoTag = chakra(Tag, {
  baseStyle: { size: 'sm', fontFamily: 'mono', fontWeight: 'normal', mx: { base: 1, md: 2 } },
});

export const PortGraph: React.FC<PortGraphProps> = (props: PortGraphProps) => {
  const { rowData, ...rest } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalBg = useColorValue('white', 'dark.500');
  const label = `View Port Statistics for ${rowData.name}`;

  const { data, isError, error, isLoading } = useUtilization<UtilizationCircuitResponse>(
    rowData.circuit_id,
  );

  function isFullError(error: unknown): error is Error {
    return isError;
  }

  isError && console.error(error);

  return (
    <>
      {isFullError(error) ? (
        <Alert
          status="error"
          variant="subtle"
          borderRadius="md"
          textAlign="center"
          flexDirection="column"
          justifyContent="center">
          <AlertTitle fontSize="sm">Error</AlertTitle>
          <AlertDescription fontSize="xs">
            {error.message ?? 'Something went wrong.'}
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <Tooltip hasArrow label={label} placement="top" fontWeight="normal">
            <Button
              variant="link"
              onClick={onOpen}
              aria-label={label}
              isLoading={isLoading}
              textDecoration="none">
              <LittleGraph data={data} />
            </Button>
          </Tooltip>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxWidth={{ base: '100%', lg: '75%' }} bg={modalBg} {...rest}>
              <ModalCloseButton />
              <ModalBody p={8}>
                <Box mb={6}>
                  <Text as="h3" fontSize="xl" fontWeight="bold">
                    {rowData.name}
                  </Text>
                  <Text fontSize="sm" opacity={0.6}>{`AS${rowData.asn}`}</Text>
                </Box>
                <Graph data={data} />
                <Flex p={0} my={4} justify={['center', 'center', 'flex-end', 'flex-end']}>
                  <Stack
                    mt={4}
                    isInline
                    align="center"
                    flexWrap="wrap"
                    justify={{ base: 'center', lg: undefined }}>
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
