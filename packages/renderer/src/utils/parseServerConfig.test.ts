import { parseServerConfig } from './parseServerConfig.js';

describe('parseServerConfig', () => {
  it('should parse the renderMode and serverConfig', () => {
    expect(parseServerConfig({ renderMode: 'server:config' })).toEqual({
      renderMode: 'server',
      serverConfig: 'config',
    });
  });

  it('should parse the renderMode without serverConfig', () => {
    expect(parseServerConfig({ renderMode: 'server' })).toEqual({
      renderMode: 'server',
      serverConfig: undefined,
    });
  });

  it('should not break when empty', () => {
    expect(parseServerConfig({})).toEqual({
      renderMode: undefined,
      serverConfig: undefined,
    });
  });

  it('should parse the renderMode as client', () => {
    expect(parseServerConfig({ renderMode: 'client' })).toEqual({
      renderMode: 'client',
      serverConfig: undefined,
    });
  });
});
