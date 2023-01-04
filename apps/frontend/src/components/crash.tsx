import React, { ComponentType, PropsWithChildren } from 'react';
import { fullProfileAtom } from '@/atoms/atoms';
import { Button } from '@events-components/button';
import { Group } from '@events-components/group';
import { styled } from '@events-components/theme';
import { useConfirm } from '@events-components/use-confirm';
import { isNullOrUndef } from '@events/common';
import { useResetProfileToDefault } from '@ngi/react';
import {
  ErrorBoundary,
  ErrorBoundaryProps,
  FallbackProps,
  withErrorBoundary,
} from 'react-error-boundary';

const DefaultChildren = () => {
  return (
    <>
      <h3>An Unknown Error Occurred.</h3>
      <h6>You Сan Try To Recover From The Error, Or Reload The Page</h6>
    </>
  );
};

const CrashScreenContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  height: '100vh',
  flexShrink: 0,
  gap: '$24',
});

export interface CrashScreenProps {
  horizontal?: boolean;
  children?: React.ReactElement;
}

export const CrashScreen = (
  props?: CrashScreenProps
): ComponentType<FallbackProps> => {
  const { children } = props ?? {};
  return ({ /* error, */ resetErrorBoundary }: FallbackProps) => {
    const resetProfile = useResetProfileToDefault(fullProfileAtom);
    const confirm = useConfirm();
    return (
      <CrashScreenContainer>
        {children ?? <DefaultChildren />}
        <Group>
          <Button colorScheme="white" onClick={resetErrorBoundary}>
            Try to recover
          </Button>
          <Button colorScheme="blue" onClick={() => location.reload()}>
            Refresh page
          </Button>
          <Button
            colorScheme="red"
            onClick={() =>
              confirm({
                title: 'Are You Sure?',
                description: 'This Action Cannot Be Undone',
                onConfirm: async () => {
                  await resetProfile();
                  // NOTE: give some time to sync profile
                  setTimeout(() => {
                    location.reload();
                  }, 500);
                },
                confirmButtonText: 'Submit',
                cancelButtonText: 'Cancle',
              })
            }
          >
            Reset Settings
          </Button>
        </Group>
      </CrashScreenContainer>
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
