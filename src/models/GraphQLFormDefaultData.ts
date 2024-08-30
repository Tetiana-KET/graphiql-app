export const DEFAULT_GRAPHQL_QUERY = `
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
      image
      maxHP
      maxCP
      attacks {
        special {
          name
          damage
        }
      }
    }
  }
`;

export const DEFAULT_SCHEMA_QUERY = `
  query IntrospectionQuery {
    __schema {
      types {
        name
        kind
        fields {
          name
          type {
            name
            kind
          }
          args {
            name
            type {
              name
              kind
            }
          }
        }
        possibleTypes {
          name
        }
      }
    }
  }
`;

export const DEFAULT_GRAPHQL_URL = 'https://graphql-pokemon2.vercel.app/';
