import { apiGet } from '@/core/api/config/http-client';
import { ApiResult } from '@/core/api/types/api-response.types';
import { PingResult } from '../../domain/types/ping-result.type';
import { PING_ENDPOINTS } from './ping.endpoint';

export async function pingRemote(): Promise<ApiResult<PingResult>> {
  return apiGet<PingResult>(PING_ENDPOINTS.PING);
}
