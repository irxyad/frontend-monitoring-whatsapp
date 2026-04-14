import { SecondaryCard } from '@/components/ui/AppCard';
import { Badge } from '@/components/ui/shadcn/badge';
import { ContactRemote } from '@/features/contact/data/remote_source/contact.remote';
import { fromApiResult } from '@/lib/query.adapter';
import { cn } from '@/lib/utils/cn.utils';
import { DateUtils } from '@/lib/utils/date.utils';
import { useQuery } from '@tanstack/react-query';
import { HiUser, HiUserGroup } from 'react-icons/hi2';
import { ChatMessageInfo } from '../domain/types/messaging.type';
import { statusMessageMeta } from '../presentation/constants/status-message.meta';
export default function MessageInfoCard({
  message,
  sessionID,
}: {
  message: ChatMessageInfo;
  sessionID: string;
}) {
  console.log(message);

  const IconType = message.isGroup ? HiUserGroup : HiUser;
  const iconColor = message.isGroup ? 'text-green-500' : 'text-blue-500';

  const { data: sender } = useQuery({
    queryKey: [message.name, message.lastMessage.author],
    enabled: !!message.lastMessage.author,
    queryFn: () =>
      ContactRemote.getContactByID(sessionID, message.lastMessage.author ?? '').then(fromApiResult),
  });

  const badgeColor = message.lastMessage.fromMe ? 'bg-blue-900' : 'bg-secondary-900';
  const statusMsgMeta = statusMessageMeta(message.lastMessage.ack);

  const typeMessage = [
    'chat',
    'document',
    'image',
    'video',
    'audio',
    'sticker',
    'location',
    'contact',
    'vcard',
  ];
  const showStatsSend =
    message.lastMessage.fromMe && typeMessage.includes(message.lastMessage.type);

  let labelSender: string;

  if (message.lastMessage.fromMe) {
    labelSender = 'Anda';
  } else if (sender) {
    labelSender = sender.name || sender.pushname || '[Tanpa Nama]';
  } else {
    labelSender = 'Pengirim:';
  }

  return (
    <SecondaryCard className="flex w-full flex-col gap-3">
      {/* Header Profile */}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <IconType className={cn(iconColor)} />
          <span className="flex items-center gap-1">
            <span className="font-semibold">{message.name}</span>
            <span className="text-subtitle text-xs">({message.isGroup ? 'Grup' : 'Pribadi'})</span>
          </span>
        </div>
        {showStatsSend && (
          <div
            className={cn(
              statusMsgMeta.color,
              'border-border flex items-center gap-1 rounded-lg px-1.5 py-0 text-[10px] font-semibold'
            )}
          >
            <statusMsgMeta.icon />
            <p>{statusMsgMeta.label}</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex gap-1">
        <Badge
          variant="secondary"
          className={cn(badgeColor, 'border-border px-1.5 py-0 text-[10px] font-semibold')}
        >
          {labelSender}
        </Badge>
        <p className="text-sm">
          {message.lastMessage.type !== 'chat'
            ? `[${message.lastMessage.type.capitalizeFirst()}]`
            : message.lastMessage.body}
        </p>
      </div>
      {/* Timestamp */}
      <p className="text-muted-foreground text-xs">
        {DateUtils.formatTimestamp(message.lastMessage.timestamp)}
      </p>
    </SecondaryCard>
  );
}
