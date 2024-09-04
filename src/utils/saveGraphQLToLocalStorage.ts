import { DEFAULT_REQUEST_HISTORY_CONTENT } from '@/models/DefaultRequestHistoryContent';
import { GraphQLFormData } from '@/models/FormInterfaces';

export const saveGraphQLToLocalStorage = (requestData: GraphQLFormData) => {
  const requestHistory = JSON.parse(
    localStorage.getItem('request-history') || DEFAULT_REQUEST_HISTORY_CONTENT,
  );

  const requestRecord = {
    URL: requestData.URL,
    SDL: requestData.SDL,
    method: 'POST',
    headers: requestData.headers,
    query: requestData.query,
    variables: requestData.variables,
    requestTime: new Date().toISOString(),
    type: 'graphql',
  };

  requestHistory.requests.push(requestRecord);
  localStorage.setItem('request-history', JSON.stringify(requestHistory));
};
