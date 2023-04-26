import type { StoryFn, Meta } from '@muban/storybook';
import { StoryComponent, storyTemplate } from './resources/Component';
import { argTypes } from './resources/StoryComponent.argTypes';

type Story = StoryFn<typeof storyTemplate>;

export default {
  title: 'Legacy',
  component: { component: StoryComponent, template: storyTemplate },
  argTypes,
} satisfies Meta;

// Storybook 6.x Story function - CSFv2
export const ClientFn: Story = () => ({
  component: StoryComponent,
  template: storyTemplate,
});
ClientFn.args = {
  initialValue: false,
};
