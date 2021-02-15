import * as React from 'react';
import { ComponentLink } from '~components';
import { useColorValue } from '~context';
import { useActiveHash } from '~hooks';

import type { HeadingProps, HeadingsProps } from './types';

const Heading: React.FC<HeadingProps> = (props: HeadingProps) => {
  const { children, isChild, isActive, ...rest } = props;
  const activeColor = useColorValue('blue.500', 'teal.300');
  const inactiveColor = useColorValue('gray.700', 'whiteAlpha.700');
  return (
    <ComponentLink
      side="right"
      href={`#${children.id}`}
      ml={isChild ? 2 : undefined}
      fontWeight={isActive ? 'medium' : undefined}
      color={isActive ? activeColor : inactiveColor}
      {...rest}>
      {children.value}
    </ComponentLink>
  );
};

export const Headings: React.FC<HeadingsProps> = (props: HeadingsProps) => {
  const { headings, isChild, ids, ...rest } = props;
  const activeHash = useActiveHash(ids);
  if (headings.length === 0) {
    return null;
  }
  return (
    <>
      {headings.map(heading => (
        <React.Fragment key={`${heading.id}-group`}>
          <Heading
            isChild={isChild}
            key={`${heading.id}-parent`}
            isActive={activeHash === heading.id}
            {...rest}>
            {heading}
          </Heading>
          <Headings key={`${heading.id}-child`} ids={ids} isChild headings={heading.children} />
        </React.Fragment>
      ))}
    </>
  );
};
