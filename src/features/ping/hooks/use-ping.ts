import { AppConstants } from '@/core/constants/app.constant';
import { useEffect, useState } from 'react';
import { pingRemote } from '../data/remote_source/ping.remote';

export function usePing() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const ping = async () => {
    setLoading(true);
    const result = await pingRemote();

    if (result.success) {
      setMessage(result.data.message);
    } else {
      setMessage(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    const interval = setInterval(ping, AppConstants.PING_INTERVAL_MS);
    ping();
    return () => clearInterval(interval);
  }, []);

  return { message, loading };
}
