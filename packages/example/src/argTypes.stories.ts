import type { Meta, StoryObj } from '@muban/storybook';
import { createDecoratorComponent } from '@muban/storybook';
import { html } from '@muban/template';
import { StoryComponent, storyTemplate } from './resources/Component';

export default {
  title: 'ArgTypes',
  argTypes: {
    title: { name: 'title', control: { type: 'text' } },
    isActive: { name: 'isActive', control: { type: 'boolean' } },
    value: { name: 'value', control: 'number' },
    amount: { name: 'amount', control: { type: 'range', min: 1, max: 30, step: 3 } },
    avatar: { name: 'avatar', control: { type: 'file', accept: '.png' } },
    data: { name: 'data', control: 'object' },
    contactRadio: { name: 'contactRadio', control: 'radio', options: ['email', 'phone', 'mail'] },
    contactInline: {
      name: 'contactInline',
      control: 'inline-radio',
      options: ['email', 'phone', 'mail'],
    },
    contactCheck: { name: 'contactCheck', control: 'check', options: ['email', 'phone', 'mail'] },
    age: { name: 'age', control: 'select', options: [20, 30, 40, 50] },
    countries: { name: 'countries', control: 'multi-select', options: ['USA', 'Canada', 'Mexico'] },
    color: { name: 'color', control: { type: 'color', presetColors: ['red', 'green'] } },
    date: { name: 'date', control: 'date' },
    onClick: { name: 'onClick', action: 'onToggle' },
  },
} satisfies Meta;

type Story = StoryObj<typeof storyTemplate>;

export const Client: Story = {
  render: () => ({
    component: StoryComponent,
    template: storyTemplate,
  }),
  args: {},
};

export const Server: Story = {
  ...Client,
  parameters: {
    server: {
      id: 'useToggle',
    },
  },
};

export const ServerWithDecorator = {
  ...Client,
  decorators: [
    createDecoratorComponent(({ template }) => ({
      template: () => html`
        <div style="background-color: lightblue">
          <h1>Wrapper</h1>
          ${template}
        </div>
      `,
    })),
  ],
  parameters: {
    server: {
      id: 'useToggle',
    },
  },
} satisfies Story;

export const ConvertDate: StoryObj<{ date: string }> = {
  render: (renderProperties) => ({
    template: (properties) => html`
      <div>
        <h3>For client, look below</h3>
        <pre><code>${JSON.stringify(properties, null, 2)}</code></pre>
        <h3>For server, look in network panel</h3>
      </div>
    `,
    data: {
      ...renderProperties,
      date: renderProperties.date
        ? new Date(renderProperties.date).toISOString()
        : 'undefined date',
    },
  }),
  parameters: {
    server: {
      id: 'toggleExpand',
    },
  },
};
