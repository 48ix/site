import dynamic from 'next/dynamic';
import { IconButton, Link } from '@chakra-ui/react';

const External = dynamic(() => import('@meronex/icons/fi').then(i => i.FiExternalLink));

export const ExternalLinkIcon = ({ to, ...props }) => {
  const label = `Go to ${to.match(/https?:\/\/(www)?([A-Za-z0-9-\.]+).*/m)[2].replace(/^\./, '')}`;
  return (
    <IconButton
      href={to}
      as={Link}
      title={label}
      variant="ghost"
      target="_blank"
      aria-label={label}
      icon={<External />}
      rel="noopener noreferrer"
      {...props}
    />
  );
};
