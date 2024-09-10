import {
  DEFAULT_GRAPHQL_QUERY,
  DEFAULT_GRAPHQL_URL,
} from '@/consts/defaultFormData';
import { ApiResponse } from '@/models/ApiResponse';
import { GraphQLFormData } from '@/models/GraphQLFormData';

export const GraphQLFormDataMock: GraphQLFormData = {
  url: DEFAULT_GRAPHQL_URL,
  sdl: `${DEFAULT_GRAPHQL_URL}?sdl`,
  query: DEFAULT_GRAPHQL_QUERY,
  headers: [{ key: 'id', value: '1' }],
  variables: [{ key: 'gender', value: 'male' }],
};

export const mockDocumentationResponse: ApiResponse = {
  data: {
    data: {
      __schema: 'schema info',
    },
  },
  id: '3wlql6lptzb',
  status: 200,
  error: null,
  time: 135,
};

export const mockEmptyDocumentationResponse: ApiResponse = {
  data: null,
  id: '3wlql6lptzb',
  status: 404,
  error: null,
  time: 135,
};
