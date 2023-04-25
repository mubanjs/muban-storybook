import { SourceType, enhanceArgTypes } from '@storybook/docs-tools';
import { sourceDecorator } from './sourceDecorator.js';

export const decorators = [sourceDecorator];

export const parameters = {
  docs: {
    story: { inline: true },
    source: {
      type: SourceType.DYNAMIC,
      language: 'html',
      code: undefined as unknown,
      excludeDecorators: undefined as unknown,
    },
  },
};

export const argTypesEnhancers = [enhanceArgTypes];
