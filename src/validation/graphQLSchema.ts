import { z } from 'zod';
import { GraphQLSchemaErrorMessages } from './graphQLSchema.enum';

const RequestKeyValuePairsSchema = z.object({
  key: z.string().min(1, GraphQLSchemaErrorMessages.KeyRequired),
  value: z.string().min(1, GraphQLSchemaErrorMessages.ValueRequired),
});

export const graphQLSchema = z.object({
  URL: z.string().min(1, GraphQLSchemaErrorMessages.URLRequired),
  SDL: z.string({ required_error: GraphQLSchemaErrorMessages.SDLRequired }),
  query: z.string().optional(),
  variables: z.array(RequestKeyValuePairsSchema).optional(),
  headers: z.array(RequestKeyValuePairsSchema).optional(),
});
