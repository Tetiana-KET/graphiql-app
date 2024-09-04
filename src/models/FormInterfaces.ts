import { BaseFormData } from '@/models/BaseFormData';

export interface GraphQLFormData extends BaseFormData {
  URL: string;
  SDL: string;
  query: string;
}

export interface GraphQLRequestHistoryRecord extends GraphQLFormData {
  type: string;
  requestTime: string;
}
