import { getIntrospectionQuery } from 'graphql';

export const fetchDocumentation = async () => {
  const urlParts = window.location.pathname.split('/');

  if (urlParts[urlParts.length - 1] === 'graphql') {
    return null;
  }

  const encodedSDLLink = urlParts[3];

  if (!encodedSDLLink) {
    throw new Error('Encoded SDL link not found in URL');
  }

  const sdlLink = atob(encodedSDLLink);

  const SDLRequest = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  };

  try {
    const response = await fetch(sdlLink, SDLRequest);
    return response;
  } catch (error) {
    console.error('GraphQL request failed:', error);
    throw error;
  }
};
