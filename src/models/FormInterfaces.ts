import {
  BaseFormData,
  RequestKeyValuePairsSchema,
} from '@/models/BaseFormData';

export interface GraphQLFormData extends BaseFormData {
  URL: string;
  SDL: string;
  query: string;
}

export interface GraphQLRequestHistoryRecord {
  URL: string;
  SDL: string;
  query: string;
  variables: RequestKeyValuePairsSchema[];
  headers: RequestKeyValuePairsSchema[];
  type: string;
  requestTime: string;
}
