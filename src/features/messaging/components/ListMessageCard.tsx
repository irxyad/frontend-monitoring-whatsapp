import { MainCard } from '@/components/ui/AppCard';
import AppSection from '@/components/ui/AppSection';
import { Button } from '@/components/ui/shadcn/button';
import { QueryKey } from '@/core/constants/query-key.constant';
import { useActiveSession } from '@/features/session/hooks/useActiveSession';
import { fromApiResult } from '@/lib/query.adapter';
import { useQuery } from '@tanstack/react-query';
import { IoRefresh } from 'react-icons/io5';
import { MessagingRemote } from '../data/remote_source/messaging.remote';
import MessageInfoCard from './MessageInfoCard';

export default function ListMessageCard({ className }: { className?: string }) {
  const { activeSession } = useActiveSession();

  const {
    data: messages,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: [...QueryKey.CHATS, activeSession?.sessionId],
    queryFn: () => MessagingRemote.getChats(activeSession?.sessionId ?? '').then(fromApiResult),
  });

  return (
    <MainCard className={className}>
      <AppSection
        title={`Daftar Pesan (${messages?.length ?? 0})`}
        className="flex w-full flex-col gap-5"
        isLoading={isFetching}
        isError={isError}
        rightHeader={
          <Button size="icon" tooltip="Refresh" onClick={() => refetch()} isLoading={isFetching}>
            <IoRefresh />
          </Button>
        }
      >
        {messages && messages?.length > 0 ? (
          messages?.map((message) => (
            <MessageInfoCard message={message} sessionID={activeSession?.sessionId ?? ''} />
          ))
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <span className="text-subtitle text-xs">Belum ada pesan</span>
          </div>
        )}
      </AppSection>
    </MainCard>
  );
}
