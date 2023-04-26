import type { StorybookConfig } from '@muban/storybook-framework-webpack';

export default {
  framework: '@muban/storybook-framework-webpack',
  stories: [
    {
      directory: '../src/',
      files: '**/*.stories.@(js|jsx|ts|tsx)',
      titlePrefix: '',
    },
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
} satisfies StorybookConfig;
