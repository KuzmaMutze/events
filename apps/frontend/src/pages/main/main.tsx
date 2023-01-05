import { styled } from '@events-components/theme';
import { fullProfileAtom } from '@/atoms/atoms';
import { useAtomValue } from 'jotai';
import { Outlet } from 'react-router-dom';

const Content = styled('div', {
  height: '100%',
  display: 'grid',
  gridTemplateRows: 'auto minmax(0, 1fr)',
  gap: '$32',
});

const Header = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  alignItems: 'center',
});

export const MainPage = () => {
  // hack: derived atoms dont get populated without this
  useAtomValue(fullProfileAtom);

  return (
    <>
      <Content>
        <Header>
          <div>123</div>
          <div>Haeder</div>
        </Header>
        Content
      </Content>
      <Outlet />
    </>
  );
};
