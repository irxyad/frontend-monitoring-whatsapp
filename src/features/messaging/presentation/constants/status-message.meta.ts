import { BiCheck, BiLoaderCircle } from 'react-icons/bi';
import { MdClear, MdDoneAll, MdMoreHoriz } from 'react-icons/md';

interface StatusMessageMeta {
  icon: React.FC<{ className?: string }>;
  label: string;
  color: string;
}
export const statusMessageMeta = (ack: number): StatusMessageMeta => {
  switch (ack) {
    case -1:
      return {
        icon: MdClear,
        label: 'Failed',
        color: 'bg-red-500/15 text-red-400',
      };

    case 0:
      return {
        icon: BiLoaderCircle,
        label: 'Sending',
        color: 'bg-amber-500/15 text-amber-300',
      };

    case 1:
      return {
        icon: BiCheck,
        label: 'Sent',
        color: 'bg-blue-500/15 text-blue-400',
      };

    case 2:
      return {
        icon: MdDoneAll,
        label: 'Delivered',
        color: 'bg-indigo-500/15 text-indigo-400',
      };

    case 3:
      return {
        icon: MdDoneAll,
        label: 'Read',
        color: 'bg-green-500/15 text-green-400',
      };

    case 4:
      return {
        icon: MdDoneAll,
        label: 'Played',
        color: 'bg-green-400/15 text-green-300',
      };

    default:
      return {
        icon: MdMoreHoriz,
        label: 'Unknown',
        color: 'bg-gray-500/15 text-gray-300',
      };
  }
};
