import { styled } from '@events-components/react';
import { ButtonsGroup } from './components/buttons-group';
import { ColorModeSelector } from './components/color-mode-selector';

const SettingsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$16',
});

export const SettingsPage = () => {
  return (
    <SettingsContainer>
      <h1>Settings</h1>
      <ColorModeSelector />
      <ButtonsGroup />
    </SettingsContainer>
  );
};
