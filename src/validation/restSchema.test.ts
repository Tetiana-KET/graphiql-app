import { DEFAULT_REST_BODY, DEFAULT_REST_URL } from '@/consts/defaultFormData';
import { RestMethod } from '@/enums/RestMethod';
import { TranslationFunction } from '@/models/AuthInterfaces';
import { describe, expect, it, vi } from 'vitest';
import { mockKeyValuePairs } from '../../__tests__/msw/mock';
import { createRestSchema } from './restSchema';

const t: TranslationFunction = vi.fn((key: string) => key);

const schema = createRestSchema(t);

describe('createRestSchema', () => {
  it('should validate correct data', () => {
    const validData = {
      url: DEFAULT_REST_URL,
      method: RestMethod.Post,
      body: DEFAULT_REST_BODY,
      variables: [mockKeyValuePairs],
      headers: [mockKeyValuePairs],
    };

    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should invalidate when URL is missing', () => {
    const invalidData = {
      method: RestMethod.Post,
      body: '{"key": "value"}',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Required');
  });

  it('should invalidate when URL is not valid', () => {
    const invalidData = {
      url: 'invalid-url',
      method: RestMethod.Post,
      body: DEFAULT_REST_BODY,
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('common:URLError');
  });

  it('should invalidate when method is missing', () => {
    const invalidData = {
      url: DEFAULT_REST_URL,
      body: DEFAULT_REST_BODY,
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('rest:methodRequired');
  });

  it('should invalidate body when not valid JSON', () => {
    const invalidData = {
      url: DEFAULT_REST_URL,
      method: RestMethod.Post,
      body: 'invalid-json',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('rest:invalidBody');
  });

  it('should validate without optional fields (body, variables, headers)', () => {
    const validData = {
      url: DEFAULT_REST_URL,
      method: RestMethod.Get,
    };

    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
