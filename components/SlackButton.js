import * as React from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@chakra-ui/core';

const FaSlack = dynamic(() => import('react-icons/fa').then(i => i.FaSlack));

const SlackButton = props => (
  <Button
    onClick={() => console.log('FIX ME')}
    leftIcon={FaSlack}
    ml={4}
    my={6}
    variantColor="green"
    aria-label="Request Slack Invitation"
    {...props}>
    Request Slack Invite
  </Button>
);

SlackButton.displayName = 'SlackButton';

export default SlackButton;
