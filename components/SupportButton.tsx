import dynamic from 'next/dynamic';
import { chakra, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useColorValue } from '~context';

import type { ButtonProps } from '@chakra-ui/react';

const Mail = dynamic<MeronexIcon>(() => import('@meronex/icons/bi').then(i => i.BisEnvelope));

interface SupportButtonProps extends Omit<ButtonProps, 'top' | 'bottom' | 'left' | 'right'> {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}

const Sev = chakra('strong', { baseStyle: { mr: 2 } });

const SUBJ_CRITICAL = encodeURIComponent('P1: 48 IX Critical Issue');
const SUBJ_EMERGENCY = encodeURIComponent('P2: 48 IX Emergency Issue');
const SUBJ_IMPORTANT = encodeURIComponent('P3: 48 IX Important Issue');
const SUBJ_REQUEST = encodeURIComponent('P4: 48 IX Request');

export const SupportButton: React.FC<SupportButtonProps> = (props: SupportButtonProps) => {
  const { top = false, bottom = true, left = false, right = false } = props;
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
        <MenuItem as="a" href={`mailto:noc@48ix.net?subject=${SUBJ_CRITICAL}`}>
          <Sev>P1</Sev>Critical
        </MenuItem>
        <MenuItem as="a" href={`mailto:noc@48ix.net?subject=${SUBJ_EMERGENCY}`}>
          <Sev>P2</Sev>Emergency
        </MenuItem>
        <MenuItem as="a" href={`mailto:noc@48ix.net?subject=${SUBJ_IMPORTANT}`}>
          <Sev>P3</Sev>Important
        </MenuItem>
        <MenuItem as="a" href={`mailto:noc@48ix.net?subject=${SUBJ_REQUEST}`}>
          <Sev>P4</Sev>Request
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
