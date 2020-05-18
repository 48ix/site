import * as React from 'react';
import {
  Box,
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
  Button,
  useColorMode,
} from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import { useConfig, useGlobalState } from '../components/Provider';

const btnColor = { dark: 'teal', light: 'dark' };

const modalBg = { dark: 'original.dark', light: 'white' };

const FormField = props => <Box my={2} p={2} {...props} />;

const formElement = {
  input: Input,
  select: Select,
};

const JoinForm = () => {
  const { colorMode } = useColorMode();
  const config = useConfig();
  const { joinFormOpen, joinFormOnClose } = useGlobalState();
  const { register, handleSubmit, errors, formState } = useForm();
  const onSubmit = data => {
    console.log(data);
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
                      {...(field.elementProps ?? {})}>
                      {field.element === 'select'
                        ? field.options.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))
                        : null}
                    </FormElement>
                    {errors[field.id] && <FormErrorMessage>{field.error}</FormErrorMessage>}
                  </FormControl>
                </FormField>
              );
            })}
            <FormField></FormField>
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
