import type { StoryContext } from '../types.js';

export async function fetchStoryHtmlUsingPostJson(
  url: string,
  path: string,
  parameters: Record<string, unknown>,
  storyContext: StoryContext,
): Promise<string> {
  const fetchUrl = new URL(`${url}/${path}`, 'http://fallback');

  const response = await fetch(fetchUrl.toString().replace('http://fallback', ''), {
    method: 'POST',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Accept: 'text/html',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...storyContext.globals,
      templateData: parameters,
    }),
  });
  return response.text();
}
