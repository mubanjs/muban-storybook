import { processStoryArgs } from './getTemplateArgs.js';

describe('getTemplateArgs', () => {
  describe('processStoryArgs', () => {
    it('should return an empty object for an empty input object', () => {
      expect(processStoryArgs({}, {}, {})).toEqual({});
    });

    it('should convert boolean strings to booleans', () => {
      expect(
        processStoryArgs(
          { someBooleanAttribute: 'true' },
          { someBooleanAttribute: { control: 'boolean' } },
          { boolean: (value: unknown): boolean => value === true || value === 'true' },
        ),
      ).toEqual({ someBooleanAttribute: true });
    });

    it('should ignore undefined values', () => {
      expect(
        processStoryArgs(
          { someBooleanAttribute: undefined },
          { someBooleanAttribute: { control: 'boolean' } },
          { boolean: (value: unknown): boolean => value === true || value === 'true' },
        ),
      ).toEqual({});
    });

    it('should delete action values', () => {
      expect(
        processStoryArgs(
          { someActionAttribute: 'foo' },
          { someActionAttribute: { action: 'foo' } },
          { action: 'delete' },
        ),
      ).toEqual({});
    });
  });
});
