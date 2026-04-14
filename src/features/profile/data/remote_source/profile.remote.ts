import { apiPost } from '@/core/api/config/http-client';
import { ApiResult } from '@/core/api/types/api-response.types';
import { WHATSAPP_ID_SUFFIX } from '@/core/constants/whatsapp.constant';
import { ISessionContext } from '@/core/types/session-context.type';
import { PROFILE_ENDPOINTS } from './profile.endpoint';

async function getProfilePic(context: ISessionContext): Promise<ApiResult<string>> {
  const result = await apiPost<{ result: string }>(
    PROFILE_ENDPOINTS.GET_PROFILE_PIC,
    JSON.stringify({ contactId: context.contactId + WHATSAPP_ID_SUFFIX.USER }),
    {
      params: { sessionId: context.sessionId },
    }
  );

  if (result.success) {
    const url = result.data.result;
    return { success: true, data: url };
  }

  return { success: false, error: result.error };
}

export const ProfileRemote = { getProfilePic };
