import * as React from 'react';
import { useState } from 'react';
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

const btnColor = { dark: 'green', light: 'blue' };
const modalBg = { dark: 'original.dark', light: 'white' };

const constructData = data => {
  const now = new Date();
  return {
    memberName: data.org,
    memberAsn: data.asn,
    contactName: data.contact,
    contactEmail: data.email,
    facilityName: data.facility,
    portSpeed: data.port_speed,
    term: data.term,
    timestamp: now.getTime(),
  };
};

const sendForm = async (url, data) => {
  return await axios.post(url, data);
};

const validateAsn = input => {
  const dropPrefix = new RegExp(/^(AS)?(\d+)/m);
  const asn = input.match(dropPrefix)[2];
  return Number(asn);
};

const FormField = props => <Box my={2} p={2} {...props} />;

const TextField = ({
  id,
  label,
  formConfig,
  reg,
  hasError = false,
  required = false,
  error = 'This field is invalid or required.',
  ...props
}) => {
  const registerObj = { maxLength: 32, ...formConfig };
  if (required === true && registerObj.required !== true) {
    registerObj.required = true;
  }
  return (
    <FormField>
      <FormControl isInvalid={hasError}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <Input id={id} name={id} ref={reg(registerObj)} {...props}></Input>
        {hasError && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    </FormField>
  );
};

const SelectField = ({
  reg,
  id,
  label,
  options,
  formConfig,
  hasError,
  required = false,
  error = 'This field is invalid or required.',
  ...props
}) => {
  const registerObj = { ...formConfig };
  if (required === true && registerObj.required !== true) {
    registerObj.required = true;
  }
  const selectProps = {};
  options.map(opt => {
    if (opt.default === true) {
      selectProps.defaultValue = opt.id;
    }
  });
  return (
    <FormField>
      <FormControl isInvalid={hasError}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <Select ref={reg(registerObj)} id={id} name={id} {...selectProps} {...props}>
          {options.map(opt => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </Select>
        {hasError && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    </FormField>
  );
};

const Term = ({
  reg,
  formConfig,
  hasError,
  required = false,
  selected,
  error = 'This field is invalid or required.',
  ...props
}) => {
  const registerObj = { ...formConfig };
  if (required === true && registerObj.required !== true) {
    registerObj.required = true;
  }
  return (
    <RadioGroup spacing={5} isInline ref={reg(registerObj)} value={selected} {...props}>
      <Radio value="monthly">Monthly</Radio>
      <Radio value="annual">Annual</Radio>
    </RadioGroup>
  );
};

const JoinForm = () => {
  const { colorMode } = useColorMode();
  const config = useConfig();
  const { joinFormOpen, joinFormOnClose, joinFormTerm, setJoinFormTerm } = useGlobalState();
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
            <TextField
              reg={register}
              id="org"
              label="Organization"
              hasError={errors.org}
              required
            />
            <TextField
              reg={register}
              id="contact"
              label="Contact Name"
              hasError={errors.contact}
              required
            />
            <TextField
              reg={register}
              id="asn"
              label="Autonomous System Number"
              hasError={errors.asn}
              formConfig={{ validate: validateAsn }}
              error="ASN must be a number, optionally prefixed by 'AS'"
              required
            />
            <TextField
              reg={register}
              id="email"
              label="Email Address"
              hasError={errors.email}
              type="email"
              required
            />
            <SelectField
              id="facility"
              label="Facility"
              reg={register}
              options={config.facilities}
              hasError={errors.facility}
              required
            />
            <Term
              reg={register}
              hasError={errors.term}
              selected={joinFormTerm}
              required
              onChange={e => setJoinFormTerm(e.target.value)}
            />
            <SelectField
              id="port_speed"
              label="Port Speed"
              reg={register}
              options={config.portSpeeds}
              hasError={errors.port_speed}
            />
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
              aria-label="Submit Request"
              variantColor={btnColor[colorMode]}
              isLoading={formState.isSubmitting}>
              Submit Request
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default JoinForm;
