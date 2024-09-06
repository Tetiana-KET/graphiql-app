import { RestMethod } from '@/enums/RestMethod';

export interface RequestBody {
  query: string;
  variables: Record<string, string>;
}

export interface RequestParams {
  method: RestMethod;
  url: string;
  headers: Record<string, string>;
  body: RequestBody;
  sdl?: string | null;
}
