/* eslint-disable no-param-reassign */
import { type App, createApp } from '@muban/muban';
import type { RenderContext, ArgsStoryFn } from '@storybook/types';
import { renderClientTemplate } from './render/renderClientTemplate.js';
import { renderServerTemplate } from './render/renderServerTemplate.js';
import { applyActionArgs } from './render/utils/applyActionArgs.js';
import { validateServerConfig } from './render/utils/validateServerConfig.js';
import type { MubanRenderer } from './types.js';
import { parseServerConfig } from './utils/parseServerConfig.js';

// Unsure what's done here, how it's used, when it's called
export const render: ArgsStoryFn<MubanRenderer> = (args, context) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { id, component: Component } = context;
  if (!Component) {
    throw new Error(
      `Unable to render story ${id} as the component annotation is missing from the default export`,
    );
  }

  if (typeof Component === 'function') {
    return Component(args, context);
  }

  return Component;
};

export async function renderToCanvas(
  options: RenderContext<MubanRenderer>,
  canvasElement: MubanRenderer['canvasElement'],
): Promise<void> {
  const {
    storyFn,
    showMain,
    storyContext,
    storyContext: { args, argTypes, globals },
  } = options;

  const componentStory = storyFn(args as any);
  const data = (componentStory.data ?? args) || {};
  showMain();

  // eslint-disable-next-line no-param-reassign
  (canvasElement as HTMLElement).textContent = '';
  const container = document.createElement('div');
  canvasElement.append(container);

  const { renderMode, serverConfig } = parseServerConfig(globals);
  if (renderMode === 'server' && !validateServerConfig(options)) {
    return;
  }
  const shouldRenderOnServer =
    renderMode === 'server' ||
    (!renderMode &&
      storyContext.parameters['server']?.url &&
      storyContext.parameters['server']?.id &&
      !storyContext.parameters['server']?.disabled);

  let app: App | undefined;
  if (componentStory.component) {
    app = createApp(componentStory.component);
    app.component(...(componentStory.appComponents ?? []));
  }
  const componentInstance: any = shouldRenderOnServer
    ? await renderServerTemplate(app, container, componentStory, data, { serverConfig, options })
    : renderClientTemplate(app, container, componentStory, data, { argTypes });

  applyActionArgs(componentInstance, argTypes, args);
}
