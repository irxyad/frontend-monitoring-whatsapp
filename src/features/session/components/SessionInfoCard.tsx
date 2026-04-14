import ProfileAvatar from '@/components/ui/ProfileAvatar';
import QrModal from '@/components/ui/QrModal';
import { Button } from '@/components/ui/shadcn/button';
import { Spinner } from '@/components/ui/shadcn/spinner';
import { ConnectionStatus } from '@/core/constants/connection-status.constans';
import { QueryKey } from '@/core/constants/query-key.constant';
import { ClientRemote } from '@/features/client/data/remote_source/client.remote';
import { ProfileRemote } from '@/features/profile/data/remote_source/profile.remote';
import { fromApiResult } from '@/lib/query.adapter';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { BsCheck, BsWhatsapp } from 'react-icons/bs';
import { FaAndroid, FaApple } from 'react-icons/fa';
import { HiDevicePhoneMobile } from 'react-icons/hi2';
import { IoQrCode } from 'react-icons/io5';
import { SecondaryCard } from '../../../components/ui/AppCard';
import ConnectionBadge from '../../../components/ui/ConnectionBadge';
import { SessionLocal } from '../data/local_source/session.local';
import { SessionRemote } from '../data/remote_source/session.remote';
import { useActiveSession } from '../hooks/useActiveSession';
import ActionSessionCard from './ActionSessionCard';

interface SessionInfoCardProps {
  sessionID: string;
  showAction?: boolean;
  showActivationBtn?: boolean;
  showBadgeActivated?: boolean;
  isInitializing?: boolean;
}

export default function SessionInfoCard({
  sessionID,
  showAction = false,
  showActivationBtn = false,
  showBadgeActivated = false,
  isInitializing = false,
}: SessionInfoCardProps) {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const { activeSession } = useActiveSession();

  const { data: status, isFetching } = useQuery({
    queryKey: ['session-status', sessionID],
    queryFn: () => SessionRemote.getSessionStatus(sessionID).then(fromApiResult),
  });

  const { data: client, isFetching: isFetchingClient } = useQuery({
    queryKey: ['class-info', sessionID],
    queryFn: () => ClientRemote.getClassInfo(sessionID).then(fromApiResult),
  });

  const device = client?.sessionInfo?.platform;
  const IconDevice = device === 'android' ? FaAndroid : FaApple;
  const labelDevice = device === 'android' ? 'Android' : 'iOS';

  let connectionStatus: ConnectionStatus = 'INITIALIZING';

  if (isInitializing) {
    connectionStatus = 'INITIALIZING';
  } else if (isFetching) {
    connectionStatus = 'CONNECTING';
  } else if (status?.state === 'CONNECTED') {
    connectionStatus = 'CONNECTED';
  } else {
    connectionStatus = 'DISCONNECTED';
  }

  const phoneNumber = client?.sessionInfo?.me?.user;
  const usernameWa = client?.sessionInfo?.pushname;

  const isConnected = connectionStatus === 'CONNECTED'; // ini artinya udah terlinked dengan whatsapp
  const isActiveSession = activeSession?.sessionId === sessionID;
  const showActivation = showActivationBtn && isConnected && !isActiveSession;
  const isInitSession = connectionStatus === 'INITIALIZING';
  const showActBtn = !isInitSession && showAction;

  const handleActivationSession = () => {
    SessionLocal.set({ sessionId: sessionID, device, phoneNumber });
    window.location.reload();
  };
  console.log(activeSession?.phoneNumber);

  const { data: imageUrl } = useQuery({
    queryKey: [...QueryKey.PROFILE_IMAGE, sessionID],
    queryFn: () =>
      ProfileRemote.getProfilePic({
        sessionId: activeSession?.sessionId ?? '',
        contactId: activeSession?.phoneNumber,
      }).then(fromApiResult),
    enabled: isConnected,
    staleTime: 0,
  });

  const subtitle = () => {
    if (isFetchingClient) {
      return (
        <div className="flex h-full w-full items-center justify-center gap-2">
          <Spinner className="size-4" />
          <p>Sedang memuat...</p>
        </div>
      );
    }

    if (isInitSession) {
      return (
        <p className="text-subtitle text-xs">Sedang menginisialisasi, mohon untuk sabar menunggu</p>
      );
    }

    if (!isConnected) {
      return (
        <p className="text-subtitle text-xs">
          Akun belum terhubung dengan WhatsApp. Silakan pindai kode QR untuk menghubungkan.
        </p>
      );
    }

    return (
      <div className="text-subtitle divide-subtitle flex divide-x">
        <div className="flex items-center gap-1 pr-2">
          <BsWhatsapp className="h-3.5 w-3.5" />
          <div className="text-subtitle">
            <p>{phoneNumber}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 pl-2">
          <IconDevice className="h-4 w-4" />
          <div className="text-subtitle">
            <p>{labelDevice}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <SecondaryCard className="w-full">
      <QrModal
        open={isQrModalOpen}
        sessionID={sessionID}
        onClose={(isScanned) => {
          setIsQrModalOpen(false);

          if (isScanned) window.location.reload();
        }}
      />

      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full gap-2">
          {imageUrl ? (
            <ProfileAvatar imageUrl={imageUrl} size={30} />
          ) : (
            <HiDevicePhoneMobile className="h-6 w-6" />
          )}
          <div className="flex w-full items-center justify-between gap-3">
            <p className="text-base font-bold">
              {/* {client?.sessionInfo?.pushname}{' '} */}
              {sessionID}
              <span className="text-subtitle text-xs font-normal">{` (${usernameWa ?? '-'})`}</span>
            </p>
            <ConnectionBadge connection={connectionStatus} />
          </div>
        </div>
        {/* Isinya nomor hp dan device */}
        {subtitle()}
        {/* Action */}
        <div className="flex items-center justify-between gap-3">
          {showActBtn && (
            <div className="w-full max-w-52">
              <ActionSessionCard sessionID={sessionID} />
            </div>
          )}
          <div className="ml-auto flex items-center gap-3">
            {!isInitSession && !isConnected && (
              <Button className="ml-auto flex w-fit gap-1" onClick={() => setIsQrModalOpen(true)}>
                <IoQrCode />
                <p>Hubungkan</p>
              </Button>
            )}
            {showActivation && (
              <Button className="flex w-fit gap-1" onClick={handleActivationSession}>
                <BsCheck className="size-6" />
                <p>Aktifkan</p>
              </Button>
            )}
            {isActiveSession && showBadgeActivated && (
              <Button className="bg-background ml-auto flex w-fit gap-1" disabled>
                <BsCheck className="size-6" />
                <p>Aktif</p>
              </Button>
            )}
          </div>
        </div>
      </div>
    </SecondaryCard>
  );
}
