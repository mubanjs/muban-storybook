// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../../package.json');

export default {
  packageJson,
  framework: 'muban',
  frameworkPath: '@muban/storybook',
  frameworkPresets: [require.resolve('./framework-preset-muban.js')],
};
