import type { TemplateStoryProps, StoryFn, Meta } from '@muban/storybook';
import { StoryComponent, storyTemplate } from './Component';

export default {
  title: 'Legacy',
  component: StoryComponent,
} as Meta;

// Storybook 6.x Story function - CSFv2
export const ClientFn: StoryFn<TemplateStoryProps<typeof storyTemplate>> = () => ({
  component: StoryComponent,
  template: storyTemplate
});
ClientFn.args = {
  initialValue: false,
};

