import React from 'react';
import * as icons from '@heroicons/react/outline';
import { Icon } from '@chakra-ui/react';
import type { IconProps } from './icon';

const LazyIcon = (props: IconProps) => {
  const { icon, ...iconProps } = props;

  const iconComponent = icons[`${icon}Icon`];

  return <Icon as={iconComponent} width="1rem" height="1rem" {...iconProps} />;
};

export default LazyIcon;
