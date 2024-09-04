import { RequestKeyValuePairsSchema } from '@/models/BaseFormData';
import { GraphQLFormData } from '@/models/FormInterfaces';

export const urlToGraphQLFormData = (url: string): GraphQLFormData | null => {
  const INDEX_OF_ENDPOINT = 2;

  const [endpointUrlBase64, sdlUrlBase64, bodyBase64] = url
    .split('/')
    .slice(INDEX_OF_ENDPOINT);

  if (!endpointUrlBase64) {
    return null;
  }

  const endpointUrl = atob(endpointUrlBase64);
  const sdl = atob(sdlUrlBase64);
  const body = JSON.parse(atob(bodyBase64));

  const { query, variables } = body;

  const headersQuery = url.split('?')[1] || '';
  const headers: RequestKeyValuePairsSchema[] = headersQuery
    .split('&')
    .map((header) => {
      const [key, value] = header.split('=');
      return { key, value: decodeURIComponent(value) };
    })
    .filter((header) => header.key && header.value);

  const variablesArray: RequestKeyValuePairsSchema[] = Object.entries(
    variables,
  ).map(([key, value]) => ({
    key,
    value: String(value),
  }));

  return {
    URL: endpointUrl,
    SDL: sdl,
    query,
    variables: variablesArray,
    headers,
  };
};
