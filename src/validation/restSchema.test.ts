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

  it('should validate with empty body', () => {
    const validData = {
      url: DEFAULT_REST_URL,
      method: RestMethod.Get,
      body: '',
    };

    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should validate with valid JSON body', () => {
    const validData = {
      url: DEFAULT_REST_URL,
      method: RestMethod.Post,
      body: '{"key": "value"}',
    };

    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should invalidate when variables are not valid', () => {
    const invalidData = {
      url: DEFAULT_REST_URL,
      method: RestMethod.Post,
      body: DEFAULT_REST_BODY,
      variables: [{ key: '', value: 'value' }],
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should invalidate when headers are not valid', () => {
    const invalidData = {
      url: DEFAULT_REST_URL,
      method: RestMethod.Post,
      body: DEFAULT_REST_BODY,
      headers: [{ key: '', value: 'value' }],
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should validate nested JSON in body', () => {
    const validData = {
      url: DEFAULT_REST_URL,
      method: RestMethod.Post,
      body: '{"nested": {"key": "value"}}',
    };

    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should validate array JSON in body', () => {
    const validData = {
      url: DEFAULT_REST_URL,
      method: RestMethod.Post,
      body: '["value1", "value2"]',
    };

    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should validate body with only Latin1 characters', () => {
    const validData = {
      url: DEFAULT_REST_URL,
      method: RestMethod.Post,
      body: '{"key": "value", "latinText": "áéíóúñ"}',
    };

    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should invalidate body with non-Latin1 characters', () => {
    const invalidData = {
      url: DEFAULT_REST_URL,
      method: RestMethod.Post,
      body: '{"key": "value", "unicodeText": "你好"}',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('common:onlyLatin');
  });

  it('should validate nested objects in body', () => {
    const validData = {
      url: DEFAULT_REST_URL,
      method: RestMethod.Post,
      body: '{"nested": {"key": "value", "innerNested": {"innerKey": "innerValue"}}}',
    };

    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should validate arrays in body', () => {
    const validData = {
      url: DEFAULT_REST_URL,
      method: RestMethod.Post,
      body: '{"array": [1, 2, 3, {"key": "value"}]}',
    };

    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should validate body with mixed data types (objects, arrays, literals)', () => {
    const validData = {
      url: DEFAULT_REST_URL,
      method: RestMethod.Post,
      body: '{"array": [1, "text", true, {"key": "value"}], "literal": 123, "nullValue": null}',
    };

    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should invalidate when array contains invalid data type', () => {
    const invalidData = {
      url: DEFAULT_REST_URL,
      method: RestMethod.Post,
      body: '{"array": [undefined]}',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('rest:invalidBody');
  });

  it('should invalidate when nested object contains invalid structure', () => {
    const invalidData = {
      url: DEFAULT_REST_URL,
      method: RestMethod.Post,
      body: '{"nested": {"key": undefined}}',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('rest:invalidBody');
  });
});
