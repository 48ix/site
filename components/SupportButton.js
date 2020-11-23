import dynamic from 'next/dynamic';
import { Box, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useColorValue } from '~context';

const Mail = dynamic(() => import('@meronex/icons/bi').then(i => i.BisEnvelope));

const Sev = props => <Box as="strong" mr={2} {...props} />;

export const SupportButton = ({ top = false, bottom = true, left = false, right = false }) => {
  const placement = right ? 'right' : left ? 'left' : bottom ? 'bottom' : top ? 'top' : 'top';
  const colorScheme = useColorValue('red', 'yellow');
  return (
    <Menu>
      <MenuButton
        ml={4}
        my={6}
        as={Button}
        leftIcon={<Mail />}
        colorScheme={colorScheme}
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
