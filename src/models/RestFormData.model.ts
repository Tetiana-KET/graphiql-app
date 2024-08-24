import { RestMethod } from '@/models/RestMethod.enum';

export interface RestFormData {
  method: RestMethod;
  url: string;
  headers: Record<string, string>;
  body?: string;
  variables?: Record<string, string>;
  params?: Record<string, string>;
}
