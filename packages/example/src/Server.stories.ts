import type { TemplateStoryProps, Story, Meta } from '@muban/storybook';
import { StoryComponent, storyTemplate } from './Component';

export default {
  title: 'Server',
  component: StoryComponent,
} as Meta;

// Render on the server!
export const Simple: Story<TemplateStoryProps<typeof storyTemplate>> = {
  parameters: {
    server: {
      id: 'useToggle',
    },
  },
  args: {
    initialValue: true,
  }
}

