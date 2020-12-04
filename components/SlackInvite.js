import dynamic from 'next/dynamic';
import { useState } from 'react';
import {
  Box,
  Alert,
  Input,
  Modal,
  Button,
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
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useColorValue } from '~context';
import { useValidEmail } from '~hooks';

const Slack = dynamic(() => import('@meronex/icons/fa').then(i => i.FaSlack));

const constructData = data => {
  const now = new Date();
  return {
    contactName: data.contact,
    contactEmail: data.email,
    timestamp: now.getTime(),
  };
};

const sendForm = async (url, data) => {
  return await axios.post(url, data);
};

const FormField = props => <Box my={2} p={2} {...props} />;

const SlackButton = ({ onClick, ...props }) => (
  <Button
    onClick={onClick}
    leftIcon={<Slack />}
    ml={4}
    my={6}
    colorScheme="green"
    aria-label="Request Slack Invitation"
    {...props}>
    Request Slack Invite
  </Button>
);

export const SlackInvite = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const { register, handleSubmit, errors, formState } = useForm();

  const validateEmail = useValidEmail(formState.dirty);

  const onSubmit = async data => {
    const message = constructData(data);
    const sendRes = await sendForm('/invite-request', message);
    if (sendRes.status === 200) {
      onClose();
    } else {
      setSubmitSuccess(sendRes.statusText);
    }
    return sendRes;
  };

  const btnColor = useColorValue('dark', 'teal');
  const modalBg = useColorValue('white', 'original.dark');
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
                <FormControl isInvalid={errors.contact}>
                  <FormLabel htmlFor="contact">Name</FormLabel>
                  <Input id="contact" name="contact" ref={register({ required: true })} />
                  {errors.contact && <FormErrorMessage>Invalid name</FormErrorMessage>}
                </FormControl>
              </FormField>
              <FormField>
                <FormControl isInvalid={errors.email}>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Input
                    id="email"
                    name="email"
                    ref={register({ validate: validateEmail, required: true })}
                  />
                  {errors.email && <FormErrorMessage>Invalid email address</FormErrorMessage>}
                </FormControl>
              </FormField>
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
                aria-label="Request Slack Invite"
                colorScheme={btnColor}
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
