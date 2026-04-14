import { MainCard } from '@/components/ui/AppCard';
import AppSection from '@/components/ui/AppSection';
import { Button } from '@/components/ui/shadcn/button';
import { QueryKey } from '@/core/constants/query-key.constant';
import SessionInfoCard from '@/features/session/components/SessionInfoCard';
import { fromApiResult } from '@/lib/query.adapter';
import { useQuery } from '@tanstack/react-query';
import { IoRefresh } from 'react-icons/io5';
import { SessionRemote } from '../data/remote_source/session.remote';
import { useActiveSession } from '../hooks/useActiveSession';

export default function SessionListCard() {
  const { activeSession } = useActiveSession();

  const {
    data: sessions,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: QueryKey.SESSIONS,
    queryFn: () => SessionRemote.getSessions().then(fromApiResult),
    staleTime: 0,
    refetchInterval: (data) => {
      if (!data) return false;

      const initializingSessions =
        data.state.data?.raw?.filter((raw) => !data.state.data?.result.includes(raw)) || [];

      return initializingSessions.length > 0 ? 20_000 : false;
    },
  });

  const initializingSessions = sessions?.raw.filter((raw) => !sessions?.result.includes(raw)) || [];

  const initiatedSession = sessions?.result || [];

  let allSessions = [...initiatedSession, ...initializingSessions];

  if (activeSession?.sessionId) {
    const activeId = activeSession.sessionId;

    allSessions = [activeId, ...allSessions.filter((s) => s !== activeId)];
  }

  return (
    <MainCard className="col-span-4 w-full">
      <AppSection
        title="Daftar Session"
        className="flex w-full flex-col gap-5"
        isLoading={isFetching}
        isError={isError}
        rightHeader={
          <Button size="icon" tooltip="Refresh" onClick={() => refetch()} isLoading={isFetching}>
            <IoRefresh />
          </Button>
        }
      >
        {allSessions.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <span className="text-subtitle text-xs">Belum ada session</span>
          </div>
        ) : (
          allSessions.map((session) => {
            const isInitializing = initializingSessions?.includes(session);

            return (
              <SessionInfoCard
                key={session}
                sessionID={session}
                isInitializing={isInitializing}
                showAction
                showBadgeActivated
              />
            );
          })
        )}
      </AppSection>
    </MainCard>
  );
}
