/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Args as DefaultArgs, Annotations, BaseMeta, BaseStoryFn } from '@storybook/addons';
import type { StoryFnMubanReturnType } from './types';

export { Args, ArgTypes, Parameters, StoryContext } from '@storybook/addons';

type MubanComponent = any;
type MubanReturnType = StoryFnMubanReturnType;

/**
 * Metadata to configure the stories for a component.
 *
 * @see [Default export](https://storybook.js.org/docs/formats/component-story-format/#default-export)
 */
export type Meta<Args = DefaultArgs> = BaseMeta<MubanComponent> &
  Annotations<Args, MubanReturnType>;

/**
 * Story function that represents a component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
export type Story<Args = DefaultArgs> = BaseStoryFn<Args, MubanReturnType> &
  Annotations<Args, MubanReturnType>;
// TODO: might be good to switch back to `BaseStory`, once we know if we want to support story objects
