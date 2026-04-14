import { MainCard } from '@/components/ui/AppCard';
import AppSection from '@/components/ui/AppSection';
import { Button } from '@/components/ui/shadcn/button';
import { Spinner } from '@/components/ui/shadcn/spinner';
import { formatCompactNumber } from '@/core/api/utils/format-compact-number';
import { QueryKey } from '@/core/constants/query-key.constant';
import { ClientRemote } from '@/features/client/data/remote_source/client.remote';
import { ContactRemote } from '@/features/contact/data/remote_source/contact.remote';
import { MessagingRemote } from '@/features/messaging/data/remote_source/messaging.remote';
import { SessionLocal } from '@/features/session/data/local_source/session.local';
import { fromApiResult } from '@/lib/query.adapter';
import { queryClient } from '@/lib/query.client';
import { useQuery } from '@tanstack/react-query';
import { IoRefresh } from 'react-icons/io5';

export default function StatisticCard() {
  const sessionLocal = SessionLocal.get();

  // dapatkan total chat
  const { data: totalChats, isFetching: isFetchingChats } = useQuery({
    queryKey: [...QueryKey.STATISTIC_DASHBOARD.CHATS, sessionLocal?.sessionId],
    queryFn: () => {
      if (!sessionLocal?.sessionId) return null;

      return MessagingRemote.getTotalChats(sessionLocal?.sessionId).then(fromApiResult);
    },
  });

  // dapatkan total kontak di device akun wa
  const { data: totalContacts, isFetching: isFetchingContacts } = useQuery({
    queryKey: [...QueryKey.STATISTIC_DASHBOARD.CONTACTS, sessionLocal?.sessionId],
    queryFn: () => {
      if (!sessionLocal?.sessionId) return null;

      return ContactRemote.getTotalContacts(sessionLocal?.sessionId).then(fromApiResult);
    },
  });

  // dapatkan total perangggkat yang terhubung dengan akun wa
  const { data: totalDevices, isFetching: isFetchingDevices } = useQuery({
    queryKey: [...QueryKey.STATISTIC_DASHBOARD.DEVICES, sessionLocal?.sessionId],
    queryFn: () => {
      if (!sessionLocal?.sessionId || !sessionLocal?.phoneNumber) return null;

      return ClientRemote.getTotalDevices({
        sessionID: sessionLocal?.sessionId,
        phoneNumber: sessionLocal?.phoneNumber,
      }).then(fromApiResult);
    },
  });

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: QueryKey.STATISTIC_DASHBOARD.ALL });
  };

  return (
    <MainCard className="col-span-2 h-fit w-full">
      <AppSection
        title="Statistik"
        className="divide-border flex flex-col justify-center gap-5 divide-y"
        rightHeader={
          <Button
            size="icon"
            tooltip="Refresh"
            onClick={handleRefresh}
            isLoading={isFetchingChats || isFetchingContacts || isFetchingDevices}
          >
            <IoRefresh />
          </Button>
        }
      >
        {statistik({
          total: totalDevices?.result || 0,
          isLoading: isFetchingDevices,
          label: 'Device',
          desc: 'Total perangkat yang terhubung dengan akun WhatsApp',
        })}
        {statistik({
          total: totalChats || 0,
          isLoading: isFetchingChats,
          label: 'Pesan',
          desc: 'Total pesan yang masuk dan keluar',
        })}
        {statistik({
          total: formatCompactNumber(totalContacts || 0),
          isLoading: isFetchingContacts,
          label: 'Kontak',
          desc: 'Total kontak yang tersimpan di device dan di akun WhatsApp',
        })}
      </AppSection>
    </MainCard>
  );

  function statistik({
    total,
    label,
    desc,
    isLoading,
  }: {
    total: number | string;
    label: string;
    desc: string;
    isLoading?: boolean;
  }) {
    return (
      <div className="flex w-full flex-col gap-2 pb-3">
        <div className="flex items-center justify-between">
          <p className="font-semibold">{label}</p>
          {isLoading ? <Spinner className="size-4" /> : <h3>{total}</h3>}
        </div>
        <p className="text-subtitle text-xs">{desc}</p>
      </div>
    );

    // return (
    //   <div className="flex h-32 w-32 flex-col items-center gap-2">
    //     <div className="border-border flex aspect-square items-center justify-center rounded-full border p-4 text-center">
    //       {isLoading ? (
    //         <Spinner className="size-4" />
    //       ) : (
    //         <h1 className={fitTextSize(total)}>{total}</h1>
    //       )}
    //     </div>
    //     <p className="font-semibold">{label}</p>
    //   </div>
    // );
  }
}
