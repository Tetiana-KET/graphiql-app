import { GraphQLFormData } from '@/models/FormInterfaces';

export const graphQLToURL = (formData: GraphQLFormData) => {
  const baseUrl = 'graphql';
  const endpointUrlBase64 = btoa(formData.URL);
  const sdlUrlBase64 = btoa(formData.SDL);
  const body = JSON.stringify({
    query: formData.query ? formData.query.trim() : '',
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
    .map((header) => `${header.key}=${encodeURIComponent(header.value)}`)
    .join('&');

  let url = `/${baseUrl}/${endpointUrlBase64}/${sdlUrlBase64}/${bodyBase64}`;

  if (headersQuery) {
    url += `?${headersQuery}`;
  }
  return url;
};
