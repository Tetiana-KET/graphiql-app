import { z } from 'zod';
import { TranslationFunction } from '@/models/AuthInterfaces';

export const createKeyValuePairsSchema = (t: TranslationFunction) =>
  z.object({
    key: z.string().trim().min(1, t('common:KeyRequired')),
    value: z.string().trim().min(1, t('common:ValueRequired')),
  });
