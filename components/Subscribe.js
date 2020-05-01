import * as React from 'react';
import { useState } from 'react';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useColorMode,
} from '@chakra-ui/core';
import { FaArrowAltCircleRight, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useConfig } from './Provider';

const border = { dark: 'yellow.200', light: 'red.300' };

const sendEmail = async (url, email) => {
  return await axios.post(url, email);
};

const validateEmail = value => {
  if (!value.match(/^\w+\@\w+\.\w+/m)) {
    return `'${value}' is an invalid email address`;
  } else {
    return true;
  }
};

const Form = props => <Flex as="form" {...props} />;

const Subscribe = props => {
  const config = useConfig();
  const { colorMode } = useColorMode();

  const { handleSubmit, errors, register, reset, formState } = useForm();
  const [btnColor, setBtnColor] = useState(null);

  const onSubmit = values => {
    console.log(values);
    sendEmail(config.endpoints.subscribe, values);
    setBtnColor('green');
    setTimeout(() => {
      setBtnColor(null);
      reset();
    }, 1500);
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
            _focus={{ borderColor: border[colorMode] }}
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
              variant="link"
              type="submit"
              variantColor={btnColor}
              transition="0.5s ease"
              icon={btnColor === 'green' ? FaCheckCircle : FaArrowAltCircleRight}
              aria-label="Subscribe"
            />
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>That was an invalid email-address.</FormErrorMessage>
      </FormControl>
    </Form>
  );
};

Subscribe.displayName = 'Subscribe';

export default Subscribe;
