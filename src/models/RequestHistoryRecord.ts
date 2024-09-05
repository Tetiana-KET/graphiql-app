import { GraphQLFormData } from '@/models/GraphQLFormData';
import { RestFormData } from '@/models/RestFormData';
import { RequestType } from '@/enums/RequestType';

export interface RequestHistoryRecord {
  type: RequestType;
  id: string;
  date: string;
  time: number;
  formData: GraphQLFormData | RestFormData;
}
