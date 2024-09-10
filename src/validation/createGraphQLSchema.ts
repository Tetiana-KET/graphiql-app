import { TranslationFunction } from '@/models/AuthInterfaces';
import { createKeyValuePairsSchema } from '@/validation/keyValuePairsSchema';
import { z } from 'zod';
import { LATIN_REGEX } from '@/consts/validation';

export const createGraphQLSchema = (t: TranslationFunction) => {
  return z.object({
    url: z
      .string()
      .min(1, t('common:URLRequired'))
      .url(t('common:URLError'))
      .regex(LATIN_REGEX, t('common:onlyLatin')),
    sdl: z
      .string()
      .min(1, t('graphQL:SDLRequired'))
      .url(t('common:URLError'))
      .regex(LATIN_REGEX, t('common:onlyLatin')),
    query: z
      .string()
      .min(1, t('graphQL:queryRequired'))
      .regex(LATIN_REGEX, t('common:onlyLatin')),
    variables: z.array(createKeyValuePairsSchema(t)).optional(),
    headers: z.array(createKeyValuePairsSchema(t)).optional(),
  });
};
