import { BaseFormData } from '@/models/BaseFormData';

export interface GraphQLFormData extends BaseFormData {
  URL: string;
  SDL: string;
  query: string;
}
