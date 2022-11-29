import type { TemplateStoryProps, StoryObj, Story, Meta } from '@muban/storybook';
import { StoryComponent, storyTemplate } from './Component';
import { argTypes } from './StoryComponent.argTypes';

export default {
  title: 'CSF v3',
  argTypes,
} as Meta;

// Storybook 7.x Story Object - CSFv3
export const ClientObj: StoryObj<TemplateStoryProps<typeof storyTemplate>> = {
  render: () => ({
    component: StoryComponent,
    template: storyTemplate,
  }),
  args: {
    initialValue: false,
  },
};

// Imported from types-7-0 - render on the client
export const ClientStory: Story<TemplateStoryProps<typeof storyTemplate>> = {
  render: () => ({
    component: StoryComponent,
    template: storyTemplate,
  }),
  args: {
    initialValue: false,
  },
};

// Custom data
export const CustomData: Story<TemplateStoryProps<typeof storyTemplate>> = {
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
