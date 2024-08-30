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
    const response = await fetch(SDL, SDLRequest);
    return response;
  } catch (error) {
    console.error('GraphQL request failed:', error);
    throw error;
  }
};
