export const DEFAULT_GRAPHQL_QUERY = `
query Query {
  allFilms {
    films {
      title
      director
      releaseDate
      speciesConnection {
        species {
          name
          classification
          homeworld {
            name
          }
        }
      }
    }
  }
}
`;

export const DEFAULT_GRAPHQL_URL =
  'https://swapi-graphql.netlify.app/.netlify/functions/index';
