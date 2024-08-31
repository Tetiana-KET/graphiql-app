import { TranslationFunction } from '@/models/AuthInterfaces';
import { z } from 'zod';

export const createGraphQLSchema = (t: TranslationFunction) => {
  const RequestKeyValuePairsSchema = z.object({
    key: z.string().min(1, t('common:KeyRequired')),
    value: z.string().min(1, t('common:ValueRequired')),
  });

  const graphQLSchema = z.object({
    URL: z.string().min(1, t('common:URLRequired')),
    SDL: z.string().min(1, t('graphQL:SDLRequired')),
    query: z.string().optional(),
    variables: z.array(RequestKeyValuePairsSchema).optional(),
    headers: z.array(RequestKeyValuePairsSchema).optional(),
  });
  return graphQLSchema;
};
