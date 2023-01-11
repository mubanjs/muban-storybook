import type { StoryContext } from '@storybook/csf';
import type { MubanFramework } from '../preview/types-6-0';
import { sanitizeParams } from './utils';

export async function fetchStoryHtmlUsingPostJson(
  url: string,
  path: string,
  params: Record<string, unknown>,
  storyContext: StoryContext<MubanFramework>,
): Promise<string> {
  const sanitizedParams = sanitizeParams(params, storyContext.argTypes);

  const fetchUrl = new URL(`${url}/${path}`, 'http://fallback');

  const response = await fetch(fetchUrl.toString().replace('http://fallback', ''), {
    method: 'POST',
    body: JSON.stringify({
      ...storyContext.globals,
      templateData: sanitizedParams,
    }),
  });
  return response.text();
}
