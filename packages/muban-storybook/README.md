# @muban/storybook

> :warning: **FOR USE WITH `@mediamonks/muban-core`, USE VERSION `6.0.2`**
>
> The `@mediamonks/muban` version is this package works with version `6.0.2`.
> From version `7` onwards, it will only work with `@mubanjs/muban`.

Storybook for Muban: View Muban components in isolation with Hot Reloading.

This Storybook framework is based on `@storybook/html`, so almost everything you can do
follows the normal Storybook flow. Best to get familiar by
[reading the docs](https://storybook.js.org/docs/html/get-started/introduction).

The only differences in `muban-storybook` are:
- How to define your story function
- How the component is rendered in the preview iframe

## Getting started

Install this package in your project:

```sh
yarn add @muban/storybook
# or
npm i -S @muban/storybook
```

1) Set up storybook as you would do for any other framework.

2) Add the two storybook npm scripts to your package.json:
```json
{
  "scripts": {
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook"
  }
}
```

3) Create a story file next to your Muban component:

```ts
import type { Meta, Story } from '@muban/storybook/dist/client/preview/types-6-0';
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


export const Default = () => ({
  component: MyComponent,
  // this template is optional, if you omit it, this is how it will be used by default
  template: myComponentTemplate,
});
Default.args = {
  title: 'Foo',
  content: 'Bar'
}

import { html } from '@muban/muban';

// do more custom things
export const Custom = (args) => ({ 
  // use any hbs syntax to create your custom story template
  template: (props) => html`
    <div style="width: 300px; margin: 0 auto;">
      ${myComponentTemplate(props)}
    </div>
  `,
  // optionally return custom data, you can use the passed args here to modify/etc.
  data: {
    ...args,
    foo: 'bar'
  }
});
```

The following object makes up a Muban Storybook Component:

* `component` – A reference to a Muban component that will be "initialized" with the template.
* `template` – Any Muban template function that receives props (and optional ref) and returns a string.
  This can can be a template function that you import, or some inline `html` that renders the template function.
* `data` – Some custom data manipulation based on the received `args` that is passed to your template function.
* `appComponents` – An Array of Muban components that will be registered globally in the "story app".

## Decorators

[Decorators in storybook](https://storybook.js.org/docs/react/writing-stories/decorators) are a very powerful concept
that allow you to wrap code around your "story component" to add wrappers or context. To use decorators in muban we
expose a handy helper method to reduce your own setup code; `createDecoratorComponent`.

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

* `story` – the story function, if you call `story()` you "retrieve" the child story,
  which is a story object with a component, template, data, etc. You won't normally use
  this because we provide the component and rendered template separately for you.
* `context` – the story context, like parameters, args, etc.
* `component` – just `story().component`, make sure to pass this in the `components: [component]`
  array of any decorator component you return.
* `template` – a rendered child template you can inline in your decorator template,
  which already has the props applied; `story().template(context.args ?? {})`;

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
      setup() {
        provide('someContext', new ContextValue());
      }
    }),
    // provide a template function that is a 300px centered container
    template: () => html`
      <div data-component="context" style="width: 300px; margin: 0 auto;">
        ${template}
      </div>
    `,
  })),
];
```

Either of the above parameters are optional.
* If you only provide a component, then `createDecoratorComponent` will a automatically
  create a wrapper div template for you, matching the component name as `data-component`.
* If you only provide a template, then `createDecoratorComponent` will just provide the
  child story component as the component value.


## Webpack Config

To render Muban components in the Storybook preview iframe, we need to apply the same webpack config we have in muban
to Storybook. To not duplicate a lot of code, we should try to re-use as much of the default muban webpack as possible.

Keep in mind though that storybook still uses webpack 4, while your muban project might already uses webpack 5.

Have a look at [mubanjs/muban-skeleton/.storybook/webpack.config.ts](https://github.com/mubanjs/muban-skeleton/blob/main/.storybook/webpack.config.ts)
to see how it's done.

## Global styles

If you rely on global styles / fonts / etc, make sure to also load them into storybook.

This can be done by importing them into the `.storybook/preview.js` file.

If you need some HTML or external scripts/styles, you can add that to the
`.storybook/preview-head.html` or `.storybook/preview-body.html` files.

This is all exactly the same as normal storybook setup, so you can find everything you need in their docs.