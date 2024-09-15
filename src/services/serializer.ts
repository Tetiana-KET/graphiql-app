import { GraphQLFormData } from '@/models/GraphQLFormData';
import { RestFormData } from '@/models/RestFormData';
import { RequestKeyValuePairsSchema } from '@/models/BaseFormData';
import { RequestType } from '@/enums/RequestType';
import { RequestBody, RequestParams } from '@/models/RequestParams';
import { RestMethod } from '@/enums/RestMethod';

interface DeserializedData<T extends GraphQLFormData | RestFormData> {
  formData: T;
  request: RequestInit;
}

const METHODS_WITH_BODY = [RestMethod.Post, RestMethod.Put, RestMethod.Patch];

const getFormData = <T extends GraphQLFormData | RestFormData>(
  type: RequestType,
  { method, url, headers, body, sdl }: RequestParams,
): T => {
  const { query, variables } = body;

  const formHeaders: RequestKeyValuePairsSchema[] = Object.entries(headers)
    .map(([key, value]) => ({ key, value: decodeURIComponent(value) }))
    .filter((header) => header.key && header.value);

  const formVariables: RequestKeyValuePairsSchema[] = Object.entries(
    variables,
  ).map(([key, value]) => ({
    key,
    value: String(value),
  }));

  const formData = {
    url,
    variables: formVariables,
    headers: formHeaders,
  };

  if (type === RequestType.GraphQL) {
    (formData as GraphQLFormData).sdl = sdl || '';
    (formData as GraphQLFormData).query = query;
  } else {
    (formData as RestFormData).method = method;
    (formData as RestFormData).body = query;
  }

  return formData as T;
};

const getRequest = (
  method: RestMethod,
  headers: Record<string, string>,
  body: string,
): RequestInit => {
  const request: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (METHODS_WITH_BODY.includes(method)) {
    request.body = body;
  }

  return request;
};

export class SerializerService {
  public static serialize<T extends GraphQLFormData | RestFormData>(
    type: RequestType,
    formData: T,
  ): string {
    const endpointUrlBase64 = btoa(formData.url);
    let sdlUrlBase64 = '';
    let query: string;
    let method: string = '';

    if (type === RequestType.GraphQL) {
      sdlUrlBase64 = btoa((formData as GraphQLFormData).sdl);
      query = (formData as GraphQLFormData).query?.trim() || '';
    } else {
      method = (formData as RestFormData).method;
      query = (formData as RestFormData).body?.trim() || '';
    }

    const variables = formData.variables.reduce(
      (acc: Record<string, string>, variable) => {
        acc[variable.key] = variable.value;
        return acc;
      },
      {},
    );

    const body = JSON.stringify({
      query,
      variables,
    });
    const bodyBase64 = btoa(body);

    const headersQuery = formData.headers
      .map((header) => `${header.key}=${encodeURIComponent(header.value)}`)
      .join('&');

    const paths = [
      type,
      method,
      endpointUrlBase64,
      bodyBase64,
      sdlUrlBase64,
    ].filter(Boolean);

    return `/${paths.join('/')}${headersQuery ? `?${headersQuery}` : ''}`;
  }

  public static deserialize<T extends GraphQLFormData | RestFormData>(
    type: RequestType,
    params: string[],
    headers: Record<string, string>,
  ): DeserializedData<T> | null {
    let method: RestMethod = RestMethod.Post;
    let endpointUrlBase64: string;
    let bodyBase64: string;
    let sdlUrlBase64: string = '';

    const decodedParams = params.map((param) => decodeURIComponent(param));
    if (type === RequestType.GraphQL) {
      [endpointUrlBase64, bodyBase64, sdlUrlBase64] = decodedParams;
    } else {
      [method, endpointUrlBase64, bodyBase64] = decodedParams as [
        RestMethod,
        string,
        string,
      ];
    }

    if (!endpointUrlBase64) {
      return null;
    }

    let url: string;
    let bodyJson: string;
    let sdl: string | null = null;
    let body: RequestBody;
    let requestParams: RequestParams | null;

    try {
      url = atob(endpointUrlBase64);
      bodyJson = atob(bodyBase64);
      if (type === RequestType.GraphQL) {
        sdl = atob(sdlUrlBase64);
      }

      body = JSON.parse(bodyJson || '{}');
      requestParams = { method, url, headers, body, sdl };
    } catch {
      return null;
    }

    if (type === RequestType.Rest) {
      bodyJson = body.query;

      Object.entries(body.variables).forEach(([key, value]) => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        bodyJson = bodyJson.replace(regex, value);
      });
    }

    return {
      formData: getFormData<T>(type, requestParams),
      request: getRequest(method, headers, bodyJson),
    };
  }
}
