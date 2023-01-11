import { stringify } from 'qs';
import type { StoryContext } from '@storybook/csf';
import type { MubanFramework } from '../preview/types-6-0';
import { getUrl, sanitizeParams } from './utils';

export async function fetchStoryHtmlUsingUrlParams(
  url: string,
  path: string,
  params: Record<string, unknown>,
  storyContext: StoryContext<MubanFramework>,
): Promise<string> {
  const sanitizedParams = sanitizeParams(params, storyContext.argTypes);
  const fetchUrl = getUrl(
    url,
    path,
    new URLSearchParams(
      stringify({
        ...storyContext.globals,
        ...sanitizedParams,
      }),
    ),
  );

  const response = await fetch(fetchUrl);
  return response.text();
}
