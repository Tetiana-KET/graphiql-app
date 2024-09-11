import { TranslationFunction } from '@/models/AuthInterfaces';
import { describe, expect, it, vi } from 'vitest';
import { mockKeyValuePairs } from '../../__tests__/msw/mock';
import { createKeyValuePairsSchema } from './keyValuePairsSchema';

const t: TranslationFunction = vi.fn((key: string) => key);
const schema = createKeyValuePairsSchema(t);

vi.mock('react-i18next', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-i18next')>();

  return {
    ...actual,
    useTranslation: vi.fn(() => ({ t: (key: string) => key })),
  };
});

describe('keyValuePairsSchema', () => {
  it('validate correct data as expected', () => {
    const result = schema.safeParse(mockKeyValuePairs);
    expect(result.success).toBe(true);
  });

  it('should invalidate when key is missing', () => {
    const invalidData = {
      value: 'ff',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should invalidate when value is missing', () => {
    const invalidData = {
      key: 'ff',
    };
    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
