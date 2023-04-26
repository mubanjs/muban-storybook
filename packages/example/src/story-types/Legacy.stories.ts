import type { StoryFn, Meta } from '@muban/storybook';
import { html } from '@muban/template';
import { StoryComponent, storyTemplate } from '../resources/Component';
import { argTypes } from '../resources/StoryComponent.argTypes';

type Story = StoryFn<typeof storyTemplate>;

export default {
  title: 'StoryTypes/Story/Legacy',
  component: { component: StoryComponent, template: storyTemplate },
  argTypes,
} satisfies Meta;

// Storybook 6.x Story function - CSFv2
export const ClientFn: Story = () => ({
  component: StoryComponent,
  template: (props) => html`
    <div>
      <div class="alert alert-primary">
        <h4 class="alert-heading">Instructions!</h4>
        <p class="mb-0">
          Just make sure that this story renders using the legacy <code>StoryFn</code> setup.
        </p>
      </div>
      ${storyTemplate(props)}
    </div>
  `,
});
ClientFn.args = {
  initialValue: false,
};
