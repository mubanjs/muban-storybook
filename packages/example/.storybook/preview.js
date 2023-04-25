import {
  fetchStoryHtmlUsingUrlParams,
  fetchStoryHtmlUsingGetJson,
  fetchStoryHtmlUsingPostJson,
} from '@muban/storybook';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  server: {
    configs: {
      aem: {
        url: 'http://localhost:4502/content/core-components-examples/library',
      },
    },
    url: `/component-templates`,
    fetchStoryHtml: fetchStoryHtmlUsingPostJson,
  },
};

// add global var to control server rendering
export const globalTypes = {
  renderMode: {
    name: 'Render Mode',
    description: 'Render template on the server or client',
    defaultValue: 'client',
    toolbar: {
      icon: 'transfer',
      items: [
        {
          title: 'Render on the client',
          left: '🖥',
          value: 'client',
        },
        {
          title: 'Render on the server',
          left: '🌎',
          value: 'server',
        },
        {
          title: 'Render on the server - Default',
          left: '🌎',
          value: 'server:default',
        },
        {
          title: 'Render on the server - Twig',
          left: '🌎',
          value: 'server:twig',
        },
        {
          title: 'Render AEM on the server - AEM',
          left: '🌎',
          value: 'server:aem',
        },
      ],
      dynamicTitle: true,
    },
  },
};
