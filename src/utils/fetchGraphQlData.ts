import { enqueueSnackbar } from 'notistack';

// eslint-disable-next-line consistent-return
export const fetchGraphQLData = async () => {
  const urlParts = window.location.href.split('/');

  if (urlParts[urlParts.length - 1] === 'graphql') {
    return null;
  }

  const encodedEndpoint = urlParts[urlParts.length - 2];
  const encodedBody = urlParts[urlParts.length - 1].split('?')[0];

  try {
    const endpoint = atob(encodedEndpoint);
    const bodyJson = atob(encodedBody);
    const body = JSON.parse(bodyJson);

    const queryParams = new URLSearchParams(window.location.search);
    const headers: Record<string, string> = {};
    queryParams.forEach((value, key) => {
      headers[key] = value;
    });

    const graphqlRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(endpoint, graphqlRequest);
    return response;
  } catch (error) {
    enqueueSnackbar(`GraphQL request failed: ${error}`, {
      variant: 'error',
    });
  }
};
