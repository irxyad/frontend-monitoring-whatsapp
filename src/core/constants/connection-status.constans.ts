export type ConnectionStatus = 'CONNECTED' | 'DISCONNECTED' | 'CONNECTING' | 'INITIALIZING';

export interface IConnectionStatusConfig {
  label: string;
  style: string; // tailwind class
}

export const CONNECTION_STATUS: Record<ConnectionStatus, IConnectionStatusConfig> = {
  CONNECTED: {
    style: 'bg-green-500/20 text-green-500',
    label: 'Terhubung',
  },
  DISCONNECTED: {
    style: 'bg-red-400/20 text-red-400',
    label: 'Terputus',
  },
  CONNECTING: {
    style: 'bg-yellow-500/20 text-yellow-500',
    label: 'Menghubungkan',
  },
  INITIALIZING: {
    style: 'bg-blue-500/20 text-blue-500',
    label: 'Menginisialisasi',
  },
};
