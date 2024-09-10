import { TranslationFunction } from '@/models/AuthInterfaces';
import { describe, expect, it, vi } from 'vitest';
import { GraphQLFormDataMock } from '../../__tests__/msw/mock';
import { createGraphQLSchema } from './createGraphQLSchema';

const t: TranslationFunction = vi.fn((key: string) => key);
const schema = createGraphQLSchema(t);

vi.mock('react-i18next', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-i18next')>();

  return {
    ...actual,
    useTranslation: vi.fn(() => ({ t: (key: string) => key })),
  };
});

describe('createGraphQLSchema', () => {
  it('validate correct data as expected', () => {
    const result = schema.safeParse(GraphQLFormDataMock);
    expect(result.success).toBe(true);
  });

  it('should invalidate when url is missing', () => {
    const invalidData = {
      sdl: 'https://example.com/sdl',
      query: '{ exampleQuery { field } }',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should invalidate when SDL is not a valid URL', () => {
    const invalidData = {
      url: 'https://example.com',
      sdl: 'invalid-url',
      query: '{ exampleQuery { field } }',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should validate when optional fields are not provided', () => {
    const validData = {
      url: 'https://example.com',
      sdl: 'https://example.com/sdl',
      query: '{ exampleQuery { field } }',
    };

    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
