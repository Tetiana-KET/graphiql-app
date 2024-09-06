import { RestMethod } from '@/enums/RestMethod';
import { BaseFormData } from '@/models/BaseFormData';

export interface RestFormData extends BaseFormData {
  method: RestMethod;
  url: string;
  body: string;
}
