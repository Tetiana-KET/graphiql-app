import { TranslationFunction } from '@/models/AuthInterfaces';
import { z } from 'zod';
import { createKeyValuePairsSchema } from '@/validation/keyValuePairsSchema';

export const createGraphQLSchema = (t: TranslationFunction) => {
  return z.object({
    URL: z.string().min(1, t('common:URLRequired')),
    SDL: z.string().min(1, t('graphQL:SDLRequired')),
    query: z.string().optional(),
    variables: z.array(createKeyValuePairsSchema(t)).optional(),
    headers: z.array(createKeyValuePairsSchema(t)).optional(),
  });
};
