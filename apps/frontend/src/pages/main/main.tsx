import { styled } from '@events-components/theme';
import { fullProfileAtom } from '@/atoms/atoms';
import { useAtomValue } from 'jotai';

const Header = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'mixmax(0, 1fr) auto',
  alignItems: 'center',
});

export const MainPage = () => {
  // hack: derived atoms dont get populated without this
  useAtomValue(fullProfileAtom);

  return (
    <div>
      <Header>Haeder</Header>
      Content
    </div>
  );
};
