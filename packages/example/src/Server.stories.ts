import type { TemplateStoryProps, Story, Meta } from '@muban/storybook';
import { createDecoratorComponent } from '@muban/storybook';
import { html } from '@muban/template';
import { StoryComponent, storyTemplate } from './Component';
import { argTypes } from './StoryComponent.argTypes';

export default {
  title: 'Server',
  component: StoryComponent,
  argTypes,
  parameters: {
    server: {
      id: 'useToggle',
    },
  },
} as Meta;

const addBorder = createDecoratorComponent(({ template }) => ({
  template: () => html`<div style="border: 1px solid red">${template}</div>`,
}));

// Render on the server!
export const Simple: Story<TemplateStoryProps<typeof storyTemplate>> = {
  args: {
    initialValue: true,
  },
};

export const SimpleWithDecorator: Story<TemplateStoryProps<typeof storyTemplate>> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  decorators: [addBorder],
  args: {
    initialValue: true,
  },
};

export const ClientTemplate: Story<TemplateStoryProps<typeof storyTemplate>> = {
  render() {
    return {
      template: () => html`<div>client-rendering</div>`,
    };
  },
  args: {
    initialValue: true,
  },
};

export const ClientTemplateWithDecorator: Story<TemplateStoryProps<typeof storyTemplate>> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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
