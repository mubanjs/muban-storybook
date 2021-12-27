/* eslint-disable @typescript-eslint/no-explicit-any,unicorn/prevent-abbreviations,@typescript-eslint/naming-convention */
// eslint-disable-next-line import/no-extraneous-dependencies
import type { ComponentFactory, LazyComponent } from '@muban/muban';
import type { ComponentTemplate } from '@muban/template';

export type { RenderContext } from '@storybook/core';

export type StoryFnMubanReturnType = {
  component?: ComponentFactory<any>;
  template: ComponentTemplate;
  data?: any;
  appComponents?: Array<ComponentFactory | LazyComponent>;
};

export type TemplateStoryProps<Template extends ComponentTemplate> = Parameters<Template>[0];

export interface IStorybookStory {
  name: string;
  render: (context: any) => any;
}

export interface IStorybookSection {
  kind: string;
  stories: Array<IStorybookStory>;
}

export interface ShowErrorArgs {
  title: string;
  description: string;
}
