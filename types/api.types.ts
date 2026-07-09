export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  success?: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  fieldErrors?: Record<string, string[]>;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiRequestOptions<T = unknown> {
  method: HttpMethod;
  path: string;
  data?: T;
  params?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
}
