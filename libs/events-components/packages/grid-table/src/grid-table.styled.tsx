import { VariantProps } from '@stitches/react';
import { css, styled } from '@events-components/theme';

export const table = css({
  borderCollapse: 'collapse',
  position: 'relative',
  variants: {
    fixed: {
      true: {
        tableLayout: 'fixed',
        width: '100%',
      },
    },
  },
});
export type TableVariants = VariantProps<typeof table>;

export const columns = css({
  fontWeight: '$semibold',
  textAlign: 'left',
  background: '$white',
  variants: {
    sticky: {
      true: {
        '& th': {
          top: 0,
          position: 'sticky',
          background: '$white',
        },
      },
    },
  },
});
export type ColumnsVariants = VariantProps<typeof columns>;

export const cell = css({
  height: '$sm',
  paddingRight: '$12',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  variants: {
    border: {
      true: {
        borderBottom: '1px solid',
        borderBottomColor: '$gray7',
      },
    },
    showEmptyIndicator: {
      true: {
        '&:empty::after': {
          content: '-',
          color: '$gray6',
        },
      },
    },
  },
  defaultVariants: {
    border: true,
    showEmptyIndicator: true,
  },
});
export type CellVariants = VariantProps<typeof cell>;

export const ResizerLine = styled('div', {
  width: '2px',
  display: 'none',
  backgroundColor: '$teal',
  height: '100%',
});

export const Resizer = styled('div', {
  position: 'absolute',
  width: '16px',
  right: 0,
  top: 0,
  bottom: 0,
  cursor: 'col-resize',
  display: 'flex',
  justifyContent: 'center',
  [`&[data-dragging=true] ${ResizerLine}`]: {
    display: 'block',
  },
});

export const Header = styled('div', {
  marginRight: '$16',
  width: '-webkit-fill-available',
  height: '100%',
  display: 'inline-grid',
  gridTemplateColumns: `1fr auto`,
  gap: '$4',
  alignItems: 'center',
  borderBottomWidth: '$lg',
  borderBottomStyle: 'solid',
  borderBottomColor: '$black',
});

export const HeaderText = styled('span', {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const ExpandButton = styled('button', {
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
});

export const column = css({
  height: '$sm',
  position: 'relative',
  variants: {
    clickable: {
      true: {
        cursor: 'pointer',
      },
    },
  },
});

export const emptyHeaderCell = css(column, {
  border: 'none',
});

export const Center = styled('div', {
  height: '100%',
  display: 'grid',
  placeItems: 'center',
});

export const NoDataContainer = styled(Center, {
  gap: '$8',
  color: '$black',
  fontSize: '$18',
  fontWeight: '$semibold',
});
