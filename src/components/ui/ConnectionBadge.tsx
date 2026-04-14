import { CONNECTION_STATUS, ConnectionStatus } from '@/core/constants/connection-status.constans';
import { cn } from '@/lib/utils/cn.utils';

export default function ConnectionBadge({ connection }: { connection: ConnectionStatus }) {
  const status = CONNECTION_STATUS[connection];

  return (
    <div className={cn(status.style, 'flex h-fit w-fit items-center gap-1 rounded-2xl px-3 py-1')}>
      <svg width="8" height="8" viewBox="0 0 8 8">
        <circle cx="4" cy="4" r="4" className="fill-current" />
      </svg>
      <p>{status.label}</p>
    </div>
  );
}
