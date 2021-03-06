/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
export type { RenderContext } from '@storybook/client-api';
import type { ComponentFactory, LazyComponent } from '@muban/muban';
import type { ComponentTemplate } from '@muban/template';

export interface ShowErrorArgs {
  title: string;
  description: string;
}

export type StoryFnMubanReturnType = {
  component?: ComponentFactory<any>;
  template: ComponentTemplate;
  data?: any;
  appComponents?: Array<ComponentFactory | LazyComponent>;
};

export interface IStorybookStory {
  name: string;
  render: () => any;
}

export interface IStorybookSection {
  kind: string;
  stories: Array<IStorybookStory>;
}
