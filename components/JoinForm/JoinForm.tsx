import { useState } from 'react';
import {
  Alert,
  Modal,
  Button,
  AlertIcon,
  ModalBody,
  AlertTitle,
  ModalFooter,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  AlertDescription,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useForm, FormProvider } from 'react-hook-form';
import { useColorValue, useConfig, useJoinForm, useJoinTerm } from '~context';
import { TermField, TextField, SelectField } from './fields';

import type { JoinFormData, JoinFormSubmission } from './types';

function constructData(data: JoinFormData): JoinFormSubmission {
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
}

async function sendForm(url: string, data: JoinFormSubmission): Promise<Response> {
  return await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export const JoinForm: React.FC = () => {
  const config = useConfig();
  const { isOpen, onClose } = useJoinForm();
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const form = useForm<JoinFormData>();

  async function onSubmit(data: JoinFormData) {
    const message = constructData(data);
    const res = await sendForm('/member-request', message);
    if (res.status === 200) {
      onClose();
    } else {
      setSubmitSuccess(res.statusText);
    }
  }

  const btnColor = useColorValue('blue', 'green');
  const modalBg = useColorValue('white', 'dark.500');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="md" bg={modalBg}>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ModalHeader>Join {config.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <TextField id="org" label="Organization" required />
              <TextField id="contact" label="Contact Name" required />
              <TextField
                id="asn"
                label="Autonomous System Number"
                error="ASN must be a number, optionally prefixed by 'AS'"
                required
              />
              <TextField id="email" label="Email Address" type="email" required />
              <SelectField id="facility" label="Facility" options={config.facilities} required />
              <TermField />
              <SelectField
                id="port_speed"
                label="Port Speed"
                options={config.portSpeeds.map((s, i) => {
                  if (i === 0) {
                    return { ...s, default: true };
                  }
                  return { ...s };
                })}
              />
              {submitSuccess !== null && (
                <Alert
                  status="error"
                  variant="subtle"
                  borderRadius="md"
                  textAlign="center"
                  flexDirection="column"
                  justifyContent="center">
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
                colorScheme={btnColor}
                aria-label="Submit Request"
                isLoading={form.formState.isSubmitting}>
                Submit Request
              </Button>
            </ModalFooter>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
};
