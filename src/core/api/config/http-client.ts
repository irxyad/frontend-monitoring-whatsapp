import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse, ApiResult } from '../types/api-response.types';
import { parseApiResponse } from '../utils/parse-api-response';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';
const API_KEY = import.meta.env.VITE_API_KEY ?? '';

const httpClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  // timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  },
});

// Request interceptor — attach auth token if present
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — normalize all responses
httpClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => response,
  (error) => {
    const serverError: ApiResponse = error.response?.data ?? {
      success: false,
      error: error.message ?? 'Network error',
    };
    return Promise.reject(serverError);
  }
);

/** Record biasa untuk path params: { sessionId: 'abc', userId: '123' } */
type PathParams = Record<string, string | number>;

/** Record biasa untuk query params: { page: 1, limit: 10 } */
type QueryParams = Record<string, string | number | boolean | undefined>;

interface RequestOptions {
  params?: PathParams;
  query?: QueryParams;
}

/**
 * Replace path params dalam URL
 * buildPath('/session/:sessionId/chat/:chatId', { sessionId: 'abc', chatId: '123' })
 * → '/session/abc/chat/123'
 */
function buildPath(path: string, params?: PathParams): string {
  if (!params) return path;

  const builtPath = Object.entries(params).reduce<string>(
    (acc, [key, value]) => acc.replace(`:${key}`, String(value)),
    path
  );
  return builtPath;
}

/**
 * Filter undefined dari query object sebelum dikirim ke axios
 */
function cleanQuery(query?: QueryParams): QueryParams | undefined {
  if (!query) return undefined;
  return Object.fromEntries(Object.entries(query).filter(([, v]) => v !== undefined));
}

/**
 * Typed GET request
 * @example
 * apiGet<Session>('/session/:sessionId', { params: { sessionId: 'abc' } })
 * apiGet<Session[]>('/session', { query: { sessionCount: 2 } })
 */
export async function apiGet<T>(path: string, options?: RequestOptions): Promise<ApiResult<T>> {
  try {
    const url = buildPath(path, options?.params);

    const response = await httpClient.get<ApiResponse<T>>(url, {
      params: cleanQuery(options?.query),
    });
    return parseApiResponse(response.data);
  } catch (raw: unknown) {
    return parseApiResponse(raw as ApiResponse<T>);
  }
}

/**
 * Typed POST request
 * @example
 * apiPost<Message>('/client/sendMessage/:sessionId', body, { params: { sessionId: 'abc' } })
 */
export async function apiPost<T>(
  path: string,
  body?: unknown,
  options?: RequestOptions
): Promise<ApiResult<T>> {
  try {
    const url = buildPath(path, options?.params);
    const response = await httpClient.post<ApiResponse<T>>(url, body, {
      params: cleanQuery(options?.query),
    });
    return parseApiResponse(response.data);
  } catch (raw: unknown) {
    return parseApiResponse(raw as ApiResponse<T>);
  }
}

/**
 * Typed PUT request
 * @example
 * apiPut<User>('/user/:userId', body, { params: { userId: '123' } })
 */
export async function apiPut<T>(
  path: string,
  body?: unknown,
  options?: RequestOptions
): Promise<ApiResult<T>> {
  try {
    const url = buildPath(path, options?.params);
    const response = await httpClient.put<ApiResponse<T>>(url, body, {
      params: cleanQuery(options?.query),
    });
    return parseApiResponse(response.data);
  } catch (raw: unknown) {
    return parseApiResponse(raw as ApiResponse<T>);
  }
}

/**
 * Typed DELETE request
 * @example
 * apiDelete<void>('/session/:sessionId', { params: { sessionId: 'abc' } })
 */
export async function apiDelete<T>(path: string, options?: RequestOptions): Promise<ApiResult<T>> {
  try {
    const url = buildPath(path, options?.params);
    const response = await httpClient.delete<ApiResponse<T>>(url, {
      params: cleanQuery(options?.query),
    });
    return parseApiResponse(response.data);
  } catch (raw: unknown) {
    return parseApiResponse(raw as ApiResponse<T>);
  }
}

export default httpClient;
