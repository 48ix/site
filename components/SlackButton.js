import * as React from 'react';
import { Button } from '@chakra-ui/core';
import { FaSlack } from 'react-icons/fa';

const SlackButton = props => (
  <Button
    onClick={() => console.log('FIX ME')}
    leftIcon={FaSlack}
    ml={4}
    my={6}
    variantColor="green"
    {...props}>
    Request Slack Invite
  </Button>
);

SlackButton.displayName = 'SlackButton';

export default SlackButton;
