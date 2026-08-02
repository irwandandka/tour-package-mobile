export interface ApiResponse<T> {
  status: string;
  message?: string;
  data: T;
}

export interface ApiErrorBody {
  code?: string;
  message?: string;
}
