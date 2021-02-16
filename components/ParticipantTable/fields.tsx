import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { chakra, Box, Icon, Tooltip, useClipboard } from '@chakra-ui/react';
import { useColorValue } from '~context';
import { useOpposingColor } from '~hooks';

import type { BoxProps } from '@chakra-ui/react';
import type { MonoFieldProps, BooleanFieldProps } from './types';

const CheckIcon = dynamic<MeronexIcon>(() => import('@meronex/icons/fa').then(i => i.FaCheck));
const TrueIcon = dynamic<MeronexIcon>(() => import('@meronex/icons/fa').then(i => i.FaCheckCircle));

const FalseIcon = dynamic<MeronexIcon>(() =>
  import('@meronex/icons/fa').then(i => i.FaTimesCircle),
);

export const TextField = chakra('span', { baseStyle: { fontSize: 'sm' } });

export const BooleanField: React.FC<BooleanFieldProps> = (props: BooleanFieldProps) => {
  const { v, label } = props;
  const trueBg = useColorValue('green.600', 'green.300');
  const falseBg = useColorValue('red.500', 'red.300');
  const trueColor = useOpposingColor(trueBg);
  const falseColor = useOpposingColor(falseBg);

  const component = useMemo(() => {
    if (v) {
      return <Icon as={TrueIcon} color={trueBg} />;
    } else {
      return <Icon as={FalseIcon} color={falseBg} />;
    }
  }, [v]);

  return (
    <Tooltip hasArrow label={label} bg={v ? trueBg : falseBg} color={v ? trueColor : falseColor}>
      <Box>{component}</Box>
    </Tooltip>
  );
};

export const MonoField: React.FC<MonoFieldProps> = (props: MonoFieldProps) => {
  const { v, copyable = false, ...rest } = props;
  const { onCopy, hasCopied } = useClipboard(`${v}`);
  const copiedColor = useColorValue('green.600', 'green.300');

  const copyProps = useMemo<BoxProps>(() => {
    if (copyable) {
      return { _hover: { cursor: 'pointer' }, onClick: onCopy };
    } else {
      return {};
    }
  }, [copyable]);

  const fontFamily = useMemo<string>(() => {
    if (copyable) {
      if (hasCopied) {
        return 'body';
      } else {
        return 'mono';
      }
    } else {
      return 'mono';
    }
  }, [copyable, hasCopied]);

  return (
    <>
      <Box {...copyProps} {...rest}>
        <Box
          pos="relative"
          transition="opacity .25s ease-in-out"
          color={hasCopied ? copiedColor : undefined}>
          {hasCopied && <Icon as={CheckIcon} color={copiedColor} mr={1} />}
          <TextField fontFamily={fontFamily}>{hasCopied ? 'Copied' : v}</TextField>
        </Box>
      </Box>
    </>
  );
};
