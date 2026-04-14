import { AppNotify } from '@/components/ui/AppNotify';
import { Button } from '@/components/ui/shadcn/button';
import { Spinner } from '@/components/ui/shadcn/spinner';
import { fromApiResult } from '@/lib/query.adapter';
import { cn } from '@/lib/utils/cn.utils';
import { useMutation } from '@tanstack/react-query';
import { MdDelete, MdOutlineRestartAlt, MdStop } from 'react-icons/md';
import { SessionLocal } from '../data/local_source/session.local';
import { SessionRemote } from '../data/remote_source/session.remote';
import ActiveSession from '../domain/types/active-session.type';
import { useActiveSession } from '../hooks/useActiveSession';

export default function ActionSessionCard({ sessionID }: { sessionID: string }) {
  const { activeSession } = useActiveSession();

  const restartMutation = useMutation({
    mutationFn: () => SessionRemote.restartSession(sessionID).then(fromApiResult),
    onSuccess() {
      AppNotify.success({
        title: 'Session berhasil direstart',
        description: 'Koneksi WhatsApp sedang dimulai ulang.',
      });

      window.location.reload();
    },
    onError(error) {
      console.error(error);

      AppNotify.error({
        title: 'Gagal me-restart session',
        description:
          error instanceof Error ? error.message : 'Terjadi kesalahan saat me-restart session.',
      });
    },
  });

  const stopMutation = useMutation({
    mutationFn: () => SessionRemote.stopSession(sessionID).then(fromApiResult),
    onSuccess() {
      AppNotify.success({
        title: 'Session berhasil dihentikan',
        description: 'Session telah dihentikan sementara.',
      });

      window.location.reload();
    },
    onError(error) {
      console.error(error);

      AppNotify.error({
        title: 'Gagal menghentikan session',
        description:
          error instanceof Error ? error.message : 'Terjadi kesalahan saat menghentikan session.',
      });
    },
  });

  const terminateMutation = useMutation({
    mutationFn: () => SessionRemote.terminateSession(sessionID).then(fromApiResult),
    onSuccess() {
      AppNotify.success({
        title: 'Session berhasil dihapus',
        description: 'Session telah dihapus. Silakan scan QR untuk menghubungkan kembali.',
      });

      clearSessionLocal(sessionID, activeSession);
      window.location.reload();
    },
    onError(error) {
      console.error(error);

      AppNotify.error({
        title: 'Gagal menghapus session',
        description:
          error instanceof Error ? error.message : 'Terjadi kesalahan saat menghapus session.',
      });
    },
  });
  const clearSessionLocal = (sessionID: string, activeSession: ActiveSession | null) => {
    const isSameSession = activeSession?.sessionId === sessionID;

    if (isSameSession) {
      SessionLocal.clear();
    }
  };

  const handleRestart = () => {
    if (restartMutation.isPending) return;
    restartMutation.mutate();
  };

  const handleStop = () => {
    if (stopMutation.isPending) return;
    stopMutation.mutate();
  };

  const handleTerminate = () => {
    if (terminateMutation.isPending) return;
    terminateMutation.mutate();
  };

  return (
    <div className="flex w-full items-center justify-center gap-3">
      {/* <ActionButton
        icon={<BsPlay className="size-6" />}
        isLoading={startMutation.isPending}
        title="Start Session"
        onClick={handleStart}
        className="bg-green-500/10 text-green-600 hover:bg-green-600 hover:text-white"
      /> */}
      {/* Restart */}
      <ActionButton
        icon={<MdOutlineRestartAlt className="size-6" />}
        isLoading={restartMutation.isPending}
        title="Restart Session"
        onClick={handleRestart}
        className="bg-blue-500/10 text-blue-600 hover:bg-blue-600 hover:text-white"
      />

      {/* Stop */}
      <ActionButton
        icon={<MdStop className="size-6" />}
        isLoading={stopMutation.isPending}
        title="Stop Session"
        onClick={handleStop}
        className="bg-amber-500/10 text-amber-600 hover:bg-amber-600 hover:text-white"
      />

      {/* Hapus */}
      <ActionButton
        icon={<MdDelete className="size-6" />}
        isLoading={terminateMutation.isPending}
        title="Hapus Session"
        onClick={handleTerminate}
        className="bg-red-500/10 text-red-600 hover:bg-red-600 hover:text-white"
      />
    </div>
  );

  function ActionButton({
    icon,
    title,
    onClick,
    className,
    isLoading,
  }: {
    icon: React.ReactNode;
    title: string;
    onClick: () => void;
    className?: string;
    isLoading: boolean;
  }) {
    return (
      <Button
        variant="default"
        className={cn('"max-w-20 flex-1 py-5 hover:text-white', className)}
        size="icon"
        tooltip={title}
        onClick={onClick}
      >
        {isLoading ? <Spinner className="size-4" /> : icon}
      </Button>
    );
  }
}
