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

/**
 * A simple story that can be rendered on the server.
 * It should pass the args to the server, and render it accordingly
 */
export const Simple: Story = {
  args: {
    initialValue: true,
    data: {
      name: 'John',
      age: 42,
    },
  },
};

/**
 * A decorator around the story, that should also be applied when rendering on the server
 */
export const SimpleWithDecorator: Story = {
  decorators: [addBorder],
  args: {
    initialValue: true,
  },
};

export const ClientTemplate: Story = {
  render() {
    return {
      template: () => html`
        <div>
          <div class="alert alert-primary">
            <h4 class="alert-heading">Instructions!</h4>
            <p>This custom story template should only display when doing client rendering.</p>
            <p class="mb-0">
              This showcases that it's something you should basically never do when also rendering
              on the server. Use a <strong>decorator</strong> instead.
            </p>
          </div>
        </div>
      `,
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
      template: () => html`
        <div>
          <div class="alert alert-primary">
            <h4 class="alert-heading">Instructions!</h4>
            <p>
              This custom story template should only display when doing client rendering, but both
              server and client should have a <strong>decorator</strong> added.
            </p>
            <p class="mb-0">
              This showcases that it's something you should basically never do when also rendering
              on the server. Use a <strong>decorator</strong> instead.
            </p>
          </div>
        </div>
      `,
    };
  },
  args: {
    initialValue: true,
  },
};
