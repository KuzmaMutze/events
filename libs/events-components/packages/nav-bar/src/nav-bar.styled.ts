import { ComponentProps, css } from '@stitches/react';
import { styled } from '@events-components/theme';
import { bottomSection } from './nav-bar-bottom-section.styled';
import { ButtonIcon, ButtonText, Button } from './nav-bar-button.styled';
import { ExpandButton, Logo, Title } from './nav-bar-header.styled';
import { topSection } from './nav-bar-top-section.styled';

// TODO: use aria-expanded
export const navBar = css({
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  backgroundColor: 'transparent',
  height: '100vh',
  borderRightStyle: 'solid',
  borderRightWidth: '$sm',
  borderRightColor: '$gray8',
  variants: {
    expanded: {
      false: {
        padding: '$20 $24',
        width: '64px',
        [`& ${Title}`]: {
          display: 'none',
        },
        [`& ${Logo}`]: {
          display: 'none',
        },
        [`& ${ButtonIcon}`]: {
          color: '$gray5',
        },
        [`& ${ButtonText}`]: {
          display: 'none',
        },
        [`& ${Button}`]: {
          justifyContent: 'center',
        },
        [`& .${bottomSection}`]: {
          flexDirection: 'column',
        },
        [`& .${topSection}`]: {
          border: 'none',
        },
        [`& ${ExpandButton}`]: {
          transform: 'rotate(180deg)',
        },
      },
      true: {
        width: '244px',
        padding: '$40 $32 $24',
        [`& ${ExpandButton}`]: {
          position: 'absolute',
          right: 0,
          top: 0,
        },
      },
    },
  },
});
