import {
  DEFAULT_GRAPHQL_QUERY,
  DEFAULT_GRAPHQL_URL,
} from '@/consts/DefaultFormData';
import { GraphQLFormData } from '@/models/GraphQLFormData';

export const GraphQLFormDataMock: GraphQLFormData = {
  url: DEFAULT_GRAPHQL_URL,
  sdl: `${DEFAULT_GRAPHQL_URL}?sdl`,
  query: DEFAULT_GRAPHQL_QUERY,
  headers: [{ key: 'id', value: '1' }],
  variables: [{ key: 'gender', value: 'male' }],
};
