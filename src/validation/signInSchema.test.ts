import { TranslationFunction } from '@/models/AuthInterfaces';
import { describe, expect, it, vi } from 'vitest';
import { createSignInSchema } from './signInSchema';

const t: TranslationFunction = vi.fn((key: string) => key);

const schema = createSignInSchema(t);

describe('createSignInSchema', () => {
  it('should validate correct data', () => {
    const validData = {
      email: 'test@gmail.com',
      password: '22222sssSSSS*',
    };

    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should invalidate when email does n"t follow the format', () => {
    const invalidData = {
      email: 'ddd.com',
      password: '22222sssSSSS*',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('auth:emailInvalid');
  });

  it('should invalidate when password is too short', () => {
    const invalidData = {
      email: 'test@gmail.com',
      password: '2222',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('auth:passwordMinLength');
  });

  it('should invalidate when password does n"t have digits', () => {
    const invalidData = {
      email: 'test@gmail.com',
      password: 'ddddDDDD*',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('auth:passDigitMessage');
  });
});
