import * as React from 'react';
import { forwardRef, useState } from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Radio,
  RadioGroup,
  useColorMode,
} from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useConfig, useGlobalState } from '../components/Provider';

const constructData = data => {
  const now = new Date();
  return {
    memberName: data.org,
    memberAsn: data.asn,
    contactName: data.contact,
    contactEmail: data.email,
    facilityName: data.facility,
    portSpeed: data.port_speed,
    timestamp: now.getTime(),
  };
};

const sendForm = async (url, data) => {
  return await axios.post(url, data);
};

const btnColor = { dark: 'teal', light: 'dark' };

const modalBg = { dark: 'original.dark', light: 'white' };

const FormField = props => <Box my={2} p={2} {...props} />;

const formElement = {
  input: Input,
  select: Select,
  radio: forwardRef((props, ref) => <RadioGroup spaceing={5} isInline ref={ref} {...props} />),
};

const JoinForm = () => {
  const { colorMode } = useColorMode();
  const config = useConfig();
  const { joinFormOpen, joinFormOnClose, joinFormInterval, setJoinFormInterval } = useGlobalState();
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const { register, handleSubmit, errors, formState } = useForm();
  const onSubmit = async data => {
    const message = constructData(data);
    const sendRes = await sendForm('/member-request', message);
    if (sendRes.status === 200) {
      joinFormOnClose();
    } else {
      setSubmitSuccess(sendRes.statusText);
    }
    return sendRes;
  };
  return (
    <Modal isOpen={joinFormOpen} onClose={joinFormOnClose}>
      <ModalOverlay />
      <ModalContent borderRadius="md" bg={modalBg[colorMode]}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Join {config.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {config.joinForm.fields.map(field => {
              const FormElement = formElement[field.element];
              return (
                <FormField key={field.id}>
                  <FormControl isInvalid={errors[field.id]}>
                    <FormLabel htmlFor={field.id}>{field.label}</FormLabel>
                    <FormElement
                      id={field.id}
                      name={field.id}
                      ref={register({ required: field.required })}
                      {...(field.elementProps ?? {})}
                      {...((field.id === 'interval' &&
                        joinFormInterval !== null && {
                          value: joinFormInterval,
                          onChange: e => setJoinFormInterval(e.target.value),
                        }) ??
                        {})}>
                      {field.element === 'select'
                        ? field.options.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))
                        : field.element === 'radio'
                        ? field.options.map(option => (
                            <Radio key={option.value} value={option.value}>
                              {option.label}
                            </Radio>
                          ))
                        : null}
                    </FormElement>
                    {errors[field.id] && <FormErrorMessage>{field.error}</FormErrorMessage>}
                  </FormControl>
                </FormField>
              );
            })}
            {submitSuccess !== null && (
              <Alert
                borderRadius="md"
                status="error"
                variant="subtle"
                flexDirection="column"
                justifyContent="center"
                textAlign="center">
                <AlertIcon mr={0} />
                <AlertTitle mt={2} mb={1} fontSize="md">
                  An error occurred while submitting the request
                </AlertTitle>
                <AlertDescription maxWidth="sm">{submitSuccess}</AlertDescription>
              </Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              aria-label={config.joinForm.buttonText}
              variantColor={btnColor[colorMode]}
              isLoading={formState.isSubmitting}>
              {config.joinForm.buttonText}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

JoinForm.displayName = 'JoinForm';

export default JoinForm;
