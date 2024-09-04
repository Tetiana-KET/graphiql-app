import { getIntrospectionQuery } from 'graphql';
import { enqueueSnackbar } from 'notistack';

// eslint-disable-next-line consistent-return
export const fetchDocumentation = async () => {
  const urlParts = window.location.pathname.split('/');

  if (urlParts[urlParts.length - 1] === 'graphql') {
    return null;
  }

  const encodedSDLLink = urlParts[3];

  if (!encodedSDLLink) {
    enqueueSnackbar('Encoded SDL link not found in URL', {
      variant: 'error',
    });
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
    enqueueSnackbar(`GraphQL request failed with error: ${error}`, {
      variant: 'info',
    });
  }
};
