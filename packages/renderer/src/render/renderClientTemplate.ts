import type { App } from '@muban/muban';
import { type StrictArgTypes } from '@storybook/types';
import { type StoryFnMubanReturnType } from '../types.js';
import { getClientTemplateArgs } from '../utils/getTemplateArgs.js';

export function renderClientTemplate(
  app: App | undefined,
  container: HTMLElement,
  componentStory: StoryFnMubanReturnType,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data: any,
  { argTypes }: { argTypes: StrictArgTypes },
): any {
  const sanitizedStoryArgs = getClientTemplateArgs(data, argTypes);

  if (app) {
    // the `app.mount` types are wrong here
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    return app.mount(container, componentStory.template, sanitizedStoryArgs);
  }
  // only render the basic template
  container.innerHTML = [componentStory.template(sanitizedStoryArgs) as any].flat().join('');
}
