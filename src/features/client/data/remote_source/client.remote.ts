import { apiGet, apiPost } from '@/core/api/config/http-client';
import { ApiResult } from '@/core/api/types/api-response.types';
import { WHATSAPP_ID_SUFFIX } from '@/core/constants/whatsapp.constant';
import { ClassInfoClient, TotalDevice } from '../../domain/types/client.type';
import { CLIENT_ENDPOINTS } from './client.endpoint';

// Untuk mendapatkan informasi tentang session
async function getClassInfo(sessionID: string): Promise<ApiResult<ClassInfoClient>> {
  return apiGet(CLIENT_ENDPOINTS.GET_CLASS_INFO, {
    params: { sessionId: sessionID },
  });
}

// untuk mendapatkan total device yang terhubung dengan akun wa
async function getTotalDevices({
  sessionID,
  phoneNumber,
}: {
  sessionID: string;
  phoneNumber: string;
}): Promise<ApiResult<TotalDevice>> {
  return apiPost(
    CLIENT_ENDPOINTS.GET_DEVICE_COUNT,
    JSON.stringify({
      userId: `${phoneNumber}${WHATSAPP_ID_SUFFIX.USER}`,
    }),
    {
      params: { sessionId: sessionID },
    }
  );
}

export const ClientRemote = { getClassInfo, getTotalDevices };
