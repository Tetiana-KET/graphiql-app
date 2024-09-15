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

export const DEFAULT_REST_URL = 'https://jsonplaceholder.typicode.com/posts';
export const DEFAULT_REST_METHOD = RestMethod.Post;
export const DEFAULT_REST_VARIABLES = [{ key: 'id', value: '1' }];
export const DEFAULT_REST_BODY = `{
  "title": "foo",
  "body": "bar",
  "userId": "{{id}}"
}`;
