import type { StoryFn, Meta } from '@muban/storybook';
import { StoryComponent, storyTemplate } from './resources/Component.js';
import { argTypes } from './resources/StoryComponent.argTypes.js';

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
