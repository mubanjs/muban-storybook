import type { TemplateStoryProps, StoryFn, Meta } from '@muban/storybook';
import { StoryComponent, storyTemplate } from './Component';
import { argTypes } from './StoryComponent.argTypes';

export default {
  title: 'Legacy',
  component: StoryComponent,
  argTypes,
} as Meta;

// Storybook 6.x Story function - CSFv2
export const ClientFn: StoryFn<TemplateStoryProps<typeof storyTemplate>> = () => ({
  component: StoryComponent,
  template: storyTemplate,
});
ClientFn.args = {
  initialValue: false,
};
