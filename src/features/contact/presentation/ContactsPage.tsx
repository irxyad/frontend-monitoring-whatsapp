import { MainCard } from '@/components/ui/AppCard';
import AppSection from '@/components/ui/AppSection';
import { Button } from '@/components/ui/shadcn/button';
import { QueryKey } from '@/core/constants/query-key.constant';
import { useActiveSession } from '@/features/session/hooks/useActiveSession';
import { fromApiResult } from '@/lib/query.adapter';
import { useQuery } from '@tanstack/react-query';
import { IoRefresh } from 'react-icons/io5';
import ContactsCard from '../components/ContactsCard';
import { ContactRemote } from '../data/remote_source/contact.remote';

export default function ContactsPage() {
  const { activeSession } = useActiveSession();

  const {
    data: contacts,
    isFetching,
    error,
    refetch,
    isError,
  } = useQuery({
    queryKey: [...QueryKey.CONTACTS, activeSession?.sessionId],
    queryFn: () => ContactRemote.getContacts(activeSession?.sessionId ?? '').then(fromApiResult),
  });

  return (
    <MainCard className="w-full">
      <AppSection
        title="Kontak"
        rightHeader={
          <div className="flex items-center gap-2">
            <span className="text-subtitle text-sm">
              {isFetching ? 'Memuat...' : `${contacts?.length ?? 0} kontak`}
            </span>
            <Button size="icon" tooltip="Refresh" onClick={() => refetch()} isLoading={isFetching}>
              <IoRefresh />
            </Button>
          </div>
        }
      >
        <ContactsCard isFetching={isFetching} isError={isError} error={error} contacts={contacts} />
      </AppSection>
    </MainCard>
  );
}
