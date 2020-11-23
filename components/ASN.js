import { Text } from '@chakra-ui/react';
import { useColorValue } from '~context';

export const ASN = ({ as, prefix = true, ...props }) => {
  const asnColor = useColorValue('blue.500', 'red.300');
  const prefixColor = useColorValue('blackAlpha.900', 'whiteAlpha.900');
  return (
    <>
      {prefix && (
        <Text
          mr="0.15rem"
          as="span"
          color={prefixColor}
          fontWeight={600}
          fontFamily="mono"
          {...props}>
          AS
        </Text>
      )}
      <Text as="span" color={asnColor} fontWeight={600} fontFamily="mono" {...props}>
        {as || '62484'}
      </Text>
    </>
  );
};
