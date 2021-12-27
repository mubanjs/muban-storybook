// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-unresolved
const packageJson = require('../../../package.json');

export default {
  packageJson,
  framework: 'muban',
  frameworkPath: '@muban/storybook',
  frameworkPresets: [require.resolve('./framework-preset-muban.js')],
};
