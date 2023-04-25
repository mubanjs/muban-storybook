import { type ComponentTemplateResult, html } from '@muban/template';
import type { Args, DecoratorFunction, StoryContext } from '@storybook/types';
import type {
  MubanRenderer,
  StoryFnMubanReturnType as StoryFunctionMubanReturnType,
} from '../types.js';
import { getClientTemplateArgs as getClientTemplateArguments } from './getTemplateArgs.js';
import { parseServerConfig } from './parseServerConfig.js';

type StoryFunction = () => StoryFunctionMubanReturnType;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DECORATOR_PLACEHOLDER_FOR_SERVER_INJECTION = '__PLACEHOLDER__';

/**
 * Helper function for component decorators that:
 * - allows you to pass only a component or template, where this function will fill in the other part
 * - already apply the template props and pass the rendered child template
 */
export function createDecoratorComponent<A extends Args>(
  createDecoratorFunction: (meta: {
    story: StoryFunction;
    context: StoryContext<MubanRenderer, A>;
    component: StoryFunctionMubanReturnType['component'];
    template: ComponentTemplateResult;
  }) => Partial<StoryFunctionMubanReturnType>,
): DecoratorFunction<MubanRenderer, A> {
  return (story, context) => {
    const storyComponent = story();
    const { renderMode } = parseServerConfig(context.globals);

    const data = (storyComponent.data ?? context.args) || {};
    const sanitizedStoryArguments = getClientTemplateArguments(data, context.argTypes);
    let storyTemplateResult = storyComponent.template(sanitizedStoryArguments);

    // If we are currently rendering on the server, we inject a __PLACEHOLDER__ when our story is empty.
    // This allows us to identify where to inject our server-rendered story inside the decorators.
    if (renderMode === 'server') {
      storyTemplateResult ||= DECORATOR_PLACEHOLDER_FOR_SERVER_INJECTION;
    }

    const decoratorComponent = createDecoratorFunction({
      story,
      context,
      // TODO: document that not all stories have components
      component: storyComponent.component,
      template: storyTemplateResult,
    });

    // merge appComponents to pass "up", so story renderer can access it
    const appComponents = [
      ...(decoratorComponent.appComponents ?? []),
      ...(storyComponent.appComponents ?? []),
    ];

    if (!decoratorComponent.component && !decoratorComponent.template) {
      return {
        ...storyComponent,
        appComponents,
      };
    }

    const component = decoratorComponent.component ?? storyComponent.component;
    let template = decoratorComponent.template ?? storyComponent.template;

    // create dummy template attaching to the decoratorComponent, so it gets initialized
    if (!decoratorComponent.template && decoratorComponent.component) {
      template = (): string | Array<string> =>
        html`
          <div data-component=${decoratorComponent.component?.displayName}>
            ${storyTemplateResult}
          </div>
        `;
    }

    return {
      appComponents,
      component: component!,
      template,
    };
  };
}
