import React, { ReactNode } from 'react';
import { forwardRef } from '@chakra-ui/react';
import { Box, BoxProps } from '../box';
import { useStyles } from './sider';

export interface SiderTitleProps extends BoxProps {
  showLogo?: boolean;
  longTitle?: ReactNode;
  shortTitle?: ReactNode;
}

export const SiderTitle = forwardRef<SiderTitleProps, 'div'>((props, ref) => {
  const { showLogo = true, longTitle, shortTitle, ...boxProps } = props;

  const styles = useStyles();

  return (
    <Box {...boxProps} __css={styles.titleContainer} ref={ref}>
      {showLogo && <Box __css={styles.logo} />}
      <Box __css={styles.perspectiveContainer}>
        <Box __css={styles.longTitleContainer}>{longTitle}</Box>
        <Box __css={styles.shortTitleContainer}>{shortTitle}</Box>
      </Box>
    </Box>
  );
});
