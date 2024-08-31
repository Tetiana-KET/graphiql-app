export const fetchGraphQLData = async (url: string) => {
  const urlParts = url.split('/');
  const encodedEndpoint = urlParts[urlParts.length - 2];
  const encodedBody = urlParts[urlParts.length - 1].split('?')[0];
  const queryParams = new URLSearchParams(url.split('?')[1]);

  const endpoint = atob(encodedEndpoint);
  const bodyJson = atob(encodedBody);
  const body = JSON.parse(bodyJson);

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

  try {
    const response = await fetch(endpoint, graphqlRequest);
    return response;
  } catch (error) {
    console.error('GraphQL request failed:', error);
    throw error;
  }
};
