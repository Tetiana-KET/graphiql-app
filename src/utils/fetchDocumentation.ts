import { getIntrospectionQuery } from 'graphql';

export const fetchDocumentation = async (SDL: string) => {
  const SDLRequest = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  };

  try {
    return await fetch(SDL, SDLRequest);
  } catch (error) {
    console.error('GraphQL request failed:', error);
    throw error;
  }
};
