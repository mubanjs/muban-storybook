/* eslint-disable prefer-destructuring,unicorn/filename-case,camelcase */
import { start } from '@storybook/preview-api';
import type { Addon_ClientStoryApi, Addon_Loadable } from '@storybook/types';
import { renderToCanvas, render } from './render.js';
import type { MubanRenderer } from './types.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
const RENDERER = 'html';

interface ClientApi extends Addon_ClientStoryApi<MubanRenderer['storyResult']> {
  // eslint-disable-next-line unicorn/prefer-module
  configure(loader: Addon_Loadable, module: NodeModule): void;
  forceReRender(): void;
  // todo add type
  raw(): any;
}

const api = start<MubanRenderer>(renderToCanvas, { render });

export const storiesOf: ClientApi['storiesOf'] = (kind, m) =>
  (api.clientApi.storiesOf(kind, m) as ReturnType<ClientApi['storiesOf']>).addParameters({
    renderer: RENDERER,
  });

export const configure: ClientApi['configure'] = (...args) => api.configure(RENDERER, ...args);
export const forceReRender: ClientApi['forceReRender'] = api.forceReRender;
export const raw: ClientApi['raw'] = api.clientApi.raw;
