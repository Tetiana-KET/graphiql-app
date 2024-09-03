import { TranslationFunction } from '@/models/AuthInterfaces';
import { z } from 'zod';
import { createKeyValuePairsSchema } from '@/validation/keyValuePairsSchema';
import { RestMethod } from '@/models/RestMethod.enum';

export const createRestSchema = (t: TranslationFunction) => {
  return z.object({
    url: z
      .string()
      .trim()
      .min(1, t('common:URLRequired'))
      .url(t('common:URLError')),
    method: z.nativeEnum(RestMethod, {
      errorMap: () => ({ message: t('rest:MethodRequired') }),
    }),
    body: z.string().optional(),
    variables: z.array(createKeyValuePairsSchema(t)).optional(),
    headers: z.array(createKeyValuePairsSchema(t)).optional(),
  });
};
