import type { StorybookConfig } from './types.js';

export * from './types.js';

export const webpack: StorybookConfig['webpack'] = (config) => {
  config.module?.rules?.[2].use.push({
    loader: 'ts-loader',
    options: {
      // makes sure to load only the files required by webpack and nothing more
      onlyCompileBundledFiles: true,
      // type checking is handled by `fork-ts-checker-webpack-plugin`
      transpileOnly: true,
      happyPackMode: true,
    },
  });

  return config;
};
