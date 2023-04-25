import type { Meta, StoryObj } from '@muban/storybook';
import { MyComponent } from './MyComponent.js';
import { myComponentTemplate } from './MyComponent.template.js';

export default {
  title: 'StoryTypes/Template',
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
