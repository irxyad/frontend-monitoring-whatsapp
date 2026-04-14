import { SecondaryCard } from '@/components/ui/AppCard';
import { Badge } from '@/components/ui/shadcn/badge';
import { Spinner } from '@/components/ui/shadcn/spinner';
import { cn } from '@/lib/utils/cn.utils';
import { ContactInfo } from '../domain/types/contact.type';

interface ContactsCardProps {
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  contacts: ContactInfo[] | undefined;
  onSelected?: (contact: ContactInfo) => void;
}
export default function ContactsCard({
  isFetching,
  isError,
  error,
  contacts,
  onSelected,
}: ContactsCardProps) {
  if (isFetching)
    return (
      <div className="flex items-center justify-center gap-2 py-5">
        <Spinner className="size-4" />
        <p>Sedang memuat...</p>
      </div>
    );

  if (isError && error)
    return (
      <div className="text-destructive flex flex-1 items-center justify-center py-5">
        <p>{error.message}</p>
      </div>
    );

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-col gap-3">
        {contacts?.map((contact) => {
          const name = contact.name || contact.pushname || '[Tanpa Nama]';
          const isSavedContact = contact.isMyContact;

          return (
            <div className="flex items-center gap-3">
              {/* <p className="border-border size-9 w-fit content-center border-r pr-3 text-end font-semibold">
                  {index + 1}
                </p> */}
              <SecondaryCard
                key={contact.id.user}
                className={cn(
                  onSelected && 'hover:bg-background cursor-pointer hover:border-none',
                  'flex w-full items-center justify-between gap-3'
                )}
                onClick={() => {
                  onSelected?.(contact);
                }}
              >
                <div>
                  <p className="truncate">{name}</p>
                  {isSavedContact && (
                    <Badge
                      variant="secondary"
                      className="border-secondary-card-border bg-green-500/10 px-1.5 py-0 text-green-500"
                    >
                      Tersimpan
                    </Badge>
                  )}
                </div>
                <p className="text-subtitle">{contact.number}</p>
              </SecondaryCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
