import type { StrictArgTypes } from '@storybook/csf';

const sanitizeByType = {
  unused: String,
  // boolean: (value: unknown): boolean => value === true || value === 'true',
  // number: Number,
  // select: Number,
  // range: Number,
  // date: Number,
  // string: String,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export function sanitizeParams(
  parameters: Record<string, unknown>,
  argumentTypes: StrictArgTypes,
): Record<string, unknown> {
  // there is a bug in storybook where values are "stored in the url",
  // so if the page gets reloaded, boolean values are passed as strings
  // here we look at the argType control and set them back
  return Object.fromEntries(
    Object.entries(parameters).map(([key, value]) => {
      const dataType =
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        argumentTypes[key as keyof typeof parameters]!.control?.type ??
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        argumentTypes[key as keyof typeof parameters]!.control;
      return [
        key,
        Object.hasOwn(sanitizeByType, dataType)
          ? sanitizeByType[dataType as keyof typeof sanitizeByType](value)
          : value,
      ];
    }),
  );
}
