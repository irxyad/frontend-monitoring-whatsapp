import { apiGet } from '@/core/api/config/http-client';
import { ApiResult } from '@/core/api/types/api-response.types';
import {
  GetQRResult,
  GetSessionsResult,
  GetSessionStatusResult,
  StartSessionResult,
} from '../../domain/types/session.type';
import { SESSION_ENDPOINTS } from './session.endpoint';

//  Start session atau reconnect session yang sudah ada
async function startSession(sessionID: string): Promise<ApiResult<StartSessionResult>> {
  return apiGet(SESSION_ENDPOINTS.START, {
    params: { sessionId: sessionID },
  });
}

// Stop session yang sedang berjalan
async function stopSession(sessionID: string): Promise<ApiResult<string>> {
  return apiGet<string>(SESSION_ENDPOINTS.STOP, {
    params: { sessionId: sessionID },
  });
}

// Restart session yang sedang berjalan (untuk refresh QR code)
async function restartSession(sessionID: string): Promise<ApiResult<string>> {
  return apiGet<string>(SESSION_ENDPOINTS.RESTART, {
    params: { sessionId: sessionID },
  });
}

// Terminate session
async function terminateSession(sessionID: string): Promise<ApiResult<string>> {
  return apiGet<string>(SESSION_ENDPOINTS.TERMINATE, {
    params: { sessionId: sessionID },
  });
}

// Cek status session (CONNECTED, DISCONNECTED, dll)
async function getSessionStatus(sessionID: string): Promise<ApiResult<GetSessionStatusResult>> {
  return apiGet<GetSessionStatusResult>(SESSION_ENDPOINTS.STATUS, {
    params: { sessionId: sessionID },
  });
}

// Untuk mendapatkan semua daftar session
async function getSessions(): Promise<ApiResult<GetSessionsResult>> {
  return apiGet<GetSessionsResult>(SESSION_ENDPOINTS.LIST);
}

// Untuk mendapatkan QR session yang akan di scan di device wa
async function getQr(sessionID: string): Promise<ApiResult<GetQRResult>> {
  return apiGet(SESSION_ENDPOINTS.QRCODE, {
    params: { sessionId: sessionID },
  });
}

export const SessionRemote = {
  startSession,
  stopSession,
  restartSession,
  terminateSession,
  getSessionStatus,
  getSessions,
  getQr,
};
