import type { StoryObj, Meta } from '@muban/storybook';
import { StoryComponent, storyTemplate } from '../resources/Component';
import { argTypes } from '../resources/StoryComponent.argTypes';

const meta = {
  title: 'StoryTypes/Story/CSF v3',
  component: {
    component: StoryComponent,
    template: storyTemplate,
  },
  argTypes,
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const ClientStory = {
  render: () => ({
    component: StoryComponent,
    template: storyTemplate,
  }),
  args: {
    initialValue: false,
  },
} satisfies Story;

export const CustomData = {
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
} satisfies Story;
