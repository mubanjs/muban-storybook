import { bind, computed, defineComponent, inject } from "@muban/muban";
import { provide } from "@muban/muban";
import type { TemplateStoryProps, Story, Meta } from "@muban/storybook";
import { createDecoratorComponent } from "@muban/storybook";
import { html } from "@muban/template";
import { StoryComponent, storyTemplate } from "./Component";
import { argTypes } from "./StoryComponent.argTypes";

export default {
  title: "Decorators",
  argTypes,
} as Meta;

export const TemplateOnly: Story<TemplateStoryProps<typeof storyTemplate>> = {
  render: () => ({
    component: StoryComponent,
    template: storyTemplate,
  }),
  args: {
    initialValue: false,
  },
  decorators: [
    createDecoratorComponent<TemplateStoryProps<typeof storyTemplate>>(
      ({ template }) => ({
        template: () => html`<div style="background-color: lightblue">
          <h1>Wrapper</h1>
          ${template}
        </div>`,
      })
    ),
  ],
};

export const ComponentOnly: Story = {
  render: () => ({
    component: defineComponent({
      name: "context-test",
      refs: {
        info: "info",
      },
      setup({ refs }) {
        const value = inject<string>("test");
        return [bind(refs.info, { text: computed(() => value) })];
      },
    }),
    template: () => html`<div data-component="context-test">
      Context value: <span data-ref="info"></span>
    </div>`,
  }),
  args: {
    initialValue: false,
  },
  decorators: [
    createDecoratorComponent(({ component }) => ({
      component: defineComponent({
        components: [component!],
        name: "context",
        setup() {
          provide("test", "foobar");
          return [];
        },
      }),
    })),
  ],
};

export const ComponentAndTemplate: Story = {
  render: () => ({
    component: defineComponent({
      name: "context-test",
      refs: {
        info: "info",
      },
      setup({ refs }) {
        const value = inject<string>("test");
        return [bind(refs.info, { text: computed(() => value) })];
      },
    }),
    template: () => html`<div data-component="context-test">
      Context value: <span data-ref="info"></span>
    </div>`,
  }),
  args: {
    initialValue: false,
  },
  decorators: [
    createDecoratorComponent(({ component, template }) => ({
      component: defineComponent({
        components: [component!],
        name: "context",
        setup() {
          provide("test", "foobar");
          return [];
        },
      }),
      template: () => html`<div
        data-component="context"
        style="background-color: lightblue"
      >
        <h1>Wrapper</h1>
        ${template}
      </div>`,
    })),
  ],
};
