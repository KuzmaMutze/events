import { Button } from '@events-components/button';
import { styled } from '@events-components/theme';

export interface ErrorScreenProps {
  title: string;
  message?: string;
  retry?: () => void;
}

const ErrorScreenContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

const ErrorRow = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$12',
});

export const ErrorScreen = (props: ErrorScreenProps) => {
  const { title, message, retry } = props;

  return (
    <ErrorScreenContainer>
      <ErrorRow>
        <h3>Error</h3>
        <h5>{title}</h5>
        {message && <p>{message}</p>}
        {retry && (
          <Button onClick={retry} size="sm">
            Retry
          </Button>
        )}
      </ErrorRow>
    </ErrorScreenContainer>
  );
};
