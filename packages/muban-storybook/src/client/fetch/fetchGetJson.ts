import type { StoryContext } from '@storybook/csf';
import type { MubanFramework } from '../preview/types-6-0';
import { getUrl } from './utils/getUrl';

export async function fetchStoryHtmlUsingGetJson(
  url: string,
  path: string,
  parameters: Record<string, unknown>,
  storyContext: StoryContext<MubanFramework>,
): Promise<string> {
  const fetchUrl = getUrl(
    url,
    path,
    new URLSearchParams({
      ...storyContext.globals,
      templateData: JSON.stringify(parameters),
    }),
  );

  const response = await fetch(fetchUrl);
  return response.text();
}
