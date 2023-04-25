import { type App } from '@muban/muban';
import { type RenderContext } from '@storybook/types';
import { fetchStoryHtmlUsingGetJson } from '../fetch/fetchGetJson.js';
import { type MubanRenderer, type StoryFnMubanReturnType } from '../types.js';
import { getInjectedServerTemplate } from '../utils/getInjectedServerTemplate.js';
import { getServerTemplateArgs } from '../utils/getTemplateArgs.js';

export async function renderServerTemplate(
  app: App | undefined,
  container: HTMLElement,
  componentStory: StoryFnMubanReturnType,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data: any,
  {
    serverConfig,
    options,
  }: {
    serverConfig: string;
    options: RenderContext<MubanRenderer>;
  },
): Promise<any> {
  const {
    id,
    name,
    kind,
    storyContext,
    storyContext: { parameters, argTypes, undecoratedStoryFn },
  } = options;

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

  const serverTemplate = await fetchStoryHtml(url, fetchId, storyParams, storyContext);

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
      return app?.mount(container);
    }
  } else {
    options.showError({
      title: `Expecting an HTML snippet from the story: "${name}" of "${kind}".`,
      description: `Did you forget to return any HTML from the server?`,
    });
  }
}
