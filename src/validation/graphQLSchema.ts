import { TranslationFunction } from '@/models/AuthInterfaces';
import { ENGLISH_LETTERS_REGEX } from '@/models/EnglishLettersRegex';
import { createKeyValuePairsSchema } from '@/validation/keyValuePairsSchema';
import { z } from 'zod';

export const createGraphQLSchema = (t: TranslationFunction) => {
  return z.object({
    URL: z
      .string()
      .min(1, t('common:URLRequired'))
      .regex(ENGLISH_LETTERS_REGEX, t('common:onlyEnglishLetters')),
    SDL: z
      .string()
      .min(1, t('graphQL:SDLRequired'))
      .regex(ENGLISH_LETTERS_REGEX, t('common:onlyEnglishLetters')),
    query: z
      .string()
      .min(1, t('graphQL:queryRequired'))
      .regex(ENGLISH_LETTERS_REGEX, t('common:onlyEnglishLetters')),
    variables: z.array(createKeyValuePairsSchema(t)).optional(),
    headers: z.array(createKeyValuePairsSchema(t)).optional(),
  });
};
