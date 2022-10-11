import type { ComponentMultiStyleConfig } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/theme-tools';
import type { SiderProps } from './sider';

export const Sider: ComponentMultiStyleConfig = {
  parts: [
    'wrapper',
    'placeholder',
    'container',
    'button',
    'buttonIcon',
    'buttonContent',
    'logo',
    'titleContainer',
    'perspectiveContainer',
    'longTitleContainer',
    'shortTitleContainer',
    'arrowIcon',
    'section',
    'menuContent',
    'toggleButton',
  ],
  baseStyle: (_props: StyleFunctionProps) => {
    const props = _props as StyleFunctionProps & SiderProps;

    return {
      styleProps: props,
      wrapper: {
        height: '100%',
        overflow: 'hidden',
        flexGrow: 0,
        flexShrink: 0,
      },
      placeholder: {},
      container: {
        height: '100%',
        overflow: 'hidden',

        background: `${props.colorScheme}.500`,
        boxShadow: 'sider',
        color: 'white',

        transitionProperty:
          'var(--transition-property-common),var(--transition-property-dimensions)',
        transitionDuration: 'normal',

        display: 'grid',
        gridTemplateAreas: `
          "title"
          "top"
          "."
          "bottom"
          "toggle"
        `,
        gridAutoColumns: 'auto',
        gridTemplateRows: 'auto auto 1fr auto auto',
        flexShrink: 0,
        flexGrow: 0,

        position: 'relative',
        zIndex: 'docked',
      },
      button: {
        background: 'transparent',
        color: 'white',
        fontSize: 'lg',
        justifyContent: 'flex-start',
        whiteSpace: 'nowrap',
        fontWeight: 'normal',
        overflow: 'hidden',
        width: '100%',

        _hover: {
          background: `${props.colorScheme}.400`,
        },
        _active: {
          background: `${props.colorScheme}.300`,
        },
      },
      buttonIcon: {
        width: 'siderClosed',
        flexGrow: 0,
        flexShrink: 0,
        textAlign: 'right',
      },
      buttonContent: {
        transitionProperty: 'common',
        transitionDuration: 'normal',
      },
      Logo: {
        transitionProperty: 'all',
        transitionDuration: 'normal',
        paddingX: 5,
        alignSelf: 'center',
      },
      titleContainer: {
        gridArea: 'title',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        textAlign: 'center',
      },
      perspectiveContainer: {
        minHeight: '1.7em',
        transitionProperty: 'all',
        transitionDuration: 'normal',
        overflow: 'hidden',
      },
      longTitleContainer: {
        width: 'siderOpen',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        color: 'primary.500',
        fontSize: 'lg',
        fontWeight: 'bold',

        overflow: 'hidden',
      },
      shortTitleContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        color: 'primary.500',
        fontSize: 'lg',
        fontWeight: 'bold',

        overflow: 'hidden',
      },
      arrowIcon: {
        transitionProperty: 'transform',
        transitionDuration: 'normal',
      },
      section: {
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
      },
      menuContent: {
        padding: 2,
      },
      toggleButton: {
        gridArea: 'toggle',
      },
    };
  },
  variants: {
    default: {
      placeholder: {
        width: 'siderClosed',
        flexShrink: 0,
      },
      container: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: 'full',
      },
    },
    permanent: {
      placeholder: {
        display: 'none',
      },
      container: {
        flexShrink: 0,
      },
    },
  },
  sizes: {
    closed: {
      container: {
        transitionDelay: 'var(--transition-duration-normal)',
        width: 'siderClosed',
      },
      button: {},
      buttonContent: {
        opacity: 0,
      },
      Logo: {
        maxWidth: 0,
      },
      perspectiveContainer: {
        width: 'siderClosed',
      },
      longTitleContainer: {
        // transform: 'scaleY(0)',
        maxHeight: 0,
        transform: 'translateY(-5em)',
      },
      shortTitleContainer: {
        maxHeight: '10em',
        transform: 'translate(0)',
      },
    },
    open: {
      container: {
        width: 'siderOpen',
      },
      buttonContent: {
        opacity: 1,
      },
      Logo: {
        transitionDelay: '100ms',
        paddingX: 4,
        paddingTop: 4,
        margin: 'auto',
        maxWidth: '100%',
      },
      arrowIcon: {
        transform: 'rotate(180deg)',
      },
      perspectiveContainer: {
        width: 'siderOpen',
      },
      longTitleContainer: {
        transitionDelay: 'var(--transition-duration-slower)',
        transitionProperty: 'all',
        transitionDuration: 'fast',
        maxHeight: '10em',
        transform: 'translate(0)',
      },
      shortTitleContainer: {
        transitionDelay: 'var(--transition-duration-normal)',
        maxHeight: 0,
        transitionProperty: 'all',
        transitionDuration: 'fast',
        transform: 'translateY(-1em)',
      },
    },
  },
};
