const configuration = {
  stories: ['../packages/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: '@storybook/builder-vite',
  },
  framework: '@storybook/react',
  docs: {
    docsPage: 'automatic',
  },
};

const nodeMajorVersion = Number(process.version.mode.split('.')[0]);
// The fields added to features speed up the loading of the application,
// but they only work for Node that has a major version less than 17. Explanation of why:
// 1. Empirically, it was found that when we add the features field (with any keys, even just an empty object), the `core.build` to webpack is forcibly switched
// 2. Some libs in @storybook space are using webpack 4.* version.
// 2.1. That version failed build with node version 17+.
// See bug here and a developer answer here: https://github.com/webpack/webpack/issues/14532#issuecomment-947513562
// So if you want to speed up your storybook building during development you should use Node that version is less than 17. (16.16.0 for example)
if (nodeMajorVersion < 17) {
  configuration.features = {
    storyStoreV7: true,
    buildStoriesJson: true,
    modernInlineRender: true,
  };
}

module.exports = configuration;
