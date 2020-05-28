import * as React from 'react';
import { IconButton, Link } from '@chakra-ui/core';

const ExternalLinkIcon = ({ to, ...props }) => {
  const label = `Go to ${to.match(/https?:\/\/(www)?([A-Za-z0-9-\.]+).*/m)[2].replace(/^\./, '')}`;
  return (
    <IconButton
      href={to}
      as={Link}
      variant="ghost"
      target="_blank"
      icon="external-link"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      {...props}
    />
  );
};

ExternalLinkIcon.displayName = 'ExternalLinkIcon';
export default ExternalLinkIcon;
