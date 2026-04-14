import { MainCard } from '@/components/ui/AppCard';
import AppSection from '@/components/ui/AppSection';
import { Button } from '@/components/ui/shadcn/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/shadcn/drawer';
import SessionInfoCard from '@/features/session/components/SessionInfoCard';
import { useActiveSession } from '../hooks/useActiveSession';
import { useSessions } from '../hooks/useSessions';
import ActionSessionCard from './ActionSessionCard';

function ButtonChangeSession({
  label,
  sessions,
}: {
  label: string;
  sessions: string[] | undefined;
}) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">{label}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Pilih Session Aktif</DrawerTitle>
          <DrawerDescription>
            Session yang dipilih akan digunakan untuk semua proses monitoring dan pengambilan data.
            Tidak akan memengaruhi Session lainnya.
          </DrawerDescription>
        </DrawerHeader>
        {!sessions || sessions.length === 0 ? (
          <div className="text-subtitle p-4 text-xs">
            <p>Belum ada session aktif</p>
            <p>Mohon untuk merefresh Daftar Session terlebih dahulu atau buat session baru.</p>
          </div>
        ) : (
          <div className="no-scrollbar overflow-y-auto">
            {sessions.map((sessionID) => (
              <div key={sessionID} className="p-4">
                <SessionInfoCard sessionID={sessionID} showActivationBtn showBadgeActivated />
              </div>
            ))}
          </div>
        )}
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Tutup</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default function ActiveSessionCard() {
  const { activeSession } = useActiveSession();

  const { sessions } = useSessions();

  return (
    <MainCard className="w-full">
      <AppSection title="Session Aktif">
        {activeSession ? (
          <div className="flex flex-col gap-5">
            {/* Info Account */}
            <SessionInfoCard sessionID={activeSession.sessionId} />
            {/* Actions Button */}
            <ActionSessionCard sessionID={activeSession.sessionId} />
            {/* CTA change session */}
            <ButtonChangeSession label="Pilih Session" sessions={sessions} />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <p className="text-subtitle text-xs">Belum ada session aktif</p>
            {/* CTA change session */}
            <ButtonChangeSession label="Pilih Session" sessions={sessions} />
          </div>
        )}
      </AppSection>
    </MainCard>
  );
}
