// services/auth.service.ts
import { apiPost } from '@/core/api/config/http-client';
import { ApiResult } from '@/core/api/types/api-response.types';
import { LoginDto } from '../dto/auth.dto';
import { AUTH_ENDPOINTS } from './auth.endpoint';

async function login(credentials: LoginDto): Promise<ApiResult<string>> {
  return apiPost(AUTH_ENDPOINTS.LOGIN, JSON.stringify(credentials));
}

export const AuthRemote = {
  login,
};
