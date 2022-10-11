import React from 'react';
import {
  Tooltip as ChakraTooltip,
  TooltipProps as ChakraTooltipProps,
} from '@chakra-ui/react';

export type TooltipProps = ChakraTooltipProps;

export const Tooltip = ({ openDelay = 200, ...props }: TooltipProps) => {
  return <ChakraTooltip openDelay={openDelay} {...props} />;
};
