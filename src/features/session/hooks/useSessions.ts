import { QueryKey } from '@/core/constants/query-key.constant';
import { fromApiResult } from '@/lib/query.adapter';
import { useQuery } from '@tanstack/react-query';
import { SessionRemote } from '../data/remote_source/session.remote';

// untuk mendapatkan daftar session dari cache
export function useSessions() {
  const { data, ...rest } = useQuery({
    queryKey: QueryKey.SESSIONS,
    queryFn: () => SessionRemote.getSessions().then(fromApiResult),
  });

  const sessions = Array.isArray(data?.result) ? data.result : [];

  return {
    sessions,
    ...rest,
  };
}
