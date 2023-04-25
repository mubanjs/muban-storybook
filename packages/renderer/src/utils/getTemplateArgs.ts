/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Args, ArgTypes } from '@storybook/types';

export function processStoryArgs(
  args: Args,
  argumentTypes: ArgTypes,
  argumentTypeOperators: Record<string, 'delete' | ((value: any) => unknown)>,
): Args {
  const storyArguments = { ...args };

  for (const key of Object.keys(argumentTypes)) {
    if (storyArguments[key] === undefined) {
      continue;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const argumentType = argumentTypes[key]!;
    const { control, action } = argumentType;
    const controlType = ((control?.type ?? control)?.toLowerCase() ??
      (Boolean(action) && 'action')) as string | undefined;
    const argumentValue = storyArguments[key];

    const processor = controlType && argumentTypeOperators[controlType];
    if (processor) {
      if (processor === 'delete') {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete storyArguments[key];
      } else {
        storyArguments[key] = processor(argumentValue);
      }
    }
  }

  return storyArguments;
}
export function getServerTemplateArgs(args: Args, argumentTypes: ArgTypes): Args {
  // these _should_ be the same
  return getClientTemplateArgs(args, argumentTypes);
  // return processStoryArgs(args, argumentTypes, {
  //   action: 'delete',
  //   date: (value) => new Date(value).toISOString(),
  // });
}

export function getClientTemplateArgs(args: Args, argumentTypes: ArgTypes): Args {
  return processStoryArgs(args, argumentTypes, {
    // actions should not be passed to templates
    action: 'delete',
    // booleans are not properly converted from the URL, so they might be passed as strings
    boolean: (value: unknown): boolean => value === true || value === 'true',
  });
}
