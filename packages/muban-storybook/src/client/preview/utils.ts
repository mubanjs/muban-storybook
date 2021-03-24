import { ComponentTemplateResult, html } from '@muban/muban';
import type { StoryContext } from '@storybook/addons/dist/types';
import type { StoryFnMubanReturnType } from './types';

type StoryFn = () => StoryFnMubanReturnType;

/**
 * Helper function for component decorators that:
 * - allows you to pass only a component or template, where this function will fill in the other part
 * - already apply the template props and pass the rendered child template
 */
export function createDecoratorComponent(
  createDecoratorFn: (meta: {
    story: StoryFn,
    context: StoryContext
    component: StoryFnMubanReturnType['component'],
    template: ComponentTemplateResult,
  }) => Partial<StoryFnMubanReturnType>,
): (story: StoryFn, context: StoryContext) => StoryFnMubanReturnType {
  return (story, context): StoryFnMubanReturnType => {
    const decoratorComponent = createDecoratorFn({
      story,
      context,
      // TODO: document that not all stories have components
      component: story().component,
      template: story().template(context.args ?? {})
    });

    if (!decoratorComponent.component && !decoratorComponent.template) {
      return story();
    }

    const component = decoratorComponent.component ?? story().component;
    let template = decoratorComponent.template ?? story().template;

    // create dummy template attaching to the decoratorComponent so it gets initialized
    if (!decoratorComponent.template && decoratorComponent.component) {
      template = (): string | Array<string> =>
        html`<div data-component=${decoratorComponent.component!.displayName}>
          ${story().template(context.args ?? {})}
        </div>`;
    }

    return {
      component,
      template,
    };
  };
}