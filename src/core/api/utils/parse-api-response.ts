import { ApiResponse, ApiResult } from '../types/api-response.types';

/**
 * Normalizes any backend response shape into a consistent ApiResult.
 * Handles: { success, message } | { success, error } | { success, result }
 */
export function parseApiResponse<T>(raw: ApiResponse<T>): ApiResult<T> {
  if (!raw.success) {
    return {
      success: false,
      error: raw.error ?? raw.message ?? 'Unknown error occurred',
    };
  }

  const data = raw as T;

  return { success: true, data };
}
