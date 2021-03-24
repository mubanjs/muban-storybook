# @muban/storybook-addon-source

A storybook addon for Muban to view the source of your components in 4 panels.

> :warning: **NOT YET COMPATIBLE WITH `@mubanjs/muban`**
> 
> This version of the package is not yet updated, and only works with the
> legacy `@mediamonks/muban`.

## Getting started

Install this package in your project:

```sh
yarn add @muban/storybook-addon-source
# or
npm i -S @muban/storybook-addon-source
```

In your project that uses storybook, add the addon to the config:

```js
// .storybook/main.js

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-storysource',
    
    '@muban/storybook-addon-source', // add this to the list
  ],
};
```

In your story files, make sure to export the hbs component and the source data parameter.

```js
export default {
  title: 'My Component',
  component: require('./my-component'), // you can omit the .hbs extension
  parameters: {
    source: {
      data: require('./data/data.yaml'), // point to the most extensive data file
    },
  },
};
```

Then you should see 4 new panels in Storybook, for each of the source types:

* `template` - your hbs file
* `style` - the scss file linked in your hbs
* `script` - the ts file linked in your hbs
* `data` - the data object