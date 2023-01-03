import { Box, Flex, Switch } from 'events-components';
import { themeAtom, toggleThemeAtom } from '@/atoms/atoms';
import { useAtomValue, useSetAtom } from 'jotai';

export const ColorModeSelector = () => {
  const colorMode = useAtomValue(themeAtom);
  const toggleColorMode = useSetAtom(toggleThemeAtom);

  return (
    <Flex>
      <Box mr="2">Dark Mode:</Box>
      <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
    </Flex>
  );
};
