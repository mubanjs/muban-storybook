import type { PresetProperty } from '@storybook/types';
import type { StorybookConfig } from './types.js';

export const addons: PresetProperty<'addons', StorybookConfig> = [
  '@muban/storybook-preset-webpack',
];

export const core: PresetProperty<'core', StorybookConfig> = async (config, options) => {
  const framework = await options.presets.apply<StorybookConfig['framework']>('framework');

  return {
    ...config,
    builder: {
      name: '@storybook/builder-webpack5',
      options: typeof framework === 'string' ? {} : framework.options.builder || {},
    },
    renderer: '@muban/storybook',
  };
};
