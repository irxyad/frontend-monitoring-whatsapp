import ConnectionBadge from '@/components/ui/ConnectionBadge';
import { ServerIcon } from 'lucide-react';
import { getStatusServer } from '../domain/utils/ping-status.utils';
import { usePing } from '../hooks/use-ping';

export default function StatusServerCard() {
  const { message, loading } = usePing();
  const status = getStatusServer(message, loading);

  return (
    <div className="flex items-center gap-3">
      <ServerIcon className="size-4" />
      <h3>Status Server:</h3>
      <ConnectionBadge connection={status} />
    </div>
  );
}
