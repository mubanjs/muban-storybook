/* eslint-disable no-restricted-properties,@typescript-eslint/no-explicit-any */
import { createApp } from '@muban/muban';
import { document } from 'global';
import type { RenderContext, StoryFnMubanReturnType } from './types';

const rootElement = document.querySelector('#root');

export default function renderMain({
  storyFn,
  args,
  showMain,
}: RenderContext): void {
  const componentStory = storyFn(args as any) as StoryFnMubanReturnType;
  showMain();

  const data = (componentStory.data ? componentStory.data : args) || {};

  rootElement.innerText = '';
  const container = document.createElement('div');
  rootElement.appendChild(container);

  // create a full muban app
  if (componentStory.component) {
    const app = createApp(componentStory.component);
    app.component(...(componentStory.appComponents || []));

    app.mount(container, componentStory.template, data);
  } else {
    // only render the basic template
    container.innerHTML = [].concat(componentStory.template(data) as any).join('');
  }
}
