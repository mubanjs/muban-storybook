/* eslint-disable no-restricted-properties,@typescript-eslint/no-explicit-any,unicorn/prevent-abbreviations,@typescript-eslint/naming-convention */
import { createApp } from '@muban/muban';
import type { App } from '@muban/muban';
import type { Args, ArgsStoryFn, StrictArgTypes } from '@storybook/csf';
import { document } from 'global';
import { fetchStoryHtmlUsingGetJson } from '../fetch/fetchGetJson';
import type { RenderContext, StoryFnMubanReturnType } from './types';
import type { MubanFramework } from './types-6-0';
import { getInjectedServerTemplate } from './utils/getInjectedServerTemplate';
import { getClientTemplateArgs, getServerTemplateArgs } from './utils/getTemplateArgs';
import { parseServerConfig } from './utils/parseServerConfig';

export const render: ArgsStoryFn<MubanFramework> = (props, context) => {
  const { id, component: Component } = context;
  if (!Component) {
    throw new Error(
      `Unable to render story ${id} as the component annotation is missing from the default export`,
    );
  }

  return {
    component: Component,
    template: () => '',
  };
};

export async function renderToDom(
  options: RenderContext<MubanFramework>,
  domElement: Element,
): Promise<void> {
  const {
    id,
    name,
    kind,
    storyFn,
    showMain,
    storyContext,
    storyContext: { parameters, args, argTypes, globals, undecoratedStoryFn },
  } = options;
  const componentStory = storyFn(args as any) as StoryFnMubanReturnType;
  showMain();

  const data = (componentStory.data ?? args) || {};

  // eslint-disable-next-line no-param-reassign
  (domElement as HTMLElement).textContent = '';
  const container = document.createElement('div');
  domElement.append(container);

  let serverTemplate = '';

  let app: App | undefined;
  if (componentStory.component) {
    app = createApp(componentStory.component);
    app.component(...(componentStory.appComponents ?? []));
  }

  const { renderMode, serverConfig } = parseServerConfig(globals);

  // TODO: type correctly after returnType from `app.mount` is fixed in muban
  let componentInstance: any;

  if (renderMode === 'server' && !validateServerConfig(options)) {
    return;
  }

  if (
    renderMode === 'server' ||
    (!renderMode &&
      storyContext.parameters.server?.url &&
      storyContext.parameters.server?.id &&
      !storyContext.parameters.server?.disabled)
  ) {
    const {
      server: { id: storyId, params, configs },
    } = parameters;
    let {
      server: { url, fetchStoryHtml = fetchStoryHtmlUsingGetJson },
    } = parameters;
    if (serverConfig && configs[serverConfig]) {
      url = configs[serverConfig].url || url;
      fetchStoryHtml = configs[serverConfig].fetchStoryHtml || fetchStoryHtml;
    }

    const sanitizedStoryArgs = getServerTemplateArgs(data, argTypes);
    const fetchId = storyId || id;
    const storyParams = { ...params, ...sanitizedStoryArgs };
    serverTemplate = await fetchStoryHtml(url, fetchId, storyParams, storyContext);

    if (serverTemplate) {
      const finalServerTemplate = getInjectedServerTemplate(
        undecoratedStoryFn,
        storyContext,
        data,
        componentStory,
        serverTemplate,
        options,
      );

      if (finalServerTemplate) {
        container.innerHTML = finalServerTemplate;
        componentInstance = app?.mount(container);
      }
    } else {
      options.showError({
        title: `Expecting an HTML snippet from the story: "${name}" of "${kind}".`,
        description: `Did you forget to return any HTML from the server?`,
      });
    }
  } else {
    // create a full muban app

    const sanitizedStoryArgs = getClientTemplateArgs(data, argTypes);

    if (app) {
      // the `app.mount` types are wrong here
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      componentInstance = app.mount(container, componentStory.template, sanitizedStoryArgs);
    } else {
      // only render the basic template
      container.innerHTML = [componentStory.template(sanitizedStoryArgs) as any].flat().join('');
    }
  }

  applyActionArgs(componentInstance, argTypes, args);

  // options.showError({
  //   title: `Expecting an HTML snippet or DOM node from the story: "${name}" of "${kind}".`,
  //   description: dedent`
  //       Did you forget to return the HTML snippet from the story?
  //       Use "() => <your snippet or node>" or when defining the story.
  //     `,
  // });
}
function validateServerConfig(options: RenderContext<MubanFramework>): boolean {
  if (!options.storyContext.parameters.server?.url) {
    options.showError({
      title: `Server url is not configured`,
      description: `You've chosen server rendering, but "parameters.server.url" is not configured.`,
    });
    return false;
  }
  if (!options.storyContext.parameters.server?.id) {
    options.showError({
      title: `Server story id is not configured`,
      description: `You've chosen server rendering, but "parameters.server.id" is not configured for your story,
which means the server doesn't know which template to render.`,
    });
    return false;
  }
  if (options.storyContext.parameters.server?.disabled) {
    options.showError({
      title: `Server rendering is disabled`,
      description: `You've chosen server rendering, but "parameters.server.disabled" is set to disallow
server rendering (for this component/story).`,
    });
    return false;
  }
  return true;
}

function applyActionArgs(componentInstance: any, argTypes: StrictArgTypes, args: Args): void {
  // if we were able to mount a component,
  // then pass the action props to it,
  // so it can call the action handlers to show in the actions panel
  if (componentInstance) {
    // filter out all arg names that are action types
    const actionArgs = new Set(
      Object.entries(argTypes)
        .filter(([, { action }]) => Boolean(action))
        .map(([actionName]) => actionName),
    );

    // filter args that are actions
    const actionProps = Object.fromEntries(
      Object.entries(args).filter(([argName]) => actionArgs.has(argName)),
    );
    componentInstance.setProps(actionProps);
  }
}
