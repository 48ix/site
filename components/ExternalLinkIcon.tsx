import dynamic from 'next/dynamic';
import { IconButton, Link } from '@chakra-ui/react';

import type { IconButtonProps } from '@chakra-ui/react';

const External = dynamic<MeronexIcon>(() =>
  import('@meronex/icons/fi').then(i => i.FiExternalLink),
);

interface ExternalLinkIconProps extends NoAria<IconButtonProps> {
  to: string;
}

export const ExternalLinkIcon: React.FC<ExternalLinkIconProps> = (props: ExternalLinkIconProps) => {
  const { to, ...rest } = props;
  const match = to.match(/https?:\/\/(www)?([A-Za-z0-9-\.]+).*/m) ?? ['', '', ''];
  const label = `Go to ${match[2].replace(/^\./, '')}`;
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
      {...rest}
    />
  );
};
