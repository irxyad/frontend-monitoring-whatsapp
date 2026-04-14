import { MainCard, SecondaryCard } from '@/components/ui/AppCard';
import ProfileAvatar from '@/components/ui/ProfileAvatar';
import { QueryKey } from '@/core/constants/query-key.constant';
import { ClientRemote } from '@/features/client/data/remote_source/client.remote';
import { useActiveSession } from '@/features/session/hooks/useActiveSession';
import { fromApiResult } from '@/lib/query.adapter';
import { useQuery } from '@tanstack/react-query';
import { ProfileRemote } from '../data/remote_source/profile.remote';
import AppSection from './../../../components/ui/AppSection';

export interface IProfilePageProps {}

export default function ProfilePage() {
  const { activeSession } = useActiveSession();

  const { data: imageUrl } = useQuery({
    queryKey: [...QueryKey.PROFILE_IMAGE, activeSession?.sessionId],
    queryFn: () =>
      ProfileRemote.getProfilePic({
        sessionId: activeSession?.sessionId ?? '',
        contactId: activeSession?.phoneNumber,
      }).then(fromApiResult),
  });

  const { data: client } = useQuery({
    queryKey: ['class-info', activeSession?.sessionId],
    queryFn: () => ClientRemote.getClassInfo(activeSession?.sessionId ?? '').then(fromApiResult),
  });

  return (
    <div className="grid grid-cols-6 gap-5">
      {/* Daftar Session */}
      <MainCard className="col-span-5 w-full"></MainCard>
      {/* Session Aktif */}
      <MainCard className="flex h-fit w-fit flex-col gap-5">
        <AppSection title="Profile Picture" className="flex flex-col gap-3">
          <ProfileAvatar
            imageUrl={imageUrl}
            phoneNumber={activeSession?.phoneNumber}
            size={190}
            borderRadius={9}
          />
          <SecondaryCard className="w-full p-2 text-center">
            <p className="font-semibold">{client?.sessionInfo.pushname}</p>
            <p className="text-subtitle">{client?.sessionInfo.me.user}</p>
          </SecondaryCard>
        </AppSection>
      </MainCard>
    </div>
  );
}
