import type { Meta, StoryObj } from '@muban/storybook';
import { MyComponent } from './MyComponent';
import { myComponentTemplate } from './MyComponent.template';

export default {
  title: 'StoryTypes/Types/Template',
  component: {
    component: MyComponent,
    template: myComponentTemplate,
  },
} satisfies Meta;

// TODO: this does not yet infer required props
type Story = StoryObj<typeof myComponentTemplate>;

export const TestA = {
  args: {},
} satisfies Story;
