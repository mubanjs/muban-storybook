/* eslint-disable @typescript-eslint/naming-convention */
declare module '@storybook/core/*';
declare module 'global';

// will be provided by the webpack define plugin
declare let NODE_ENV: string | undefined;
