/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Globals } from '@storybook/csf';

export function parseServerConfig(globals: Globals): {
  renderMode: 'server' | 'client' | undefined;
  serverConfig: string;
} {
  const [renderMode, serverConfig] = globals.renderMode?.split(':') ?? [];
  return {
    renderMode,
    serverConfig,
  };
}
