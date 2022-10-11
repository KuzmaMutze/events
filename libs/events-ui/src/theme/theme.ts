import {
  extendTheme as defaultExtendTheme,
  isChakraTheme,
  Theme,
  ThemeOverride,
  useTheme as useThemeHook,
} from '@chakra-ui/react';
import { Dict } from '@chakra-ui/utils';

export const useTheme = () => useThemeHook<Theme>();

// HACK: https://github.com/chakra-ui/chakra-ui/issues/4913
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const theme: any = defaultExtendTheme({} as ThemeOverride<Theme>);

export const extendTheme: typeof defaultExtendTheme = (
  ...extensions: (Dict<unknown> | ((theme: Dict<unknown>) => Dict<unknown>))[]
) => {
  let overrides = [...extensions];
  let baseTheme = extensions[extensions.length - 1];

  if (
    isChakraTheme(baseTheme) &&
    // this ensures backward compatibility
    // previously only `extendTheme(override, baseTheme?)` was allowed
    overrides.length > 1
  ) {
    overrides = overrides.slice(0, overrides.length - 1);
  } else {
    baseTheme = theme;
  }

  return defaultExtendTheme(...overrides, baseTheme);
};
