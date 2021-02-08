import { Box } from '@chakra-ui/react';
import { useColorValue } from '~context';

import type { BoxProps } from '@chakra-ui/react';

interface ASNProps extends Omit<BoxProps, 'as' | 'prefix'> {
  as?: string;
  prefix?: boolean;
}

export const ASN: React.FC<ASNProps> = (props: ASNProps) => {
  const { as, prefix = true, ...rest } = props;

  const asnColor = useColorValue('blue.500', 'red.300');
  const prefixColor = useColorValue('blackAlpha.900', 'whiteAlpha.900');

  return (
    <>
      {prefix && (
        <Box
          as="span"
          mr="0.15rem"
          fontWeight={600}
          fontFamily="mono"
          color={prefixColor}
          {...rest}>
          AS
        </Box>
      )}
      <Box as="span" color={asnColor} fontWeight={600} fontFamily="mono" {...rest}>
        {as || '62484'}
      </Box>
    </>
  );
};
