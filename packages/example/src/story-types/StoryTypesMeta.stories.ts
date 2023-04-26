import type { Meta, StoryObj } from '@muban/storybook';
import { MyComponent } from './MyComponent';
import { myComponentTemplate } from './MyComponent.template';

const meta = {
  title: 'StoryTypes/Meta',
  component: {
    component: MyComponent,
    template: myComponentTemplate,
  },
  args: {
    initialValue: false,
    // uncomment below to make the TestB story valid
    // initialValueRequired: false,
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const TestA = {
  args: {
    initialValueRequired: true,
  },
} satisfies Story;

export const TestB = {
  // @ts-expect-error expects initialValueRequired to be passed, or to be set as default
  args: {},
} satisfies Story;
