/* eslint-disable prefer-destructuring,@typescript-eslint/no-explicit-any,unicorn/prevent-abbreviations */
import type { ClientStoryApi, Loadable } from '@storybook/addons';
import { start } from '@storybook/core/client';
import './globals';
import { render, renderToDom } from './render';
import type { StoryFnMubanReturnType, IStorybookSection } from './types';

const framework = 'muban';

interface ClientApi extends ClientStoryApi<StoryFnMubanReturnType> {
  setAddon(addon: any): void;
  // eslint-disable-next-line unicorn/prefer-module
  configure(loader: Loadable, module: NodeModule): void;
  getStorybook(): Array<IStorybookSection>;
  clearDecorators(): void;
  forceReRender(): void;
  // todo add type
  raw(): any;
}

const api = start(renderToDom, { render });

export const storiesOf: ClientApi['storiesOf'] = (kind, m) =>
  (api.clientApi.storiesOf(kind, m) as ReturnType<ClientApi['storiesOf']>).addParameters({
    framework,
  });

export const configure: ClientApi['configure'] = (...args) => {
  api.configure(framework, ...args);
};
export const addDecorator = api.clientApi.addDecorator as ClientApi['addDecorator'];
export const addParameters = api.clientApi.addParameters as ClientApi['addParameters'];
export const clearDecorators: ClientApi['clearDecorators'] = api.clientApi.clearDecorators;
export const setAddon: ClientApi['setAddon'] = api.clientApi.setAddon;
export const forceReRender: ClientApi['forceReRender'] = api.forceReRender;
export const getStorybook: ClientApi['getStorybook'] = api.clientApi.getStorybook;
export const raw: ClientApi['raw'] = api.clientApi.raw;
