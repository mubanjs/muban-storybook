/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
export type { RenderContext } from '@storybook/client-api';

export interface ShowErrorArgs {
  title: string;
  description: string;
}

export type StoryFnMubanReturnType = {
  template: ((data: any) => string) & { compiled?: (data: any) => string };
  data: any;
};

export interface IStorybookStory {
  name: string;
  render: () => any;
}

export interface IStorybookSection {
  kind: string;
  stories: Array<IStorybookStory>;
}
