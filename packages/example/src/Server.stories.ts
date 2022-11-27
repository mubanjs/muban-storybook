import type { TemplateStoryProps, Story, Meta } from "@muban/storybook";
import { StoryComponent, storyTemplate } from "./Component";
import { argTypes } from "./StoryComponent.argTypes";

export default {
  title: "Server",
  component: StoryComponent,
  argTypes,
} as Meta;

// Render on the server!
export const Simple: Story<TemplateStoryProps<typeof storyTemplate>> = {
  parameters: {
    server: {
      id: "useToggle",
    },
  },
  args: {
    initialValue: true,
  },
};
