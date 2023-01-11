/* eslint-disable no-restricted-properties,@typescript-eslint/no-explicit-any,unicorn/prevent-abbreviations,@typescript-eslint/naming-convention */
import type { StrictArgTypes, Args, ArgTypes } from '@storybook/csf';

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export function sanitizeParams(
  params: Record<string, unknown>,
  argTypes: StrictArgTypes,
): Record<string, unknown> {
  // there is a bug in storybook where values are "stored in the url",
  // so if the page gets reloaded, boolean values are passed as strings
  // here we look at the argType control and set them bac
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => [
      key,
      argTypes[key]?.control?.type === 'boolean' ? value === true || value === 'true' : value,
    ]),
  );
}

export function getUrl(basePath: string, storyPath: string, params?: URLSearchParams): string {
  const fetchUrl = new URL(`${basePath}/${storyPath}`, 'http://fallback');
  fetchUrl.search = params?.toString() ?? '';
  return fetchUrl.toString().replace('http://fallback', '');
}

export function getServerTemplateArgs(args: Args, argTypes: ArgTypes): Args {
  const storyArgs = { ...args };

  Object.keys(argTypes).forEach((key: string) => {
    const argType = argTypes[key];
    const { control, action } = argType;
    const controlType = (control && control.type.toLowerCase()) ?? (Boolean(action) && 'action');
    const argValue = storyArgs[key];

    switch (controlType) {
      case 'date':
        // For cross framework & language support we pick a consistent representation of Dates as strings
        storyArgs[key] = new Date(argValue).toISOString();
        break;
      case 'object':
        // send objects as JSON strings
        // storyArgs[key] = JSON.stringify(argValue);
        break;
      case 'action':
        // don't send actions (functions)
        delete storyArgs[key];
        break;
      default:
    }
  });

  return storyArgs;
}
