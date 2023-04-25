import type { ComponentApi } from '@muban/muban';
import type { Args, StrictArgTypes } from '@storybook/types';

export function applyActionArgs(
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  componentInstance: ComponentApi | undefined,
  argTypes: StrictArgTypes,
  args: Args,
): void {
  // if we were able to mount a component,
  // then pass the action props to it,
  // so it can call the action handlers to show in the actions panel
  if (componentInstance) {
    // filter out all arg names that are action types
    const actionArgs = new Set(
      Object.entries(argTypes)
        .filter(([, { action }]) => Boolean(action))
        .map(([actionName]) => actionName),
    );

    // filter args that are actions
    const actionProps = Object.fromEntries(
      Object.entries(args).filter(([argName]) => actionArgs.has(argName)),
    );
    componentInstance.setProps(actionProps);
  }
}
