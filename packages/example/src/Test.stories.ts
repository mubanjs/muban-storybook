import type { StoryObj, Meta } from '@muban/storybook';
import { StoryComponent, storyTemplate } from './resources/Component.js';
import { argTypes } from './resources/StoryComponent.argTypes.js';

export default {
  title: 'CSF v3',
  argTypes,
} satisfies Meta;

type Story = StoryObj<typeof storyTemplate>;

export const ClientStory: Story = {
  render: () => ({
    component: StoryComponent,
    template: storyTemplate,
  }),
  args: {
    initialValue: false,
  },
};

export const CustomData: Story = {
  render: (args) => ({
    component: StoryComponent,
    template: storyTemplate,
    // change/append data inside here, which is again passed to the template function
    // this could also be done directly inside the template function
    data: { ...args, initialValue: true },
  }),
  args: {
    initialValue: false,
  },
};
