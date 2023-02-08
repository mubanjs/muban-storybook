/* eslint-disable no-restricted-properties,@typescript-eslint/no-explicit-any,unicorn/prevent-abbreviations,@typescript-eslint/naming-convention */

export function getUrl(basePath: string, storyPath: string, params?: URLSearchParams): string {
  const fetchUrl = new URL(`${basePath}/${storyPath}`, 'http://fallback');
  fetchUrl.search = params?.toString() ?? '';
  return fetchUrl.toString().replace('http://fallback', '');
}
