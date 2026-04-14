import { Button } from '@/components/ui/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/shadcn/dialog';
import { QueryKey } from '@/core/constants/query-key.constant';
import { useActiveSession } from '@/features/session/hooks/useActiveSession';
import { fromApiResult } from '@/lib/query.adapter';
import { useQuery } from '@tanstack/react-query';
import { ContactRemote } from '../data/remote_source/contact.remote';
import { ContactInfo } from '../domain/types/contact.type';
import ContactsCard from './ContactsCard';

type QrModalProps = {
  open: boolean;
  sessionID: string;
  onClose: () => void;
  onSelected?: (contact: ContactInfo) => void;
};

export default function ContactPickerModal({ open, sessionID, onClose, onSelected }: QrModalProps) {
  const { activeSession } = useActiveSession();

  const {
    data: contacts,
    isFetching,
    error,
    isError,
  } = useQuery({
    queryKey: [...QueryKey.CONTACTS, sessionID],
    queryFn: () => ContactRemote.getContacts(activeSession?.sessionId ?? '').then(fromApiResult),
    enabled: open && !!sessionID,
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Pilih Kontak</DialogTitle>
        </DialogHeader>
        {/* Content */}
        <ContactsCard
          isFetching={isFetching}
          isError={isError}
          error={error}
          contacts={contacts}
          onSelected={onSelected}
        />
        <DialogFooter>
          <Button className="w-full" variant="outline" onClick={onClose}>
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
