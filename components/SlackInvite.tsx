import dynamic from 'next/dynamic';
import { useState } from 'react';
import {
  Alert,
  Input,
  Modal,
  chakra,
  Button,
  useToast,
  AlertIcon,
  FormLabel,
  ModalBody,
  AlertTitle,
  FormControl,
  ModalFooter,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  AlertDescription,
  FormErrorMessage,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { useColorValue } from '~context';

import type { ButtonProps } from '@chakra-ui/react';

const Slack = dynamic<MeronexIcon>(() => import('@meronex/icons/fa').then(i => i.FaSlack));

interface FormData {
  contact: string;
  email: string;
}

interface InviteData {
  contactName: string;
  contactEmail: string;
  timestamp: number;
}

function constructData(data: FormData): InviteData {
  const now = new Date();
  return {
    contactName: data.contact,
    contactEmail: data.email,
    timestamp: now.getTime(),
  };
}

const FormField = chakra('div', { baseStyle: { my: 2, p: 2 } });

const SlackButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <Button
      ml={4}
      my={6}
      colorScheme="green"
      leftIcon={<Slack />}
      aria-label="Request Slack Invitation"
      {...props}>
      Request Slack Invite
    </Button>
  );
};

export const SlackInvite: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const { control, handleSubmit, errors, formState } = useForm<FormData>();
  const toast = useToast();

  async function onSubmit(data: FormData): Promise<void> {
    const message = constructData(data);
    const res = await fetch('/invite-request', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(message),
    });
    if (res.ok) {
      onClose();
      toast({
        title: 'Thanks!',
        status: 'success',
        description: 'You should get a Slack invite in the next 24-48 hours.',
      });
    } else {
      const error = await res.text();
      setSubmitSuccess(res.statusText);
      toast({
        status: 'error',
        title: 'Something Went Wrong',
        description: error ?? res.statusText,
      });
    }
  }

  const btnColor = useColorValue('dark', 'teal');
  const modalBg = useColorValue('white', 'dark.500');

  return (
    <>
      <SlackButton onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="md" bg={modalBg}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Request Slack Invite</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormField>
                <FormControl isInvalid={typeof errors.contact !== 'undefined'}>
                  <FormLabel htmlFor="contact">Name</FormLabel>
                  <Controller
                    control={control}
                    name="contact"
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ onChange, value }) => (
                      <Input id="contact" name="contact" value={value} onChange={onChange} />
                    )}
                  />
                  {errors.contact && <FormErrorMessage>Invalid name</FormErrorMessage>}
                </FormControl>
              </FormField>
              <FormField>
                <FormControl isInvalid={typeof errors.email !== 'undefined'}>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Controller
                    control={control}
                    name="email"
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ onChange, value }) => (
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  {errors.email && <FormErrorMessage>Invalid email address</FormErrorMessage>}
                </FormControl>
              </FormField>
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
                aria-label="Request Slack Invite"
                isLoading={formState.isSubmitting}>
                Request Slack Invite
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
