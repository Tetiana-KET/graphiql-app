import { TranslationFunction } from '@/models/AuthInterfaces';
import { ENGLISH_LETTERS_REGEX } from '@/models/EnglishLettersRegex';
import { z } from 'zod';

export const createGraphQLSchema = (t: TranslationFunction) => {
  const RequestKeyValuePairsSchema = z.object({
    key: z
      .string()
      .min(1, t('common:KeyRequired'))
      .regex(ENGLISH_LETTERS_REGEX, t('common:onlyEnglishLetters')),
    value: z
      .string()
      .min(1, t('common:ValueRequired'))
      .regex(ENGLISH_LETTERS_REGEX, t('common:onlyEnglishLetters')),
  });

  const graphQLSchema = z.object({
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
    variables: z.array(RequestKeyValuePairsSchema).optional(),
    headers: z.array(RequestKeyValuePairsSchema).optional(),
  });

  return graphQLSchema;
};
