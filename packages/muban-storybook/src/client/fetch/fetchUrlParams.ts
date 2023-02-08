import type { StoryContext } from '@storybook/csf';
import { stringify } from 'qs';
import type { MubanFramework } from '../preview/types-6-0';
import { getUrl } from './utils/getUrl';

export async function fetchStoryHtmlUsingUrlParams(
  url: string,
  path: string,
  parameters: Record<string, unknown>,
  storyContext: StoryContext<MubanFramework>,
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
