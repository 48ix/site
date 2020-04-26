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
} from '@chakra-ui/core';
import { FaArrowAltCircleRight, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const sendEmail = async email => {
  return await axios.post('https://webhook.site/289773ff-6d22-4dec-bc51-db0c0c649acb', email);
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
  const { handleSubmit, errors, register, reset, formState } = useForm();
  const [btnColor, setBtnColor] = useState(null);

  const onSubmit = values => {
    console.log(values);
    sendEmail(values);
    setBtnColor('green');
    setTimeout(() => {
      setBtnColor(null);
      reset();
    }, 1500);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} display="flex" flex="1 0 auto">
      <FormControl isInvalid={errors.email} w="100%">
        <InputGroup>
          <Input
            isFullWidth
            size="sm"
            variant="flushed"
            name="email"
            ref={register({ validate: validateEmail })}
            placeholder="Subscribe to our mailing list"
            {...props}
          />
          <InputRightElement>
            <IconButton
              variant="link"
              type="submit"
              variantColor={btnColor}
              transition="0.5s ease"
              icon={btnColor === 'green' ? FaCheckCircle : FaArrowAltCircleRight}
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
