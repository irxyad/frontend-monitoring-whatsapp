import { MainCard } from '@/components/ui/AppCard';
import { AppNotify } from '@/components/ui/AppNotify';
import AppSection from '@/components/ui/AppSection';
import QrModal from '@/components/ui/QrModal';
import { Button } from '@/components/ui/shadcn/button';
import { Field, FieldLabel } from '@/components/ui/shadcn/field';
import { Input } from '@/components/ui/shadcn/input';
import { QueryKey } from '@/core/constants/query-key.constant';
import { fromApiResult } from '@/lib/query.adapter';
import { queryClient } from '@/lib/query.client';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { HiIdentification } from 'react-icons/hi2';
import { SessionRemote } from '../data/remote_source/session.remote';

export default function CreateSessionCard() {
  const [sessionID, setSessionID] = useState('');
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const { mutateAsync: start, isPending } = useMutation({
    mutationFn: (id: string) => SessionRemote.startSession(id).then(fromApiResult),
  });

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await start(sessionID);
      queryClient.invalidateQueries({ queryKey: QueryKey.SESSIONS });

      setIsQrModalOpen(true);

      AppNotify.success({
        title: 'Session berhasil dimulai',
        description: 'Silahkan scan QR untuk menghubungkan WhatsApp',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Gagal memulai session';

      AppNotify.error({
        title: 'Gagal memulai session',
        description: message,
      });
    }
  };

  return (
    <MainCard className="w-full">
      {/* Modal QR */}
      <QrModal
        open={isQrModalOpen}
        sessionID={sessionID}
        onClose={() => {
          setIsQrModalOpen(false);

          setSessionID('');
        }}
      />

      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
        <AppSection
          title="Buat Session Baru"
          rightHeader={
            <Button type="submit" isLoading={isPending}>
              Simpan
            </Button>
          }
        >
          <Field>
            <FieldLabel>Session ID</FieldLabel>
            <Input
              value={sessionID}
              prefixIcon={<HiIdentification className="h-5 w-5" />}
              onChange={(e) => setSessionID(e.target.value)}
              placeholder="cth. WhatsappSender"
              required
            />
          </Field>
        </AppSection>
      </form>
    </MainCard>
  );
}
