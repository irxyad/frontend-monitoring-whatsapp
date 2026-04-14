export type ContactSource = 'my_contact' | 'wa_contact';

interface ContactSourceMeta {
  label: string;
  className?: string;
}

export const contactSourceMeta: Record<ContactSource, ContactSourceMeta> = {
  my_contact: {
    label: 'Dari kontak HP',
    className: 'bg-blue-500/10 text-blue-500',
  },
  wa_contact: {
    label: 'Dari kontak WhatsApp',
    className: 'bg-green-500/10 text-green-500',
  },
};
