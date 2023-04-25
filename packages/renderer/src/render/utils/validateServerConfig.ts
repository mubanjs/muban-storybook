import { type RenderContext } from '@storybook/types';
import { type MubanRenderer } from '../../types.js';

export function validateServerConfig(options: RenderContext<MubanRenderer>): boolean {
  if (!options.storyContext.parameters['server']?.url) {
    options.showError({
      title: `Server url is not configured`,
      description: `You've chosen server rendering, but "parameters.server.url" is not configured.`,
    });
    return false;
  }
  if (!options.storyContext.parameters['server']?.id) {
    options.showError({
      title: `Server story id is not configured`,
      description: `You've chosen server rendering, but "parameters.server.id" is not configured for your story,
which means the server doesn't know which template to render.`,
    });
    return false;
  }
  if (options.storyContext.parameters['server']?.disabled) {
    options.showError({
      title: `Server rendering is disabled`,
      description: `You've chosen server rendering, but "parameters.server.disabled" is set to disallow
server rendering (for this component/story).`,
    });
    return false;
  }
  return true;
}
