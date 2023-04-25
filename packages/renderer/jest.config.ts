/* eslint-disable @typescript-eslint/naming-convention */
import type { Config } from 'jest';

const config: Config = {
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)s?$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
};

// used to prevent this error:
// Error: Jest: Failed to parse the TypeScript config file
// .../muban-storybook/packages/renderer/jest.config.ts
// TSError: ⨯ Unable to compile TypeScript:
//   jest.config.ts:26:1 - error TS1286: ESM syntax is not allowed in a CommonJS module
//   when 'verbatimModuleSyntax' is enabled.
// eslint-disable-next-line unicorn/prefer-module
module.exports = config;
