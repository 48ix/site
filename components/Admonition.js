import dynamic from 'next/dynamic';
import { Box, Heading, HStack, Icon, Text } from '@chakra-ui/react';
import { useColorValue } from '~context';
import { useOpposingColor } from '~hooks';
import { title } from '~util';

const Note = dynamic(() => import('@meronex/icons/go').then(i => i.GoNote));
const Tip = dynamic(() => import('@meronex/icons/go').then(i => i.GoLightBulb));
const Warning = dynamic(() => import('@meronex/icons/vsc').then(i => i.VscWarning));
const Critical = dynamic(() => import('@meronex/icons/im').then(i => i.ImFire));
const Information = dynamic(() => import('@meronex/icons/bi').then(i => i.BiInfoCircle));

const iconMap = {
  information: Information,
  critical: Critical,
  warning: Warning,
  note: Note,
  tip: Tip,
};

const AdmonitionContainer = props => (
  <Box
    borderRadius="lg"
    width="fit-content"
    p={{ base: 4, lg: 6 }}
    mx={{ base: 4, lg: 8 }}
    my={{ base: 4, lg: 12 }}
    {...props}
  />
);

const AdmonitionHeader = ({ children, ...props }) => (
  <Heading as="h3" fontWeight="bold" fontSize="md" {...props}>
    {title(children)}
  </Heading>
);

const AdmonitionIcon = ({ type, ...props }) => {
  const icon = iconMap[type];
  return <Icon as={icon} boxSize={[8, 8, 5, 5]} {...props} />;
};

const AdmonitionBody = ({ children, color, ...props }) => (
  <Box color={color} fontSize="sm" fontWeight="normal" {...props}>
    <Text>{children}</Text>
  </Box>
);

export const Admonition = ({
  title,
  message,
  children,
  type = 'note',
  hideIcon = false,
  ...props
}) => {
  if (message && !children) {
    children = message;
  }
  const bg = useColorValue(
    {
      important: 'blue.400',
      note: 'gray.100',
      tip: 'green.500',
      warning: 'yellow.400',
      critical: 'red.400',
    },
    {
      important: 'blue.300',
      note: 'gray.200',
      tip: 'green.300',
      warning: 'yellow.300',
      critical: 'red.300',
    },
  )[type];

  const color = useOpposingColor(bg);

  return (
    <AdmonitionContainer bg={bg} color={color} {...props}>
      <HStack isInline align="center" mb={4}>
        {!hideIcon && <AdmonitionIcon type={type} />}
        {title && <AdmonitionHeader>{title}</AdmonitionHeader>}
      </HStack>
      <Box fontSize="sm" fontWeight="normal">
        {children}
      </Box>
    </AdmonitionContainer>
  );
};
