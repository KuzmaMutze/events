import React from 'react';
import { forwardRef, useMultiStyleConfig } from '@chakra-ui/react';
import { Box, BoxProps } from '../box';
import { Paragraph } from '../paragraph';
import { Spinner } from '../spinner';

export interface LoaderProps extends BoxProps {
  message?: string;
}

export const Loader = forwardRef<LoaderProps, 'div'>((props, ref) => {
  const { message, ...boxProps } = props;
  const styles = useMultiStyleConfig('Loader', { message });
  return (
    <Box __css={styles.container} ref={ref} {...boxProps}>
      <Spinner />
      {message && <Paragraph>{message}</Paragraph>}
    </Box>
  );
});
