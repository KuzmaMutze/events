import type { ComponentMultiStyleConfig } from '@chakra-ui/react';
import {
  anatomy,
  PartsStyleFunction,
  StyleFunctionProps,
  transparentize,
} from '@chakra-ui/theme-tools';
import { LoaderProps } from './loader';
import { LoaderOverlayProps } from './loader-overlay';

export const loaderAnatomy = anatomy('loader')
  .parts('container', 'spinner', 'text')
  .extend('box');

const LoaderBaseStyle: PartsStyleFunction<typeof loaderAnatomy> = ({
  message: _message,
}: StyleFunctionProps & LoaderProps) => ({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    display: 'flex',
  },
  spinner: {},
  text: {},
});

export const Loader: ComponentMultiStyleConfig = {
  parts: ['container', 'spinner', 'text'],
  baseStyle: LoaderBaseStyle,
};

export const loaderOverlayAnatomy = anatomy('loaderOverlay')
  .parts('container')
  .extend('loader');

const loaderOverlayBaseStyle: PartsStyleFunction<
  typeof loaderOverlayAnatomy
> = ({ isLoading, theme }: StyleFunctionProps & LoaderOverlayProps) => ({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    w: 'full',
    h: 'full',
    bg: transparentize('#666666', 0.5)(theme),
    transitionProperty: 'opacity',
    transitionDuration: 'faster',
    transitionTimingFunction: 'linear',
    '&': {
      opacity: isLoading ? 1 : 0,
    },
  },
});

export const LoaderOverlay: ComponentMultiStyleConfig = {
  parts: ['container', 'loader'],
  baseStyle: loaderOverlayBaseStyle,
};
