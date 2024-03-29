/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StoryContext } from '@storybook/types';
import type {
  MubanRenderer,
  RenderContext,
  StoryFnMubanReturnType as StoryFunctionMubanReturnType,
} from '../types.js';
import { DECORATOR_PLACEHOLDER_FOR_SERVER_INJECTION } from './createDecoratorComponent.js';
import { getClientTemplateArgs } from './getTemplateArgs.js';

export function getInjectedServerTemplate(
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  undecoratedStoryFunction: any,
  storyContext: StoryContext<MubanRenderer>,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data: any,
  componentStory: StoryFunctionMubanReturnType,
  serverTemplate: string,
  options: RenderContext<MubanRenderer>,
): string | null {
  const sanitizedStoryArgs = getClientTemplateArgs(data, storyContext.argTypes);

  // render story template without decorators
  const undecoratedTemplateResult = [
    undecoratedStoryFunction(storyContext).template(sanitizedStoryArgs) as any,
  ]
    .flat()
    .join('');

  // render everything
  const fullTemplateResult = [componentStory.template(sanitizedStoryArgs) as any].flat().join('');

  // if both are equal, there are no decorators, and we can just render the serverTemplate
  if (undecoratedTemplateResult === fullTemplateResult) {
    return serverTemplate;
  }

  if (
    undecoratedTemplateResult === '' &&
    fullTemplateResult.includes(DECORATOR_PLACEHOLDER_FOR_SERVER_INJECTION)
  ) {
    return fullTemplateResult.replace(DECORATOR_PLACEHOLDER_FOR_SERVER_INJECTION, serverTemplate);
  }

  // remove the story from the complete output, leaving just the decorators, with a __PLACEHOLDER__
  const decoratorWithPlaceholder = fullTemplateResult.replace(
    undecoratedTemplateResult,
    DECORATOR_PLACEHOLDER_FOR_SERVER_INJECTION,
  );

  if (!decoratorWithPlaceholder.includes(DECORATOR_PLACEHOLDER_FOR_SERVER_INJECTION)) {
    options.showError({
      title: `Something is wrong with the story and decorators`,
      description: `Failed to extract the story from the decorators, so the server-rendered template cannot be included.
        Are you passing custom props from the decorator template to your story template that change how it renders?`,
    });
    return null;
  }

  return decoratorWithPlaceholder.replace(
    DECORATOR_PLACEHOLDER_FOR_SERVER_INJECTION,
    serverTemplate,
  );
}
