import { DEFAULT_REQUEST_HISTORY_CONTENT } from '@/models/DefaultRequestHistoryContent';
import { GraphQLRequestHistoryRecord } from '@/models/FormInterfaces';

export const getRequestHistory = (): GraphQLRequestHistoryRecord[] => {
  const requestHistory = JSON.parse(
    localStorage.getItem('request-history') || DEFAULT_REQUEST_HISTORY_CONTENT,
  );

  return requestHistory.requests || [];
};
