# @muban/storybook

Storybook for Muban: View Muban components in isolation with Hot Reloading.

> :warning: **FOR USE WITH `@mediamonks/muban-core`, USE VERSION `6.1.0`**
>
> The `@mediamonks/muban` version is this package works with version `6.1.0`. From version `7`
> onwards, it will only work with `@mubanjs/muban`.

This Storybook framework is based on `@storybook/html`, so almost everything you can do follows the
normal Storybook flow. Best to get familiar by
[reading the docs](https://storybook.js.org/docs/html/get-started/introduction).

The only differences in `muban-storybook` are:

- How to define your story function
- How the component is rendered in the preview iframe

## Versions

`@muban/storybook` tries to keep in sync with `@storybook/core`. Whenever we can, it will retain
some backwards compatibility for the runtime API. In some case though, the definitions change in a
way this is not possible.

The list below helps to see what version of storybook is included, so what features can be used
inside your project.

| @muban/storybook | @storybook/core   |
| ---------------- | ----------------- |
| `7.0.0-alpha.23` | `6.5.13+` (CSFv3) |
| `7.0.0-alpha.21` | `6.5.13+` (CSFv3) |
| `7.0.0-alpha.17` | `6.4.9+` (CSFv3)  |
| `7.0.0-alpha.16` | `6.4.9`           |
| `7.0.0-alpha.15` | `6.1.21`          |

`7.0.0-alpha.26` adds support for:

- Multiple server configs
- Server urls with without a host
- Default story fetch implementations to use in your project

`7.0.0-alpha.23` adds support for:

- Explicit server rendering
- Decorators on server-rendered components

`7.0.0-alpha.22` adds support for:

- Action logging for function props

`7.0.0-alpha.17` adds support for:

- CSFv3 (object) stories – used by default
- Server rendered muban components

## Getting started

Install this package in your project:

```sh
yarn add @muban/storybook
# or
npm i -S @muban/storybook
```

1. Set up storybook as you would do for any other framework.

2. Add the two storybook npm scripts to your package.json:

```json
{
  "scripts": {
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook"
  }
}
```

3. In your `.storybook/main.js`, add `previewCsfV3` to make use of
   [version 3 of the Component Story Format](https://storybook.js.org/blog/component-story-format-3-0/).
   This is using objects for stories, giving you more flexibility and new awesome features;

```js
module.exports = {
  features: {
    previewCsfV3: true,
  },
};
```

5. Create a story file next to your Muban component:

```ts
import type { Meta, Story } from '@muban/storybook';
import { MyComponent } from './MyComponent';
import type { MyComponentProps } from './MyComponent.template';
import { myComponentTemplate } from './MyComponent.template';

// Most things are just normal storybook configuration
export default {
  title: 'My Component',
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
  },
} as Meta;

// A default CSFv3 object story
export const Default: Story<MyComponentProps> = {
  render: () => ({
    component: MyComponent,
    // this template is optional, if you omit it, this is how it will be used by default
    template: myComponentTemplate,
  }),
  args: {
    title: 'Foo',
    content: 'Bar',
  },
};
```

Or a legacy function component:

```ts
import type { Meta, StoryFn } from '@muban/storybook';
import { MyComponent } from './MyComponent';
import type { MyComponentProps } from './MyComponent.template';
import { myComponentTemplate } from './MyComponent.template';

// Most things are just normal storybook configuration
export default {
  title: 'My Component',
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
  },
} as Meta;

// A legacy function story
export const LegacyStory: StoryFn<MyComponentProps> = () => ({
  component: MyComponent,
  // this template is optional, if you omit it, this is how it will be used by default
  template: myComponentTemplate,
});
LegacyStory.args = {
  title: 'Foo',
  content: 'Bar',
};
```

Or do some custom things:

```ts
import { html } from '@muban/muban';
import type { Meta, Story } from '@muban/storybook';
import { MyComponent } from './MyComponent';
import type { MyComponentProps } from './MyComponent.template';
import { myComponentTemplate } from './MyComponent.template';

// Most things are just normal storybook configuration
export default {
  title: 'My Component',
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
  },
} as Meta;

// Do more custom things
export const Custom: Story<MyComponentProps> = {
  render: (args) => ({
    // Add custom html around your component template
    template: (props) => html`
      <div style="width: 300px; margin: 0 auto;">${myComponentTemplate(props)}</div>
    `,
    // optionally return custom data, you can use the passed args here to modify/etc.
    data: {
      ...args,
      foo: 'bar',
    },
  }),
};
```

The following object makes up a Muban Storybook Component:

- `component` – A reference to a Muban component that will be "initialized" with the template.
- `template` – Any Muban template function that receives props (and optional ref) and returns a
  string. This can can be a template function that you import, or some inline `html` that renders
  the template function.
- `data` – Some custom data manipulation based on the received `args` that is passed to your
  template function.
- `appComponents` – An Array of Muban components that will be registered globally in the "story
  app".

## Decorators

[Decorators in storybook](https://storybook.js.org/docs/react/writing-stories/decorators) are a very
powerful concept that allow you to wrap code around your "story component" to add wrappers or
context. To use decorators in muban we expose a handy helper method to reduce your own setup code;
`createDecoratorComponent`.

```ts
Default.decorators = [
  createDecoratorComponent(({ story, context, component, template }) => ({
    appComponents: ...
    component: ...
    template: ...
    data: ...
  })),
];
```

The function parameters contain the following:

- `story` – the story function, if you call `story()` you "retrieve" the child story, which is a
  story object with a component, template, data, etc. You won't normally use this because we provide
  the component and rendered template separately for you.
- `context` – the story context, like parameters, args, etc.
- `component` – just `story().component`, make sure to pass this in the `components: [component]`
  array of any decorator component you return.
- `template` – a rendered child template you can inline in your decorator template, which already
  has the props applied; `story().template(context.args ?? {})`;

The return object may contain any of the properties your normal story can also contain.

A basic example:

```ts
Default.decorators = [
  createDecoratorComponent(({ story, context, component, template }) => ({
    // provide globally registered componenet to the "muban app" that renders the story
    appComponents: [Icon],
    // provide context components that adds something to the context that your story components need
    component: defineComponent({
      name: 'context',
      // make sure to define this
      components: component ? [component] : [],
      setup() {
        provide('someContext', new ContextValue());
      },
    }),
    // provide a template function that is a 300px centered container
    template: () => html`
      <div data-component="context" style="width: 300px; margin: 0 auto;">
        <!-- render the child template -->
        ${template}
      </div>
    `,
  })),
];
```

Either of the above parameters are optional.

- If you only provide a component, then `createDecoratorComponent` will a automatically create a
  wrapper div template for you, matching the component name as `data-component`.
- If you only provide a template, then `createDecoratorComponent` will just provide the child story
  component as the component value.

Have a look at the example [Decorator Stories](../example/src/Decorators.stories.ts) to see some
more variations.

## Server Rendering

Server rendering can be enabled in two ways:

1. Explicitly set the `globals.renderMode` to `server`.
2. Not setting `globals.renderMode` at all, and providing all the required server configuration.

If `globals.renderMode` is set to `server`, it will show errors when any of the required server
configuration is missing.

### Explicit `renderMode` switch

To explicitly set the `renderMode` to `client` (default) or `server`, you should add this to the
`.storybook/preview.js`:

```ts
export const globalTypes = {
  renderMode: {
    name: 'Render Mode',
    description: 'Render template on the server or client',
    defaultValue: 'client',
    toolbar: {
      icon: 'transfer',
      items: ['client', 'server'],
      dynamicTitle: true,
    },
  },
};
```

It will generate a selector in the Storybook Toolbar to switch between all the given items at will.

It's also possible to specify specific server configurations with the `'server:twig'` format, more
on that later.

### Server configuration `parameters`

The following information can be provided.

#### url

`parameters.server.url` – often set in the `.storybook/preview.js`:

```ts
export const parameters = {
  server: {
    url: `http://localhost:3000/story`,
  },
};
```

#### id

`parameters.server.id` – often set in the story `default export`, but can also be set on each
individual story.

```ts
export default {
  title: 'My Component',
  component: MyComponent,
  // configures this as a server component
  parameters: {
    server: {
      id: 'myComponent',
    },
  },
} as Meta;
```

#### disabled

`parameters.server.disabled` – Can be set to disable individual stories that should not be rendered
on the server, or on a more global level to disable it for more or all stories.

#### fetchStoryHtml

`parameters.server.fetchStoryHtml` – A custom function to do a fetch request that fetches the HTML
from the server. The default function puts everything as a JSON encoded string inside the
`templateData` query parameter,

But you might want something more custom to your server, a POST request.

```ts
export const parameters = {
  server: {
    url: `http://localhost:3000/story`,
    fetchStoryHtml: async (url, id, params, context) => {
      return '<div>Hello world</div>';
    },
  },
};
```

`fetchStoryHtml` should be an async function with the following signature:

```ts
type FetchStoryHtmlType = (
  url: string,
  id: string,
  params: any,
  context: StoryContext,
) => Promise<string>;
```

- `url` – Server url configured by the `parameters.server.url`
- `id` – Id of the story being rendered given by `parameters.server.id`
- `params` – Merged story params `parameters.server.params` and story `args`
- `context` – The context of the story

The `@muban/storybook` package exports 3 implementations of this function:

- `fetchStoryHtmlUsingUrlParams` – This will add all story parameters and args in the query string
  of the url. A downside of this is that the url can become very long, and might be rejected by the
  server, and also that the parameters are all interpreted as strings, so you might need to do some
  extra parsing on the server side.

- `fetchStoryHtmlUsingGetJson` – This is the default implementation, it will add all story args in
  the `templateData` query parameter, which is a JSON encoded string and will support primitive
  types. Other meta parameters that are not template args are added as normal query parameters.

- `fetchStoryHtmlUsingPostJson` – A POST request that puts everything in as a JSON encoded string.
  It follows the same format as `fetchStoryHtmlUsingGetJson`, but it's a POST request instead of a
  GET request. The main benefit of this is that the url is not limited by the length of the query
  string.

A server rendered story could look like this:

```ts
import { html } from '@muban/muban';
import type { Meta, Story } from '@muban/storybook';
import { MyComponent } from './MyComponent';
import type { MyComponentProps } from './MyComponent.template';

// Most things are just normal storybook configuration
export default {
  title: 'My Component',
  component: MyComponent,
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
  },
  // configures this as a server component
  parameters: {
    server: {
      id: 'myComponent',
    },
  },
} as Meta;

// Render a server component template
export const ServerTemplateOnly: Story<MyComponentProps> = {
  // no need to provide a render function if you don't need a component
  args: {
    title: 'Foo',
    content: 'Bar',
  },
};

// Render a server component template with local component
export const ServerWithComponent: Story<MyComponentProps> = {
  render() {
    return {
      component: MyComponent,
    };
  },
  args: {
    title: 'Foo',
    content: 'Bar',
  },
};
```

### Multiple server configurations

Sometimes you need to connect to different external servers for your templates, and want to switch
between them.

You can specify multiple configs for these servers where you enter the url and optionally a custom
fetch function:

```ts
import { fetchStoryHtmlUsingPostJson } from '@muban/storybook/dist/cjs/client';

export const parameters = {
  server: {
    // default url
    url: `/story`,
    // additional configs
    configs: {
      twig: {
        // e.g. different port
        url: `http://localhost:1234/story`,
      },
      aem: {
        // e.g. different path as well
        url: `http://localhost:9876/api/story-base-path/`,
        // and uses a different way of fetching the HTML from the server
        fetchStoryHtml: fetchStoryHtmlUsingPostJson,
      },
    },
  },
};
```

To select a specific server config, you can use the `renderMode` global parameter:

```ts
export const globalTypes = {
  renderMode: {
    name: 'Render Mode',
    description: 'Render template on the server or client',
    defaultValue: 'client',
    toolbar: {
      icon: 'transfer',

      // specify the configs you want to use with the `:configName` postfix
      items: ['client', 'server:twig', 'server:aem'],

      dynamicTitle: true,
    },
  },
};
```

## Webpack Config

To render Muban components in the Storybook preview iframe, we need to apply the same webpack config
we have in muban to Storybook. To not duplicate a lot of code, we should try to re-use as much of
the default muban webpack as possible.

Keep in mind though that storybook still uses webpack 4 by default, while your muban project might
already uses webpack 5. In that case you can configure storybook to use webpack 5;

Install the following packages:

```json
"@storybook/builder-webpack5": "^6.4.9",
"@storybook/manager-webpack5": "^6.4.9",
```

And configure `.storybook/main.js` to use this builder:

```js
module.exports = {
  core: {
    builder: 'webpack5',
  },
};
```

Have a look at
[mubanjs/muban-skeleton/.storybook/webpack.config.ts](https://github.com/mubanjs/muban-skeleton/blob/main/.storybook/webpack.config.ts)
to see how it's done.

## Global styles

If you rely on global styles / fonts / etc, make sure to also load them into storybook.

This can be done by importing them into the `.storybook/preview.js` file.

If you need some HTML or external scripts/styles, you can add that to the
`.storybook/preview-head.html` or `.storybook/preview-body.html` files.

This is all exactly the same as normal storybook setup, so you can find everything you need in their
docs.
