import { ApiResult } from '@/core/api/types/api-response.types';

export async function fromApiResult<T>(result: ApiResult<T>): Promise<T> {
  if (!result.success) {
    throw new Error(result.error ?? 'Unknown error');
  }
  return result.data;
}
