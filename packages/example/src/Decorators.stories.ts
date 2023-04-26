/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { bind, computed, defineComponent, inject, provide } from '@muban/muban';
import type { Meta } from '@muban/storybook';
import { createDecoratorComponent, type StoryObj } from '@muban/storybook';
import { html } from '@muban/template';
import { StoryComponent, type storyTemplate } from './resources/Component';
import { argTypes } from './resources/StoryComponent.argTypes';

export default {
  title: 'Decorators',
  argTypes,
} satisfies Meta;

type Story = StoryObj<typeof storyTemplate>;

export const TemplateOnly: Story = {
  render: () => ({
    component: StoryComponent,
    template: () => html`
      <div>
        <div class="alert alert-primary">
          <h4 class="alert-heading">Instructions!</h4>
          <p>This story has a decorator that only provides the template.</p>
          <p class="mb-0">
            When the decorator works, I should be wrapped in a light-blue background with a bit of
            padding.
          </p>
        </div>
      </div>
    `,
  }),
  args: {
    initialValue: false,
  },
  decorators: [
    createDecoratorComponent(({ template }) => ({
      template: () => html`
        <div style="background-color: lightblue; padding: 20px">${template}</div>
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
        <div class="alert alert-primary">
          <h4 class="alert-heading">Instructions!</h4>
          <p>This story has a decorator that only provides the component.</p>
          <p class="mb-0">
            The value below should display "foobar", which is coming from the context in the
            decorator.
          </p>
        </div>
        <p>
          Context value: <code><span data-ref="info"></span></code>
        </p>
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
        <div class="alert alert-primary">
          <h4 class="alert-heading">Instructions!</h4>
          <p>This story has a decorator that provides the component and the template.</p>
          <p class="mb-0">
            It should be wrapped in a light-blue background (template), and the value below should
            display "foobar", which is coming from the context in the decorator (component).
          </p>
        </div>
        <p>
          Context value: <code><span data-ref="info"></span></code>
        </p>
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
        <div data-component="context" style="background-color: lightblue; padding: 20px">
          ${template}
        </div>
      `,
    })),
  ],
};
