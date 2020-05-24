import * as React from 'react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorMode,
} from '@chakra-ui/core';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const FaArrowAltCircleRight = dynamic(() =>
  import('react-icons/fa').then(i => i.FaArrowAltCircleRight),
);
const FaCheckCircle = dynamic(() => import('react-icons/fa').then(i => i.FaCheckCircle));
const MdDoNotDisturbAlt = dynamic(() => import('react-icons/md').then(i => i.MdDoNotDisturbAlt));

const sendEmail = async (emailAddr, stateCallback, responseCallback) => {
  let message = 'Something went wrong. Please contact noc@48ix.net';
  let status = 500;
  const params = `?action=add&emailAddr=${encodeURIComponent(emailAddr)}&listName=public-announce`;
  try {
    const response = await axios.get(`/mailing-list${params}`);
    const { message: responseMsg } = response.data;
    message = responseMsg;
    status = response.status;
  } catch (err) {
    message = err.response?.data?.message ?? err.message;
  }
  responseCallback(message);
  switch (status) {
    case 200:
      stateCallback(3);
      break;
    case 400:
      stateCallback(2);
      break;
    case 409:
      stateCallback(2);
      break;
    case 500:
      stateCallback(2);
      break;
    default:
      stateCallback(2);
  }
  return message;
};

const validateEmail = value => {
  if (!value.match(/^\w+\@\w+\.\w+/m)) {
    return `'${value}' is an invalid email address`;
  } else {
    return true;
  }
};

const Form = props => <Flex as="form" {...props} />;
const StatusMessage = ({ status, children, ...props }) => {
  const { colorMode } = useColorMode();
  const color = [
    { dark: null, light: null },
    { dark: null, light: null },
    { dark: 'red.300', light: 'red.500' },
    { dark: 'green.300', light: 'green.500' },
  ];
  return (
    <Flex alignItems="center" mt={2} fontSize="xs" {...props}>
      <Text lineHeight="normal" color={color[status][colorMode]}>
        {children}
      </Text>
    </Flex>
  );
};

const btnLoading = [false, true, false, false];
const btnColor = [null, null, 'red', 'green'];
const statusDisplay = ['none', 'none', 'flex', 'flex'];
const btnIcon = [FaArrowAltCircleRight, null, MdDoNotDisturbAlt, FaCheckCircle];
const border = [
  { dark: 'yellow.200', light: 'purple.500' },
  { dark: 'yellow.200', light: 'purple.500' },
  { dark: 'red.300', light: 'red.500' },
  { dark: 'green.300', light: 'green.500' },
];

const Subscribe = props => {
  const { colorMode } = useColorMode();

  const { handleSubmit, errors, register, reset, formState } = useForm();
  /**
   * 0: Not submitted
   * 1: Submitted, waiting
   * 2: Submitted, error
   * 3: Submitted, success
   */
  const [submission, setSubmission] = useState(0);
  const [response, setResponse] = useState(null);

  const onSubmit = async values => {
    setSubmission(1);
    const { message } = await sendEmail(values.email, setSubmission, setResponse);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      maxW={['80%', '80%', '50%']}
      w="100%"
      display="flex"
      flex="1 0 auto">
      <FormControl isInvalid={errors.email} w="100%">
        <InputGroup>
          <Input
            _focus={{ borderColor: border[submission][colorMode] }}
            _placeholder={{ fontWeight: 300, fontSize: 'sm' }}
            isFullWidth
            size="sm"
            variant="flushed"
            name="email"
            ref={register({ validate: validateEmail })}
            placeholder="Subscribe to our mailing list"
            aria-label="Subscribe"
            {...props}
          />
          <InputRightElement>
            <IconButton
              type="submit"
              variant="link"
              transition="0.5s ease"
              aria-label="Subscribe"
              icon={btnIcon[submission]}
              isLoading={btnLoading[submission]}
              variantColor={btnColor[submission]}
            />
          </InputRightElement>
        </InputGroup>
        <StatusMessage status={submission} display={statusDisplay[submission]}>
          {response}
        </StatusMessage>
        <FormErrorMessage>That was an invalid email-address.</FormErrorMessage>
      </FormControl>
    </Form>
  );
};

Subscribe.displayName = 'Subscribe';

export default Subscribe;
