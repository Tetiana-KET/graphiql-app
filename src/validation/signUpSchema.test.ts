import { TranslationFunction } from '@/models/AuthInterfaces';
import { describe, expect, it, vi } from 'vitest';
import { createSignUpSchema } from './signUpSchema';

const t: TranslationFunction = vi.fn((key: string) => key);

const schema = createSignUpSchema(t);

describe('createSignUpSchema', () => {
  it('should validate correct data', () => {
    const validData = {
      name: 'Paul',
      email: 'test@gmail.com',
      password: '22222sssSSSS*',
    };

    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should invalidate data with too short name', () => {
    const validData = {
      name: 'P',
      email: 'test@gmail.com',
      password: '22222sssSSSS*',
    };

    const result = schema.safeParse(validData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('auth:nameMessage');
  });
});
