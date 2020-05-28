import * as React from 'react';
import dynamic from 'next/dynamic';
import { Box, Heading, Icon, Stack, Text, useColorMode, useTheme } from '@chakra-ui/core';
import { opposingColor, title } from '../util';

const IoIosThumbsUp = dynamic(() => import('react-icons/io').then(i => i.IoIosThumbsUp));
const AiOutlineInfoCircle = dynamic(() =>
  import('react-icons/ai').then(i => i.AiOutlineInfoCircle),
);
const GoNote = dynamic(() => import('react-icons/go').then(i => i.GoNote));

const iconMap = {
  important: AiOutlineInfoCircle,
  note: GoNote,
  tip: IoIosThumbsUp,
  warning: 'warning-2',
  critical: 'not-allowed',
};
const bgMap = {
  dark: {
    important: 'blue.300',
    note: 'gray.200',
    tip: 'green.300',
    warning: 'yellow.300',
    critical: 'red.300',
  },
  light: {
    important: 'blue.400',
    note: 'gray.100',
    tip: 'green.500',
    warning: 'yellow.400',
    critical: 'red.400',
  },
};

const AdmonitionContainer = ({ type, bg, ...props }) => (
  <Box
    borderRadius="md"
    p={[4, 4, 6, 6]}
    mx={[4, 4, 8, 8]}
    my={8}
    backgroundColor={bg}
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
  const iconProps = { size: [8, 8, 5, 5], display: 'inline' };
  let Component = props => <Icon name={icon} {...iconProps} {...props} />;
  if (typeof icon !== 'string') {
    Component = props => <Box as={icon} {...iconProps} {...props} />;
  }
  return <Component {...props} />;
};

const AdmonitionBody = ({ children, color, ...props }) => (
  <Box {...props}>
    <Text fontSize="sm" fontWeight="normal" color={color}>
      {children}
    </Text>
  </Box>
);

const Admonition = ({ title, message, children, type = 'note', hideIcon = false, ...props }) => {
  if (message && !children) {
    children = message;
  }
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const background = bgMap[colorMode][type];
  const color = opposingColor(theme, background);

  return (
    <AdmonitionContainer type={type} bg={background} {...props}>
      <Stack isInline align="center" mb={4}>
        {!hideIcon && <AdmonitionIcon type={type} color={color} />} */}
        {title && <AdmonitionHeader color={color}>{title}</AdmonitionHeader>}
      </Stack>
      <AdmonitionBody color={color}>{children}</AdmonitionBody>
    </AdmonitionContainer>
  );
};

Admonition.displayName = 'Admonition';

export default Admonition;
