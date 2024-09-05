import { BaseFormData } from '@/models/BaseFormData';

export interface GraphQLFormData extends BaseFormData {
  url: string;
  sdl: string;
  query: string;
}
