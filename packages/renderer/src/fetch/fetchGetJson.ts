import type { StoryContext } from '../types.js';
import { getUrl } from './utils/getUrl.js';

export async function fetchStoryHtmlUsingGetJson(
  url: string,
  path: string,
  parameters: Record<string, unknown>,
  storyContext: StoryContext,
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
