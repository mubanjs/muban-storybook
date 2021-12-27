/* eslint-disable unicorn/prevent-abbreviations */
import { ComponentTemplateResult, html, unsafeHTML } from '@muban/template';
import type { DecoratorFunction, StoryContext } from '@storybook/csf';
import type { StoryFnMubanReturnType } from './types';
import type { MubanFramework } from './types-6-0';

type StoryFn = () => StoryFnMubanReturnType;

/**
 * Helper function for component decorators that:
 * - allows you to pass only a component or template, where this function will fill in the other part
 * - already apply the template props and pass the rendered child template
 */
export function createDecoratorComponent<Args>(
  createDecoratorFn: (meta: {
    story: StoryFn;
    context: StoryContext<MubanFramework, Args>;
    component: StoryFnMubanReturnType['component'];
    template: ComponentTemplateResult;
  }) => Partial<StoryFnMubanReturnType>,
): DecoratorFunction<MubanFramework, Args> {
  return (story, context) => {
    const storyComponent = story();
    const storyTemplateResult = storyComponent.template(context.args ?? {});
    const decoratorComponent = createDecoratorFn({
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

    // create dummy template attaching to the decoratorComponent so it gets initialized
    if (!decoratorComponent.template && decoratorComponent.component) {
      template = (): string | Array<string> =>
        html`<div data-component=${decoratorComponent.component!.displayName}>
          ${unsafeHTML(storyTemplateResult.toString())}
        </div>`;
    }

    return {
      appComponents,
      component,
      template,
    };
  };
}
