import type { ComponentFactory, LazyComponent } from '@muban/muban';
import type { ComponentTemplate } from '@muban/template';
import type {
  ArgsStoryFn,
  StoryContext as DefaultStoryContext,
  WebRenderer,
} from '@storybook/types';
import type { parameters } from './config.js';

export type { RenderContext } from '@storybook/types';

export type StoryFnMubanReturnType = {
  component?: ComponentFactory;
  template: ComponentTemplate;
  data?: any;
  appComponents?: Array<ComponentFactory | LazyComponent>;
};

export interface ShowErrorArgs {
  title: string;
  description: string;
}

export type TemplateProps<T extends ComponentTemplate> = Parameters<T>[0];

/**
 * @deprecated Use `MubanRenderer` instead.
 */
export type MubanFramework = MubanRenderer;
export interface MubanRenderer extends WebRenderer {
  component:
    | { component?: ComponentFactory; template: ComponentTemplate }
    | ArgsStoryFn<MubanRenderer>;
  storyResult: StoryFnMubanReturnType;
}

export type StoryContext = DefaultStoryContext<MubanRenderer> & {
  parameters: DefaultStoryContext<MubanRenderer>['parameters'] & typeof parameters;
};
