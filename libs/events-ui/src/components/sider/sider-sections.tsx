import React from 'react';
import { ChildrenProps } from '@/utils/typeUtils';
import { Box } from '../box';
import { useStyles } from './sider';

export const SiderTopSection = ({ children }: ChildrenProps) => (
  <Box __css={useStyles().section} gridArea="top">
    {children}
  </Box>
);

export const SiderBottomSection = ({ children }: ChildrenProps) => (
  <Box __css={useStyles().section} gridArea="bottom">
    {children}
  </Box>
);
