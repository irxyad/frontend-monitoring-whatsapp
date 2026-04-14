import { HiMiniUserCircle } from 'react-icons/hi2';
import { IconType } from 'react-icons/lib';
import { MdContacts } from 'react-icons/md';
import { TbLayoutDashboardFilled, TbMessageFilled } from 'react-icons/tb';
import { ROUTES } from './routes.constant';

export interface INavChild {
  label: string;
  icon?: IconType;
  href: string;
  isEnabled?: boolean;
}

export interface INavItem {
  label: string;
  icon: IconType;
  href: string;
  isEnabled?: boolean;
  children?: INavChild[];
}

export interface INavSection {
  section: string;
  items: INavItem[];
}

export const NAV_ITEMS: INavSection[] = [
  {
    section: 'Main',
    items: [
      {
        label: 'Dashboard',
        icon: TbLayoutDashboardFilled,
        href: ROUTES.DASHBOARD,
        isEnabled: true,
      },
    ],
  },
  {
    section: 'Pesan',
    items: [
      {
        label: 'Pesan',
        icon: TbMessageFilled,
        href: ROUTES.MESSAGING.PARENT,
        children: [
          {
            label: 'Kirim Pesan',
            href: ROUTES.MESSAGING.SEND_MESSAGE,
            isEnabled: true,
          },
          {
            label: 'Daftar Pesan',
            href: ROUTES.MESSAGING.LIST_MESSAGING,
            isEnabled: true,
          },
        ],
      },
    ],
  },
  {
    section: 'Kontak',
    items: [
      {
        label: 'Kontak',
        icon: MdContacts,
        href: ROUTES.CONTACTS,
        isEnabled: true,
      },
    ],
  },
  {
    section: 'Pengaturan',
    items: [
      {
        label: 'Profil',
        icon: HiMiniUserCircle,
        href: ROUTES.PROFILE,
        isEnabled: false,
      },
    ],
  },
];
