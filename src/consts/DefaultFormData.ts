import { RestMethod } from '@/enums/RestMethod';

export const DEFAULT_GRAPHQL_QUERY = `query Query($code: ID!) {
  country(code: $code) {
    name
    native
    capital
    emoji
    currency
    languages {
      code
      name
    }
  }
}`;

export const DEFAULT_GRAPHQL_URL = 'https://countries.trevorblades.com/graphql';

export const DEFAULT_GRAPHQL_VARIABLES = [{ key: 'code', value: 'US' }];

export const DEFAULT_REST_URL = 'https://rickandmortyapi.com/api/character/1';
export const DEFAULT_REST_METHOD = RestMethod.Get;
