import type { Meta } from '@muban/storybook';
import { createDecoratorComponent, type StoryObj } from '@muban/storybook';
import { html } from '@muban/template';
import { StoryComponent, storyTemplate } from './resources/Component';
import { argTypes } from './resources/StoryComponent.argTypes';

export default {
  title: 'Server',
  component: { component: StoryComponent, template: storyTemplate },
  argTypes,
  parameters: {
    server: {
      id: 'toggle-expand',
    },
  },
} satisfies Meta;

type Story = StoryObj<typeof storyTemplate>;

const addBorder = createDecoratorComponent(({ template }) => ({
  template: (): string => html`<div style="border: 1px solid red">${template}</div>`,
}));

// Render on the server!
export const Simple: Story = {
  args: {
    initialValue: true,
    data: {
      name: 'John',
      age: 42,
    },
  },
};

export const SimpleWithDecorator: Story = {
  decorators: [addBorder],
  args: {
    initialValue: true,
  },
};

export const ClientTemplate: Story = {
  render() {
    return {
      template: () => html`<div>client-rendering</div>`,
    };
  },
  args: {
    initialValue: true,
  },
};

export const ClientTemplateWithDecorator: Story = {
  decorators: [addBorder],
  render() {
    return {
      template: () => html`<div>client-rendering</div>`,
    };
  },
  args: {
    initialValue: true,
  },
};
