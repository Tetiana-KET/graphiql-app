import { GraphQLFormData } from '@/models/FormInterfaces';

export const graphQLDataToURL = (formData: GraphQLFormData): string => {
  const baseUrl = 'graphql';

  const endpointUrlBase64 = btoa(formData.URL);
  const body = JSON.stringify({
    query: formData.query.trim(),
    variables: formData.variables.reduce(
      (acc: Record<string, string>, variable) => {
        acc[variable.key] = variable.value;
        return acc;
      },
      {},
    ),
  });
  const bodyBase64 = btoa(body);

  const headersQuery = formData.headers
    .map((header) => `${header.key}=${header.value}`)
    .join('&');

  let url = `${baseUrl}/${endpointUrlBase64}/${bodyBase64}`;

  if (headersQuery) {
    url += `?${headersQuery}`;
  }

  return url;
};
