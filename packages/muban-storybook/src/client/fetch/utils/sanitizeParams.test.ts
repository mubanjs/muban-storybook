import type { StrictArgTypes } from '@storybook/csf';
import { sanitizeParams } from './sanitizeParams';

describe('sanitizeParams', () => {
  it('should keep values if they are correct', () => {
    const argTypes = {
      title: { name: 'title', control: { type: 'text' } },
      isActive: { name: 'isActive', control: { type: 'boolean' } },
      number: { name: 'number', control: 'number' },
      range: { name: 'range', control: { type: 'range', min: 1, max: 30, step: 3 } },
      file: { name: 'file', control: { type: 'file', accept: '.png' } },
      data: { name: 'data', control: 'object' },
      contactRadio: { name: 'contactRadio', control: 'radio', options: ['email', 'phone', 'mail'] },
      contactInline: {
        name: 'contactInline',
        control: 'inline-radio',
        options: ['email', 'phone', 'mail'],
      },
      contactCheck: { name: 'contactCheck', control: 'check', options: ['email', 'phone', 'mail'] },
      select: { name: 'select', control: 'select', options: [20, 30, 40, 50] },
      countries: {
        name: 'countries',
        control: 'multi-select',
        options: ['USA', 'Canada', 'Mexico'],
      },
      color: { name: 'color', control: { type: 'color', presetColors: ['red', 'green'] } },
      date: { name: 'date', control: 'date' },
    } satisfies StrictArgTypes;

    const params: Record<keyof typeof argTypes, unknown> = {
      title: 'Header',
      isActive: true,
      number: 10,
      range: 10,
      file: 'https://example.com/file.png',
      data: {
        foo: 'Hello World',
        bar: true,
      },
      contactRadio: 'email',
      contactInline: 'email',
      contactCheck: ['email', 'phone'],
      select: 30,
      countries: ['USA', 'Canada'],
      color: '#ff0000',
      // unix timestamp
      date: 1_677_265_320_000,
    };

    const result = sanitizeParams(params, argTypes);

    expect(result).toEqual({
      title: 'Header',
      isActive: true,
      number: 10,
      range: 10,
      file: 'https://example.com/file.png',
      data: {
        foo: 'Hello World',
        bar: true,
      },
      contactRadio: 'email',
      contactInline: 'email',
      contactCheck: ['email', 'phone'],
      select: 30,
      countries: ['USA', 'Canada'],
      color: '#ff0000',
      // unix timestamp
      date: 1_677_265_320_000,
    });
  });

  // it('should sanitize when they are incorrect', () => {
  //   const argTypes = {
  //     title: { name: 'title', control: { type: 'text'} },
  //     isActive: { name: 'isActive', control: { type: 'boolean'} },
  //     number: { name: 'number', control: 'number' },
  //     range: { name: 'range', control: { type: 'range', min: 1, max: 30, step: 3 } },
  //     file: { name: 'file', control: { type: 'file', accept: '.png' } },
  //     data: { name: 'data', control: 'object' },
  //     contactRadio: { name: 'contactRadio', control: 'radio', options: ['email', 'phone', 'mail'] },
  //     contactInline: { name: 'contactInline', control: 'inline-radio', options: ['email', 'phone', 'mail'] },
  //     contactCheck: { name: 'contactCheck', control: 'check', options: ['email', 'phone', 'mail'] },
  //     select: { name: 'select', control: 'select', options: [20, 30, 40, 50] },
  //     countries: { name: 'countries', control: 'multi-select', options: ['USA', 'Canada', 'Mexico'] },
  //     color: { name: 'color', control: { type: 'color', presetColors: ['red', 'green']} },
  //     date: { name: 'date', control: 'date' },
  //   } satisfies StrictArgTypes;
  //
  //   const params: Record<keyof typeof argTypes, unknown> = {
  //     title: 'Header',
  //     isActive: 'true',
  //     number: '10',
  //     range: '10',
  //     file: 'https://example.com/file.png',
  //     data: {
  //       foo: 'Hello World',
  //       bar: true,
  //     },
  //     contactRadio: 'email',
  //     contactInline: 'email',
  //     contactCheck: ['email', 'phone'],
  //     select: '30',
  //     countries: ['USA', 'Canada'],
  //     color: '#ff0000',
  //     // unix timestamp
  //     date: '1677265320000',
  //   };
  //
  //   const result = sanitizeParams(params, argTypes);
  //
  //   expect(result).toEqual({
  //     title: 'Header',
  //     isActive: true,
  //     number: 10,
  //     range: 10,
  //     file: 'https://example.com/file.png',
  //     data: {
  //       foo: 'Hello World',
  //       bar: true,
  //     },
  //     contactRadio: 'email',
  //     contactInline: 'email',
  //     contactCheck: ['email', 'phone'],
  //     select: 30,
  //     countries: ['USA', 'Canada'],
  //     color: '#ff0000',
  //     // unix timestamp
  //     date: 1_677_265_320_000,
  //   });
  // });
});
