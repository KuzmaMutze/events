import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { Icon } from './../icons';
import {
  forwardRef,
  useMultiStyleConfig,
  ThemeTypings,
  createStylesContext,
} from '@chakra-ui/react';
import { Box } from '../box';
import { SiderButton } from './sider-button';
import { useSider } from './useSider';

export interface SiderProps {
  children?: Readonly<ReactNode>;
  openOnMouse?: boolean;
  closeOnMouse?: boolean;
  showToggleButton?: boolean;
  openDelay?: number;
  closeDelay?: number;
  permanent?: boolean;

  colorScheme?: ThemeTypings['colorSchemes'];
}

export const [StylesProvider, useStyles] = createStylesContext('Sider');

export const Sider = forwardRef<SiderProps, 'div'>((providedProps, ref) => {
  const { sider, props, styles, handlers } = useSiderLogic(providedProps);

  return (
    <Box __css={styles.wrapper} ref={ref}>
      <Box __css={styles.placeholder} data-testid="sider-placeholder"></Box>
      <Box
        __css={styles.container}
        ref={ref}
        {...providedProps}
        {...handlers}
        data-testid="sider"
      >
        <StylesProvider value={styles}>
          <SiderStateContext.Provider value={{ isOpen: sider.isOpen }}>
            {props.children}
          </SiderStateContext.Provider>
          {props.showToggleButton && (
            <SiderButton
              icon={<Icon icon="ArrowRight" __css={styles.arrowIcon} />}
              onClick={sider.onToggle}
              sx={styles.toggleButton}
            />
          )}
        </StylesProvider>
      </Box>
    </Box>
  );
});

export const defaultProps: Partial<SiderProps> = {
  openOnMouse: false,
  closeOnMouse: true,
  showToggleButton: true,
  permanent: false,
  colorScheme: 'secondary',
};

const useSiderLogic = (providedProps: SiderProps) => {
  const sider = useSider();
  const props = useMemo(
    () => ({
      ...defaultProps,
      ...providedProps,
      size: sider.isOpen ? 'open' : 'closed',
      variant:
        providedProps.permanent ?? defaultProps.permanent
          ? 'permanent'
          : 'default',
    }),
    [providedProps, sider]
  );
  const styles = useMultiStyleConfig('Sider', props);
  const onMouseEnter = useCallback(() => {
    if (props.closeOnMouse) {
      sider.stopCloseTimer();
    }
    if (props.openOnMouse) {
      sider.onOpen();
    }
  }, [sider.onOpen, props.openOnMouse]);
  const onMouseLeave = useCallback(() => {
    if (props.closeOnMouse) {
      sider.startCloseTimer();
    }
  }, [sider.startCloseTimer, props.closeOnMouse]);
  return {
    sider,
    props,
    styles,
    handlers: {
      onMouseEnter,
      onMouseLeave,
    },
  };
};

const SiderStateContext = createContext<{ isOpen: boolean } | undefined>(
  undefined
);

export const useSiderState = () => {
  const context = useContext(SiderStateContext);
  if (!context) {
    throw new Error('useSiderState must be within provider');
  }
  return context;
};
