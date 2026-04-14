import { ConnectionStatus } from '@/core/constants/connection-status.constans';

export const getStatusServer = (
  message: string | null,
  isConnecting: boolean
): ConnectionStatus => {
  if (isConnecting) {
    return 'CONNECTING';
  }

  return message && message === 'pong' ? 'CONNECTED' : 'DISCONNECTED';
};
