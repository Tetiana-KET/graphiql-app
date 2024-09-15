import { GraphQLFormData } from '@/models/GraphQLFormData';
import { RestFormData } from '@/models/RestFormData';
import { RequestType } from '@/enums/RequestType';
import { ApiResponse } from '@/models/ApiResponse';
import { RequestHistoryRecord } from '@/models/RequestHistoryRecord';
import { useCallback } from 'react';

const HISTORY_KEY = 'history';

export const useHistory = () => {
  const get = useCallback((): RequestHistoryRecord[] => {
    if (typeof window !== 'undefined') {
      return JSON.parse(window.localStorage.getItem(HISTORY_KEY) || '[]');
    }

    return [];
  }, []);

  const add = <T extends GraphQLFormData | RestFormData>(
    type: RequestType,
    formData: T,
    response: ApiResponse,
  ) => {
    const requestHistory = get();
    const record: RequestHistoryRecord = {
      formData,
      type,
      date: new Date().toISOString(),
      id: response.id,
      time: response.time,
    };

    if (!requestHistory.find(({ id }) => id === record.id)) {
      requestHistory.push(record);
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(HISTORY_KEY, JSON.stringify(requestHistory));
    }
  };

  const clear = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(HISTORY_KEY);
    }
  };

  return { get, add, clear };
};
