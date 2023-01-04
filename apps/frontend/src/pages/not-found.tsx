import { styled } from '@events-components/theme';
import { Link } from 'react-router-dom';

const NotFoundPageContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80%',
  gap: '$8',
});
const Status = styled('div', {
  fontSize: '$48',
  lineHeight: '$52',
});
const NotFoundText = styled('div', {
  fontSize: '$28',
  lineHeight: '$32',
});

export const NotFoundPage = () => {
  return (
    <NotFoundPageContainer>
      <Status>404</Status>
      <NotFoundText>Page Not Found</NotFoundText>
      <Link to="/">Go To The Main Page</Link>
    </NotFoundPageContainer>
  );
};

export default NotFoundPage;
