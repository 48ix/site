import dynamic from 'next/dynamic';
import { useState } from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useColorValue } from '~context';
import { validateEmail } from '~util';

const Check = dynamic(() => import('@meronex/icons/fa').then(i => i.FaCheckCircle));
const Prohibit = dynamic(() => import('@meronex/icons/mdc').then(i => i.MdcCancel));
const RightArrow = dynamic(() => import('@meronex/icons/fa').then(i => i.FaArrowCircleRight));

const btnLoading = [false, true, false, false];
const btnColor = [null, null, 'red', 'green'];
const statusDisplay = ['none', 'none', 'flex', 'flex'];

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

const Form = props => <Flex as="form" {...props} />;

const StatusMessage = ({ status, children, ...props }) => {
  const formColor = [
    null,
    null,
    useColorValue('red.500', 'red.300'),
    useColorValue('green.500', 'green.300'),
  ];
  return (
    <Flex alignItems="center" mt={2} fontSize="xs" {...props}>
      <Text lineHeight="normal" color={formColor[status]}>
        {children}
      </Text>
    </Flex>
  );
};

export const Subscribe = props => {
  const border = [
    useColorValue('purple.500', 'yellow.200'),
    useColorValue('purple.500', 'yellow.200'),
    useColorValue('red.500', 'red.300'),
    useColorValue('green.500', 'green.300'),
  ];

  const btnIcon = [
    <Box as={RightArrow} boxSize="1rem" />,
    null,
    <Box as={Prohibit} boxSize="1rem" />,
    <Box as={Check} boxSize="1rem" />,
  ];

  const { handleSubmit, errors, register } = useForm();
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
    await sendEmail(values.email, setSubmission, setResponse);
  };

  return (
    <Form
      w="100%"
      display="flex"
      flex="1 0 auto"
      maxW={{ base: '80%', lg: '50%' }}
      onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.email} w="100%">
        <InputGroup>
          <Input
            size="sm"
            isFullWidth
            name="email"
            variant="flushed"
            aria-label="Subscribe"
            borderRadius={errors.email && 'md'}
            borderColor={errors.email && 'unset'}
            ref={register({ validate: validateEmail })}
            placeholder="Subscribe to our mailing list"
            _focus={{ borderColor: border[submission] }}
            _placeholder={{ fontWeight: 400, fontSize: 'sm' }}
            {...props}
          />
          <InputRightElement p={4} top="-0.5rem">
            <IconButton
              type="submit"
              variant="link"
              transition="0.5s ease"
              aria-label="Subscribe"
              icon={btnIcon[submission]}
              isLoading={btnLoading[submission]}
              colorScheme={btnColor[submission]}
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
