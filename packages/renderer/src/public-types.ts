/* eslint-disable @typescript-eslint/naming-convention, unicorn/filename-case,@typescript-eslint/array-type */
import type { ComponentTemplate } from '@muban/template';
import type {
  AnnotatedStoryFn,
  Args,
  ComponentAnnotations,
  DecoratorFunction,
  LoaderFunction,
  StoryAnnotations,
  StoryContext as GenericStoryContext,
  StrictArgs,
  ProjectAnnotations,
  ArgsStoryFn,
  ArgsFromMeta,
} from '@storybook/types';
import type { SetOptional, Simplify } from 'type-fest';
import type { MubanRenderer, TemplateProps } from './types.js';

export type { Args, ArgTypes, Parameters, StrictArgs } from '@storybook/types';

/**
 * Metadata to configure the stories for a component.
 *
 * @see [Default export](https://storybook.js.org/docs/formats/component-story-format/#default-export)
 */
export type Meta<TArgs = Args> = ComponentAnnotations<MubanRenderer, TArgs>;

/**
 * Story function that represents a CSFv2 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
export type StoryFn<TArgs = Args | ComponentTemplate> = AnnotatedStoryFn<
  MubanRenderer,
  TArgs extends ComponentTemplate ? TemplateProps<TArgs> : TArgs
>;

/**
 * Story function that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
export type StoryObj<TMetaOrCmpOrArgs = Args | ComponentTemplate> = TMetaOrCmpOrArgs extends {
  render?: ArgsStoryFn<MubanRenderer, any>;
  component?: { template: infer Template };
  args?: infer DefaultArgs;
}
  ? Simplify<
      (Template extends ComponentTemplate ? TemplateProps<Template> : unknown) &
        ArgsFromMeta<MubanRenderer, TMetaOrCmpOrArgs>
    > extends infer TArgs
    ? StoryAnnotations<
        MubanRenderer,
        TArgs,
        SetOptional<TArgs, keyof TArgs & keyof (DefaultArgs & ActionArgs<TArgs>)>
      >
    : never
  : TMetaOrCmpOrArgs extends ComponentTemplate
  ? // eslint-disable-next-line no-inline-comments
    // TODO: this does not yet infer required props, could be fixed by passing same obj as 3rd argument
    StoryAnnotations<MubanRenderer, TemplateProps<TMetaOrCmpOrArgs>>
  : StoryAnnotations<MubanRenderer, TMetaOrCmpOrArgs>;

type ActionArgs<TArgs> = {
  // This can be read as: filter TArgs on functions where we can assign a void function to that function.
  // The docs addon argsEnhancers can only safely provide a default value for void functions.
  // Other kind of required functions should be provided by the user.
  [P in keyof TArgs as TArgs[P] extends (...args: any[]) => any
    ? ((...args: any[]) => void) extends TArgs[P]
      ? P
      : never
    : never]: TArgs[P];
};

/**
 * @deprecated Use `StoryFn` instead.
 * Use `StoryObj` if you want to migrate to CSF3, which uses objects instead of functions to represent stories.
 * You can read more about the CSF3 format here: https://storybook.js.org/blog/component-story-format-3-0/
 *
 * Story function that represents a CSFv2 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
export type Story<TArgs = Args> = StoryFn<TArgs>;

export type Decorator<TArgs = StrictArgs> = DecoratorFunction<MubanRenderer, TArgs>;
export type Loader<TArgs = StrictArgs> = LoaderFunction<MubanRenderer, TArgs>;
export type StoryContext<TArgs = StrictArgs> = GenericStoryContext<MubanRenderer, TArgs>;
export type Preview = ProjectAnnotations<MubanRenderer>;
export { type MubanRenderer } from './types.js';
