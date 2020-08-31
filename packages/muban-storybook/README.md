# @muban/storybook

Storybook for Muban: View Muban components in isolation with Hot Reloading.

This Storybook framework is based on `@storybook/html`, so almost everything you can do
follows the normal Storybook flow. Best to get familiar by
[reading the docs](https://storybook.js.org/docs/html/get-started/introduction).

The only differences in `@muban-storybook` are:
- How to define your story function
- How the component is rendered in the preview iframe

## Getting started

Install this package in your project:

```sh
yarn add @muban/storybook
# or
npm i -S @muban/storybook
```

Set up storybook as you would do for any other framework:

```js
// .storybook/main.js

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    // some default addons
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-storysource',
    
    // and this one
    '@muban/storybook-addon-source',
  ],
  webpackFinal: async (config, { configType }) => {
    // we need to make sure all relevant muban webpack config is added to the storybook config
    // see down below on how to do this 
  }
};
```

Add the two storybook npm scripts to your package.json:
```json
{
  "scripts": {
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook"
  }
}
```

Create a story file next to your Muban component:

```ts
import { Meta } from '@muban/storybook/dist/client/preview/types-6-0';

// Most things are just normal storybook configuration
export default {
  title: 'My Component',
  component: require('./my-component'), // require your hbs file here, omitting the .hbs extension
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
  },
  parameters: {
    source: {
      data: require('./data/data.yaml'), // this is for your muban source addon
    },
    docs: {
      description: {
        component: 'Some additional docs description',
      },
    },
  },
} as Meta;


export const Default = () => ({
  // this template is optional, if you omit it, this is how it will be used by default
  template: `<hbs>
      {{> my-component @root }}
    </hbs>`,
});
Default.args = require('./data/data.yaml');


// reuse the above template and data, just configuring different args
export const Simple = Default.bind({});
Simple.args = require('./data/data-simple');


// do more custom things
export const Custom = (args) => ({ 
  // use any hbs syntax to create your custom story template
  template: `<hbs>
      <div style="width: 300px; margin: 0 auto;">
        {{> my-component @root }}
      </div>
    </hbs>`,
  // optionally return custom data, you can use the passed args here to modify/etc.
  data: {
    ...args,
    foo: 'bar'
  }
});
```

## Webpack Config

To render Muban components in the Storybook preview iframe, we need to apply the same webpack config we have in muban
to Storbook. To not duplicate a lot of code, we should try to re-use as much of the default muban webpack as possible.

To see how to set this up, look at the most up-to-date config in the muban repository.

As a TLDR; make sure the following is configured:
- exclude svg from the default storybook `file-loader` config
- include all hbs rules (that apply for hbs files)
- include all the data rules (for json and yaml files, including the import-loader)
- include all style rules (for scss setup)
- include al svg rules (that's why we removed the default ones from storybook)
- merge the muban "resolve" webpack config
- when passing options to the reusable config, make sure that `partials` and `code` is `false`,
  and that `isDevelopment` and `buildType` follow the `configType` from storybook webpack  
  
## Global styles

If you rely on global styles / fonts / etc, make sure to also load them into storybook.

This can be done by importing them into the `.storybook/preview.js` file.

If you need some HTML or external scripts/styles, you can add that to the
`.storybook/preview-head.html` or `.storybook/preview-head.html` files.

This is all exactly the same as normal storybook setup, so you can find everything you need in their docs.