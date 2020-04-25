import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Skeleton,
  Text,
  Icon,
  useColorMode,
  useClipboard,
} from '@chakra-ui/core';
import { IoIosRefresh } from 'react-icons/io';
import useAxios from 'axios-hooks';
import Table from './Table';
import { useConfig } from './Provider';

const asnColor = { dark: 'teal.300', light: 'red.500' };
const copiedColor = { dark: 'green.300', light: 'green.600' };

const MonoField = props => {
  const [value] = useState(props.v);
  const { onCopy, hasCopied } = useClipboard(value);
  const { colorMode } = useColorMode();
  return (
    <>
      <Text onClick={onCopy} {...props}>
        {hasCopied ? (
          <Box
            ml={2}
            color={copiedColor[colorMode]}
            opacity={hasCopied ? '1' : '0'}
            transition="opacity .25s ease-in-out">
            <Icon name="check" color="green" />
            <Text ml={1} as="span" fontSize="sm">
              Copied
            </Text>
          </Box>
        ) : (
          <Text
            as="span"
            opacity={hasCopied ? '0' : '1'}
            transition="opacity .25s ease-in-out"
            fontFamily="mono">
            {props.v}
          </Text>
        )}
      </Text>
    </>
  );
};

const Cell = ({ data }) => {
  const { colorMode } = useColorMode();
  const component = {
    name: <Text>{data.value}</Text>,
    asn: <MonoField v={data.value} color={asnColor[colorMode]} />,
    port_speed: <Text>{`${data.value} Gbps`}</Text>,
    ipv4: <MonoField v={data.value} />,
    ipv6: <MonoField v={data.value} />,
  };
  return component[data.column.id];
};

const MemberTable = () => {
  const { endpoints } = useConfig();

  const [{ data, loading, error }, refetch] = useAxios(endpoints.members);
  error && console.dir(error);
  data && console.dir(data);
  return (
    <Box w="80%">
      <Skeleton isLoaded={!loading}>
        {!error && !loading && data && (
          <Table
            bordersHorizontal
            data={data?.rows ?? []}
            columns={data?.columns ?? []}
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
              leftIcon={IoIosRefresh}
              onClick={refetch}
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

MemberTable.displayName = 'MemberTable';

export default MemberTable;
