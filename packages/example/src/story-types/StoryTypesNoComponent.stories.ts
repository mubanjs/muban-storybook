import type { Meta, StoryObj } from '@muban/storybook';
import { MyComponent } from './MyComponent';
import { myComponentTemplate } from './MyComponent.template';

const meta = {
  title: 'StoryTypes/NoComponent',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TestA = {
  render: () => ({
    component: MyComponent,
    template: myComponentTemplate,
  }),
} satisfies Story;
