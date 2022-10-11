import React, { ComponentType, PropsWithChildren } from 'react';
import { isNullOrUndef } from '@events/common';
import { Box, Button, Paragraph, useConfirm } from '@events/events-ui';
import {
  ErrorBoundary,
  ErrorBoundaryProps,
  FallbackProps,
  withErrorBoundary,
} from 'react-error-boundary';
import { fullProfileAtom } from '@/atoms/atoms';
import { useResetProfileToDefault } from '@ngi/react';

const DefaultChildren = () => {
  return (
    <>
      <Paragraph>An unknown error occurred.</Paragraph>
      <Paragraph>
        You can try to recover from the error, or reload the page
      </Paragraph>
    </>
  );
};

export interface CrashScreenProps {
  horizontal?: boolean;
  children?: React.ReactElement;
}

export const CrashScreen = (
  props?: CrashScreenProps
): ComponentType<FallbackProps> => {
  const { horizontal = false, children } = props ?? {};
  return ({ /* error, */ resetErrorBoundary }: FallbackProps) => {
    const resetProfile = useResetProfileToDefault(fullProfileAtom);
    const confirm = useConfirm();
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: horizontal ? 'row' : 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',

          width: 'full',
          height: horizontal ? 'max' : 'full',

          overflow: 'auto',
          flexShrink: 0,
          gap: 3,
        }}
      >
        {children ?? <DefaultChildren />}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyItems: 'center',
            gap: 3,
          }}
        >
          <Button colorScheme="blue" onClick={resetErrorBoundary}>
            Try to recover
          </Button>
          <Button
            variant="outline"
            colorScheme="blue"
            onClick={() => location.reload()}
          >
            Refresh page
          </Button>
          <Button
            variant="outline"
            colorScheme="orange"
            onClick={() =>
              confirm({
                title: 'Are you sure?',
                message: 'This action cannot be undone',
                onConfirm: async () => {
                  await resetProfile();
                  // NOTE: give some time to sync profile
                  setTimeout(() => {
                    location.reload();
                  }, 500);
                },
              })
            }
          >
            Reset Settings
          </Button>
        </Box>
      </Box>
    );
  };
};

const defaultCrashScreen = CrashScreen(); // Will only run once

export const CrashGuard = ({
  children,
  FallbackComponent = defaultCrashScreen,
  ...props
}: PropsWithChildren<Partial<ErrorBoundaryProps>>) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <ErrorBoundary FallbackComponent={FallbackComponent} {...props}>
    {children}
  </ErrorBoundary>
);

type ErrorBoundaryPropsWithoutFallback = Omit<
  ErrorBoundaryProps,
  'fallback' | 'fallbackRender' | 'FallbackComponent'
> & {
  fallback: never;
  fallbackRender: never;
  FallbackComponent: never;
};

function isErrorBoundaryPropsWithoutFallback(
  obj: ErrorBoundaryProps | ErrorBoundaryPropsWithoutFallback
): obj is ErrorBoundaryPropsWithoutFallback {
  return (
    isNullOrUndef(obj.FallbackComponent) &&
    isNullOrUndef(obj.fallback) &&
    isNullOrUndef(obj.fallbackRender)
  );
}

export function withCrashGuard<P>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: ErrorBoundaryProps | ErrorBoundaryPropsWithoutFallback
): React.ComponentType<P> {
  if (
    isNullOrUndef(errorBoundaryProps) ||
    isErrorBoundaryPropsWithoutFallback(errorBoundaryProps)
  )
    return withErrorBoundary(Component, {
      FallbackComponent: defaultCrashScreen,
      ...errorBoundaryProps,
    });
  return withErrorBoundary(Component, errorBoundaryProps);
}
