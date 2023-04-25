import { global } from '@storybook/global';

const { window: globalWindow } = global;

// @ts-expect-error somehow the typings.d.ts are not picked up here
globalWindow.STORYBOOK_ENV = 'HTML';
