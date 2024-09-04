import { DEFAULT_REQUEST_HISTORY_CONTENT } from '@/models/DefaultRequestHistoryContent';
import { GraphQLFormData } from '@/models/FormInterfaces';

interface SaveGraphQLToLocalStorageProps {
  formData: GraphQLFormData;
}

export const saveGraphQLToLocalStorage = ({
  formData,
}: SaveGraphQLToLocalStorageProps) => {
  const requestHistory = JSON.parse(
    localStorage.getItem('request-history') || DEFAULT_REQUEST_HISTORY_CONTENT,
  );

  const requestRecord = {
    URL: formData.URL,
    SDL: formData.SDL,
    method: 'POST',
    headers: formData.headers,
    query: formData.query,
    variables: formData.variables,
    requestTime: new Date().toISOString(),
    type: 'graphql',
  };

  requestHistory.requests.push(requestRecord);
  localStorage.setItem('request-history', JSON.stringify(requestHistory));
};
