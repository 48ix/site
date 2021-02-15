import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import {
  Flex,
  Text,
  Input,
  chakra,
  IconButton,
  InputGroup,
  FormControl,
  FormErrorMessage,
  InputRightElement,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import queryString from 'query-string';
import { useColorValue } from '~context';

import type { IconButtonProps, FlexProps } from '@chakra-ui/react';

const Check = dynamic<MeronexIcon>(() => import('@meronex/icons/fa').then(i => i.FaCheckCircle));
const Prohibit = dynamic<MeronexIcon>(() => import('@meronex/icons/mdc').then(i => i.MdcCancel));
const RightArrow = dynamic<MeronexIcon>(() =>
  import('@meronex/icons/fa').then(i => i.FaArrowCircleRight),
);

interface FormData {
  email: string;
}

interface SubscribeResponse {
  message: string;
}

type SubscribeStatus =
  /**
   * Not Submitted.
   */
  | 0
  /**
   * Submitted, waiting.
   */
  | 1
  /**
   * Submitted, error.
   */
  | 2
  /**
   * Submitted, success.
   */
  | 3;

async function sendEmail(
  emailAddr: string,
  callback: (message: string, status: number) => void,
): Promise<void> {
  let message = 'Something went wrong. Please contact noc@48ix.net';
  let status = 500;

  const url = queryString.stringifyUrl({
    url: '/mailing-list',
    query: { emailAddr, listName: 'public-announce' },
  });

  try {
    const res = await fetch(url, { method: 'GET', headers: { accept: 'application/json' } });
    const data = (await res.json()) as SubscribeResponse;
    message = data.message;
    status = res.status;
  } catch (err) {
    message = err.message;
  }
  callback(message, status);
}

const Form = chakra('form', { baseStyle: { display: 'flex' } });

interface StatusMessageProps extends FlexProps {
  status: number;
}

const StatusMessage: React.FC<StatusMessageProps> = (props: StatusMessageProps) => {
  const { status, children, ...rest } = props;
  const formColor = [
    undefined,
    undefined,
    useColorValue('red.500', 'red.300'),
    useColorValue('green.500', 'green.300'),
  ];
  return (
    <Flex alignItems="center" mt={2} fontSize="xs" {...rest}>
      <Text lineHeight="normal" color={formColor[status]}>
        {children}
      </Text>
    </Flex>
  );
};

export const Subscribe: React.FC = () => {
  const border = [
    useColorValue('purple.500', 'yellow.200'),
    useColorValue('purple.500', 'yellow.200'),
    useColorValue('red.500', 'red.300'),
    useColorValue('green.500', 'green.300'),
  ];

  const { control, handleSubmit, errors } = useForm<FormData>();
  const [submission, setSubmission] = useState<SubscribeStatus>(0);
  const [response, setResponse] = useState<string | null>(null);

  function handleResponse(message: string, status: number): void {
    setResponse(message);
    switch (status) {
      case 200:
        setSubmission(3);
        break;
      case 400:
        setSubmission(2);
        break;
      case 409:
        setSubmission(2);
        break;
      case 500:
        setSubmission(2);
        break;
      default:
        setSubmission(2);
    }
  }

  async function onSubmit(values: FormData): Promise<void> {
    setSubmission(1);
    await sendEmail(values.email, handleResponse);
  }

  const icon = useMemo((): NoAria<IconButtonProps> => {
    switch (submission) {
      case 0:
        return {
          icon: <RightArrow />,
          isLoading: false,
          colorScheme: undefined,
        } as NoAria<IconButtonProps>;
      case 1:
        return {
          isLoading: true,
          colorScheme: undefined,
        } as NoAria<IconButtonProps>;
      case 2:
        return {
          icon: <Prohibit />,
          isLoading: false,
          colorScheme: 'red',
        } as NoAria<IconButtonProps>;
      case 3:
        return {
          icon: <Check />,
          isLoading: false,
          colorScheme: 'green',
        } as NoAria<IconButtonProps>;
    }
  }, [submission]);

  const statusDisplay = useMemo(() => {
    switch (submission) {
      case 0:
        return 'none';
      case 1:
        return 'none';
      case 2:
        return 'flex';
      case 3:
        return 'flex';
    }
  }, [submission]);

  return (
    <Form
      w="100%"
      display="flex"
      flex="1 0 auto"
      maxW={{ base: '80%', lg: '50%' }}
      onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={typeof errors.email !== 'undefined'} w="100%">
        <InputGroup>
          <Controller
            name="email"
            defaultValue=""
            control={control}
            rules={{ required: true }}
            render={({ value, onChange }) => (
              <Input
                size="sm"
                name="email"
                type="email"
                value={value}
                variant="flushed"
                onChange={onChange}
                aria-label="Subscribe"
                borderRadius={errors.email && 'md'}
                borderColor={errors.email && 'unset'}
                placeholder="Subscribe to our mailing list"
                _focus={{ borderColor: border[submission] }}
                _placeholder={{ fontWeight: 400, fontSize: 'sm' }}
              />
            )}
          />

          <InputRightElement p={4} top="-0.5rem">
            <IconButton
              type="submit"
              variant="link"
              transition="0.5s ease"
              aria-label="Subscribe"
              {...icon}
            />
          </InputRightElement>
        </InputGroup>
        <StatusMessage status={submission} display={statusDisplay}>
          {response}
        </StatusMessage>
        <FormErrorMessage>That was an invalid email-address.</FormErrorMessage>
      </FormControl>
    </Form>
  );
};
