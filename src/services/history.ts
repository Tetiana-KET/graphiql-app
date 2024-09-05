import { GraphQLFormData } from '@/models/GraphQLFormData';
import { RestFormData } from '@/models/RestFormData';
import { RequestType } from '@/enums/RequestType';
import { RequestHistoryRecord } from '@/models/RequestHistoryRecord';
import { ApiResponse } from '@/models/ApiResponse';

const HISTORY_KEY = 'history';

export class HistoryService {
  static add<T extends GraphQLFormData | RestFormData>(
    type: RequestType,
    formData: T,
    response: ApiResponse,
  ) {
    const requestHistory = HistoryService.get();
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

    localStorage.setItem(HISTORY_KEY, JSON.stringify(requestHistory));
  }

  static get(): RequestHistoryRecord[] {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  }

  static clear() {
    localStorage.removeItem(HISTORY_KEY);
  }
}
