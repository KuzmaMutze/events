import { useEffect } from 'react';
import { globalStyles } from '../packages/theme/dist';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)&/i,
      date: /Date&/,
    },
  },
  layout: 'fullscreen',
};

// export const globalTypes = {
//   locale: {
//     name: 'Locale',
//     description: 'Locale to use for components',
//     defaultValue: 'en-US',
//     toolbar: {
//       icon: 'globe',
//       items: Object.keys(locales).map((lng) => ({
//         value: lng,
//         title: lng,
//       })),
//     },
//   },
// };

export const decorators = [
  (Story) => {
    useEffect(() => {
      globalStyles();
    }, []);
    return <Story />;
  },
  (Story, { globals: { locale } }) => {
    return (
      // <LocalizationProvider local={local}>
      <Story />
      // </LocalizationProvider>
    );
  },
];
