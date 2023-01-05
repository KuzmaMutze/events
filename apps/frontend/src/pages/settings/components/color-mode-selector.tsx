import { themeAtom, toggleThemeAtom } from '@/atoms/atoms';
import { Switch } from '@events-components/switch';
import { styled } from '@events-components/theme';
import { useAtomValue, useSetAtom } from 'jotai';

const ColorMode = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$8',
  paddingTop: '$8',
});

export const ColorModeSelector = () => {
  const colorMode = useAtomValue(themeAtom);
  const toggleColorMode = useSetAtom(toggleThemeAtom);

  return (
    <ColorMode>
      <h5>Dark Mode:</h5>
      <Switch checked={colorMode === 'dark'} onChange={toggleColorMode} />
    </ColorMode>
  );
};
