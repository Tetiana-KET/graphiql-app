import { RestMethod } from '@/models/RestMethod.enum';
import { BaseFormData } from '@/models/BaseFormData';

export interface RestFormData extends BaseFormData {
  method: RestMethod;
  url: string;
  body: string;
  params: Record<string, string>;
}
