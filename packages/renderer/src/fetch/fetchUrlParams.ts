import { stringify } from 'qs';
import type { StoryContext } from '../types.js';
import { getUrl } from './utils/getUrl.js';

export async function fetchStoryHtmlUsingUrlParams(
  url: string,
  path: string,
  parameters: Record<string, unknown>,
  storyContext: StoryContext,
): Promise<string> {
  const fetchUrl = getUrl(
    url,
    path,
    new URLSearchParams(
      stringify({
        ...storyContext.globals,
        ...parameters,
      }),
    ),
  );

  const response = await fetch(fetchUrl);
  return response.text();
}
