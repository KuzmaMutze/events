import { PropsWithChildren } from 'react';
import { Loader } from '@events-components/loader';
import { ModalContent } from '@events-components/modal';
import { styled } from '@events-components/theme';

export const StyledModalContent = styled(ModalContent, {
  width: '1024px',
  columnGap: 0,
});

export const EditorControls = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  gap: '12px',
  marginTop: '24px',
});

export const LoaderOverlay = ({ showLoader }: { showLoader: boolean }) => {
  return (
    <StyledLoaderOverlay showLoader={showLoader}>
      {showLoader && <Loader size="lg" />}
    </StyledLoaderOverlay>
  );
};

export const StyledLoaderOverlay = styled('div', {
  variants: {
    showLoader: {
      true: {
        zIndex: 2,
        background: '$white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        position: 'fixed',
      },

      false: {
        display: 'none',
      },
    },
  },
});

export const Textarea = styled('textarea', {
  resize: 'vertical',
  borderRadius: '$md',
  borderColor: '$gray7',
  padding: '$8',

  ['&:hover']: {
    borderColor: '$gray6',
  },

  ['&:focus-visible']: {
    outline: 'none',
  },
});

export const Form = styled('form', {
  padding: '$12',
  display: 'grid',
  gap: '20px',
  variants: {
    canAccess: {
      true: {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
      false: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
    },
  },
});

export const FormColumn = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const LoadingField = ({
  isLoading,
  children,
}: PropsWithChildren<{ isLoading: boolean }>) => {
  <LoadingFieldBody isLoading={isLoading}>
    {isLoading ? <Loader size="sm" /> : children}
  </LoadingFieldBody>;
};

export const LoadingFieldBody = styled('div', {
  display: 'flex',
  justifyContent: 'center',

  variants: {
    isLoading: {
      true: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '40px',
      },

      false: {},
    },
  },
});
