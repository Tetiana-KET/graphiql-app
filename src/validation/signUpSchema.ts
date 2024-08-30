import { TranslationFunction } from '@/models/AuthInterfaces';
import { z } from 'zod';
import { createSignInSchema } from './signInSchema';

export const createSignUpSchema = (t: TranslationFunction) =>
  createSignInSchema(t).extend({
    name: z.string().min(2, { message: t('auth:nameMessage') }),
  });
