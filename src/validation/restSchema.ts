import { TranslationFunction } from '@/models/AuthInterfaces';
import { z } from 'zod';
import { createKeyValuePairsSchema } from '@/validation/keyValuePairsSchema';
import { RestMethod } from '@/enums/RestMethod';
import { LATIN_REGEX } from '@/consts/validation';

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);

type Literal = z.infer<typeof literalSchema>;

type Json = Literal | { [key: string]: Json } | Json[];

const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
);

export const json = () => jsonSchema;

export const createRestSchema = (t: TranslationFunction) => {
  return z.object({
    url: z
      .string()
      .trim()
      .min(1, t('common:URLRequired'))
      .url(t('common:URLError'))
      .regex(LATIN_REGEX, t('common:onlyLatin')),
    method: z.nativeEnum(RestMethod, {
      errorMap: () => ({ message: t('rest:methodRequired') }),
    }),
    body: z
      .string()
      .trim()
      .regex(LATIN_REGEX, t('common:onlyLatin'))
      .transform((str, ctx): z.infer<ReturnType<typeof json>> => {
        try {
          JSON.parse(str || '{}');
          return str;
        } catch (e) {
          ctx.addIssue({ code: 'custom', message: t('rest:invalidBody') });
          return z.NEVER;
        }
      })
      .optional(),
    variables: z.array(createKeyValuePairsSchema(t)).optional(),
    headers: z.array(createKeyValuePairsSchema(t)).optional(),
  });
};
