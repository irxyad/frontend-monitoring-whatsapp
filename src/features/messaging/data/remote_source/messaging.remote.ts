import { apiGet, apiPost } from '@/core/api/config/http-client';
import { ApiResult } from '@/core/api/types/api-response.types';
import { ChatMessageInfo } from '../../domain/types/messaging.type';
import { SendMessageDto } from '../dto/messaging.dto';
import { MESSAGING_ENDPOINTS } from './messaging.endpoint';

// untuk mendapatkan semua pesan dari chat
async function getChats(sessionID: string): Promise<ApiResult<ChatMessageInfo[]>> {
  const result = await apiGet<{ chats: Array<any> }>(MESSAGING_ENDPOINTS.GET_CHATS, {
    params: { sessionId: sessionID },
  });

  if (result.success) {
    const chats = result.data.chats.filter((chat) => chat.lastMessage !== undefined || null);
    return { success: true, data: chats };
  }

  return { success: false, error: result.error };
}

// mengirim pesan
async function sendMessage(
  sessionID: string,
  body: SendMessageDto
): Promise<ApiResult<ChatMessageInfo[]>> {
  return apiPost(
    MESSAGING_ENDPOINTS.SEND_MESSAGE,
    JSON.stringify({ ...body, contentType: 'string' }),
    {
      params: { sessionId: sessionID },
    }
  );
}

// Untuk mendapatkan jumlah chat termasuk chat personal dan group
async function getTotalChats(sessionID: string): Promise<ApiResult<number>> {
  const result = await apiGet<{ chats: Array<any> }>(MESSAGING_ENDPOINTS.GET_CHATS, {
    params: { sessionId: sessionID },
  });

  if (result.success) {
    const chats = result.data.chats;
    return { success: true, data: chats.length };
  }

  return { success: false, error: result.error };
}

export const MessagingRemote = { getChats, sendMessage, getTotalChats };
