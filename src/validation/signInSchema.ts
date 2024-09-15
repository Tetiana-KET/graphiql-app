import { PASS_MIN_LENGTH } from '@/consts/passLength';
import { TranslationFunction } from '@/models/AuthInterfaces';
import { z } from 'zod';

export const createSignInSchema = (t: TranslationFunction) =>
  z.object({
    email: z.string().email({ message: t('auth:emailInvalid') }),
    password: z
      .string()
      .min(PASS_MIN_LENGTH, {
        message: t('auth:passwordMinLength', { length: PASS_MIN_LENGTH }),
      })
      .regex(/\p{L}/u, {
        message: t('auth:passLetterMessage'),
      })
      .regex(/\d/, {
        message: t('auth:passDigitMessage'),
      })
      .regex(/[!@#%^&*]/, {
        message: t('auth:passSymbolMessage'),
      }),
  });
