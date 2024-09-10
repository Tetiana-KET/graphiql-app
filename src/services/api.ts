import { ApiResponse } from '@/models/ApiResponse';
import { RestMethod } from '@/enums/RestMethod';

const ID_RADIX = 36;
const ID_OFFSET = 2;
const EMPTY_METHODS: RestMethod[] = [RestMethod.Head, RestMethod.Options];

export class ApiService {
  static async fetch(url: string, request: RequestInit): Promise<ApiResponse> {
    const id = Math.random().toString(ID_RADIX).substring(ID_OFFSET);
    let data: object | null = null;
    let status: number | null = null;
    let time: number = new Date().getTime();
    let error: string | null = null;

    try {
      const response = await fetch(url, request);
      status = response.status;
      data = EMPTY_METHODS.includes(request.method as RestMethod)
        ? {}
        : await response.json();
    } catch (err) {
      error = JSON.parse(JSON.stringify(err));
    } finally {
      time = new Date().getTime() - time;
    }

    return Promise.resolve({ id, data, status, time, error });
  }
}
