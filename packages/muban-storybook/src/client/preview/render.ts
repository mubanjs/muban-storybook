/* eslint-disable no-restricted-properties,@typescript-eslint/no-explicit-any,unicorn/prevent-abbreviations,@typescript-eslint/naming-convention */
import { createApp } from '@muban/muban';
import type { App } from '@muban/muban/lib/api/apiCreateApp';
import type { ArgsStoryFn, StoryContext, Args, ArgTypes } from '@storybook/csf';
import { document } from 'global';
import type { RenderContext, StoryFnMubanReturnType } from './types';
import type { MubanFramework } from './types-6-0';

async function defaultFetchStoryHtml(
  url: string,
  path: string,
  params: Record<string, unknown>,
  storyContext: StoryContext<MubanFramework>,
): Promise<string> {
  const fetchUrl = new URL(`${url}/${path}`);
  fetchUrl.search = new URLSearchParams({ ...storyContext.globals, ...params }).toString();

  const response = await fetch(fetchUrl.toString());
  return response.text();
}

function buildStoryArgs(args: Args, argTypes: ArgTypes): Args {
  const storyArgs = { ...args };

  Object.keys(argTypes).forEach((key: string) => {
    const argType = argTypes[key];
    const { control } = argType;
    const controlType = control && control.type.toLowerCase();
    const argValue = storyArgs[key];
    switch (controlType) {
      case 'date':
        // For cross framework & language support we pick a consistent representation of Dates as strings
        storyArgs[key] = new Date(argValue).toISOString();
        break;
      case 'object':
        // send objects as JSON strings
        storyArgs[key] = JSON.stringify(argValue);
        break;
      default:
    }
  });

  return storyArgs;
}

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
    storyContext: { parameters, args, argTypes },
  } = options;
  const {
    server: { url, id: storyId, fetchStoryHtml = defaultFetchStoryHtml, params },
  } = parameters;

  const componentStory = storyFn(args as any) as StoryFnMubanReturnType;
  showMain();

  const data = (componentStory.data ? componentStory.data : args) || {};

  // eslint-disable-next-line no-param-reassign
  (domElement as HTMLElement).innerText = '';
  const container = document.createElement('div');
  domElement.appendChild(container);

  let serverTemplate = '';

  let app: App | undefined;
  if (componentStory.component) {
    app = createApp(componentStory.component);
    app.component(...(componentStory.appComponents || []));
  }

  if (options.storyContext.parameters.server && storyId) {
    const storyArgs = buildStoryArgs(args, argTypes);
    const fetchId = storyId || id;
    const storyParams = { ...params, ...storyArgs };
    serverTemplate = await fetchStoryHtml(url, fetchId, storyParams, storyContext);

    if (serverTemplate) {
      container.innerHTML = serverTemplate;
      app?.mount(container);
    } else {
      options.showError({
        title: `Expecting an HTML snippet from the story: "${name}" of "${kind}".`,
        description: `Did you forget to return any HTML from the server?`,
      });
    }
  } else {
    // create a full muban app
    // eslint-disable-next-line no-lonely-if
    if (app) {
      app.mount(container, componentStory.template, data);
    } else {
      // only render the basic template
      container.innerHTML = [].concat(componentStory.template(data) as any).join('');
    }
  }

  // options.showError({
  //   title: `Expecting an HTML snippet or DOM node from the story: "${name}" of "${kind}".`,
  //   description: dedent`
  //       Did you forget to return the HTML snippet from the story?
  //       Use "() => <your snippet or node>" or when defining the story.
  //     `,
  // });
}
