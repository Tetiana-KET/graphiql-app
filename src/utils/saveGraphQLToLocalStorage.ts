import { DEFAULT_REQUEST_HISTORY_CONTENT } from '@/models/DefaultRequestHistoryContent';
import { GraphQLFormData } from '@/models/FormInterfaces';

export const saveGraphQLToLocalStorage = (requestData: GraphQLFormData) => {
  const requestHistory = JSON.parse(
    localStorage.getItem('request-history') || DEFAULT_REQUEST_HISTORY_CONTENT,
  );

  const requestRecord = {
    url: requestData.URL,
    method: 'POST',
    headers: requestData.headers,
    body: requestData.query,
    variables: requestData.variables,
    sdlUrl: requestData.SDL,
    executionTime: new Date().toISOString(),
  };

  requestHistory.graphQL.push(requestRecord);
  localStorage.setItem('request-history', JSON.stringify(requestHistory));
};
