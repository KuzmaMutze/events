import React, { ReactElement } from 'react';
import { forwardRef } from '@chakra-ui/react';
import { Box } from '../box';
import { Button, ButtonProps } from '../button';
import { Tooltip } from '../tooltip';
import { useStyles } from './sider';

export interface SiderButtonProps extends ButtonProps {
  icon: ReactElement;
  href?: string;
}

export const SiderButton = forwardRef<SiderButtonProps, 'button'>(
  ({ icon, ...props }, ref) => {
    const { button, buttonContent } = useStyles();

    return (
      <Tooltip label={props.children} placement="right" openDelay={500}>
        <Button
          ref={ref}
          isLoading={props.isLoading}
          loadingText={props.loadingText}
          leftIcon={icon}
          onClick={props.onClick}
          {...props}
          sx={{ ...button, ...props.sx }}
        >
          <Box __css={buttonContent}>{props.children}</Box>
        </Button>
      </Tooltip>
    );
  }
);
