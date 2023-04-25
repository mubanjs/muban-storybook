import { getUrl } from './getUrl.js';

describe('getUrl', () => {
  it('should return the correct url when using full url', () => {
    expect(getUrl('http://localhost:8080/api/story', 'atoms/a5-text')).toBe(
      'http://localhost:8080/api/story/atoms/a5-text',
    );
  });
  // only passing path in url
  it('should return the correct url when using path only', () => {
    expect(getUrl('/api/story', 'atoms/a5-text')).toBe('/api/story/atoms/a5-text');
  });
});
