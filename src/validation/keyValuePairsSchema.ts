import { TranslationFunction } from '@/models/AuthInterfaces';
import { z } from 'zod';
import { LATIN_REGEX } from '@/consts/validation';

export const createKeyValuePairsSchema = (t: TranslationFunction) =>
  z.object({
    key: z
      .string()
      .trim()
      .min(1, t('common:KeyRequired'))
      .regex(LATIN_REGEX, t('common:onlyLatin')),
    value: z
      .string()
      .trim()
      .min(1, t('common:ValueRequired'))
      .regex(LATIN_REGEX, t('common:onlyLatin')),
  });
