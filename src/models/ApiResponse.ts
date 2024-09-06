export interface ApiResponse {
  id: string;
  data: object | null;
  status: number | null;
  time: number;
  error: unknown | null;
}
