import * as React from 'react';
import dynamic from 'next/dynamic';
import { Box, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/core';

const MdEmail = dynamic(() => import('react-icons/md').then(i => i.MdEmail));

const Sev = props => <Box as="strong" mr={2} {...props} />;

const SupportButton = ({ top = false, bottom = true, left = false, right = false, ...props }) => {
  const placement = right ? 'right' : left ? 'left' : bottom ? 'bottom' : top ? 'top' : 'top';
  return (
    <Menu>
      <MenuButton
        as={Button}
        leftIcon={MdEmail}
        ml={4}
        my={6}
        variantColor="yellow"
        aria-label="Request Support">
        Request Support
      </MenuButton>
      <MenuList placement={placement}>
        <MenuItem
          as="a"
          href={`mailto:noc@48ix.net?subject=${encodeURIComponent('P1: 48 IX Critical Issue')}`}>
          <Sev>P1</Sev>Critical
        </MenuItem>
        <MenuItem
          as="a"
          href={`mailto:noc@48ix.net?subject=${encodeURIComponent('P2: 48 IX Emergency Issue')}`}>
          <Sev>P2</Sev>Emergency
        </MenuItem>
        <MenuItem
          as="a"
          href={`mailto:noc@48ix.net?subject=${encodeURIComponent('P3: 48 IX Important Issue')}`}>
          <Sev>P3</Sev>Important
        </MenuItem>
        <MenuItem
          as="a"
          href={`mailto:noc@48ix.net?subject=${encodeURIComponent('P4: 48 IX Request')}`}>
          <Sev>P4</Sev>Request
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

SupportButton.displayName = 'SupportButton';
export default SupportButton;
