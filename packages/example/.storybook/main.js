module.exports = {
  // core: {
  //   builder: {
  //     name: '@storybook/builder-webpack5',
  //     options: {
  //       fsCache: true,
  //       lazyCompilation: true,
  //     },
  //   },
  // },
  framework: '@muban/storybook-framework-webpack',
  stories: [
    {
      directory: '../src/',
      files: '**/*.stories.@(js|jsx|ts|tsx)',
      titlePrefix: '',
    },
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials' /*, '@storybook/addon-postcss'*/,
  ],
  // staticDirs: ['../public'],
};
