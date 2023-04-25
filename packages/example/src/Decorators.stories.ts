/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { bind, computed, defineComponent, inject, provide } from '@muban/muban';
import type { Meta } from '@muban/storybook';
import { createDecoratorComponent, type StoryObj } from '@muban/storybook';
import { html } from '@muban/template';
import { StoryComponent, storyTemplate } from './resources/Component.js';
import { argTypes } from './resources/StoryComponent.argTypes.js';

export default {
  title: 'Decorators',
  argTypes,
} satisfies Meta;

type Story = StoryObj<typeof storyTemplate>;

export const TemplateOnly: Story = {
  render: () => ({
    component: StoryComponent,
    template: storyTemplate,
  }),
  args: {
    initialValue: false,
  },
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
};

export const ComponentOnly: Story = {
  render: () => ({
    component: defineComponent({
      name: 'context-test',
      refs: {
        info: 'info',
      },
      setup({ refs }) {
        const value = inject<string>('test');
        return [bind(refs.info, { text: computed(() => value) })];
      },
    }),
    template: () => html`
      <div data-component="context-test">
        <p>Should display "foobar" as context value, which is coming from the decorator.</p>
        Context value: <span data-ref="info"></span>
      </div>
    `,
  }),
  args: {
    initialValue: false,
  },
  decorators: [
    createDecoratorComponent(({ component }) => ({
      component: defineComponent({
        components: [component!],
        name: 'context',
        setup() {
          provide('test', 'foobar');
          return [];
        },
      }),
    })),
  ],
};

export const ComponentAndTemplate: Story = {
  render: () => ({
    component: defineComponent({
      name: 'context-test',
      refs: {
        info: 'info',
      },
      setup({ refs }) {
        const value = inject<string>('test');
        return [bind(refs.info, { text: computed(() => value) })];
      },
    }),
    template: () => html`
      <div data-component="context-test">
        <p>
          Should have a blue background, and display "foobar" as context value, which is coming from
          the decorator.
        </p>
        Context value: <span data-ref="info"></span>
      </div>
    `,
  }),
  args: {
    initialValue: false,
  },
  decorators: [
    createDecoratorComponent(({ component, template }) => ({
      component: defineComponent({
        components: [component!],
        name: 'context',
        setup() {
          provide('test', 'foobar');
          return [];
        },
      }),
      template: () => html`
        <div data-component="context" style="background-color: lightblue">
          <h1>Wrapper</h1>
          ${template}
        </div>
      `,
    })),
  ],
};
