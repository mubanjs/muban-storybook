/* eslint-disable @typescript-eslint/no-explicit-any,unicorn/filename-case */

// import type { Configuration } from 'webpack';

// Add default webpack config for all muban storybook installations
// export function webpack(webpackConfig: Configuration): Configuration {
//   return {
//     ...webpackConfig,
//     module: {
//       ...webpackConfig.module,
//       rules: [
//         ...(webpackConfig.module?.rules || []),
//       ],
//     },
//   };
// }

export function config(entry = []): Array<any> {
  return [...entry, require.resolve('./defaultParameters')];
}
