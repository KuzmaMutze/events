import React from 'react';
import { forwardRef, useMultiStyleConfig } from '@chakra-ui/react';
import { Box } from '../box';
import { Loader, LoaderProps } from './loader';

export interface LoaderOverlayProps extends LoaderProps {
  isLoading?: boolean;
  useContainer?: boolean;
}

export const LoaderOverlay = forwardRef<LoaderOverlayProps, 'div'>(
  (props, ref) => {
    const { isLoading, children, useContainer, ...loaderProps } = props;
    const styles = useMultiStyleConfig('LoaderOverlay', { isLoading });
    const loader = (
      <>
        {children}
        {isLoading && <Loader ref={ref} sx={styles.loader} {...loaderProps} />}
      </>
    );

    if (useContainer) return <Box sx={styles.container}>{loader}</Box>;
    else return loader;
  }
);
