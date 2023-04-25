import { parameters as docsParams } from './docs/config.js';

export const parameters = { renderer: 'muban' as const, ...docsParams };

export { decorators, argTypesEnhancers } from './docs/config.js';
export { renderToCanvas, render } from './render.js';
