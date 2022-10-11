import { Heading, Flex } from '@events/events-ui';
import { ButtonsGroup } from './components/buttons-group';
import { ColorModeSelector } from './components/color-mode-selector';

export const SettingsPage = () => {
  return (
    <Flex>
      <Heading paddingBottom="5">Settings</Heading>
      <ColorModeSelector />
      <ButtonsGroup />
    </Flex>
  );
};
