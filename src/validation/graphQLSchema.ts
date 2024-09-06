import { TranslationFunction } from '@/models/AuthInterfaces';
import { createKeyValuePairsSchema } from '@/validation/keyValuePairsSchema';
import { z } from 'zod';

export const createGraphQLSchema = (t: TranslationFunction) => {
  return z.object({
    url: z.string().min(1, t('common:URLRequired')).url(t('common:URLError')),
    sdl: z.string().min(1, t('graphQL:SDLRequired')).url(t('common:URLError')),
    query: z.string().min(1, t('graphQL:queryRequired')),
    variables: z.array(createKeyValuePairsSchema(t)).optional(),
    headers: z.array(createKeyValuePairsSchema(t)).optional(),
  });
};
