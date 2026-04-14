import { MainCard } from '@/components/ui/AppCard';
import { AppNotify } from '@/components/ui/AppNotify';
import AppSection from '@/components/ui/AppSection';
import { Button } from '@/components/ui/shadcn/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/shadcn/field';
import { Input } from '@/components/ui/shadcn/input';
import { Textarea } from '@/components/ui/shadcn/textarea';
import ContactPickerModal from '@/features/contact/components/ContactPickerModal';
import { useActiveSession } from '@/features/session/hooks/useActiveSession';
import { fromApiResult } from '@/lib/query.adapter';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BsSendFill } from 'react-icons/bs';
import { MdContacts } from 'react-icons/md';
import { z } from 'zod';
import { SendMessageDto } from '../data/dto/messaging.dto';
import { MessagingRemote } from '../data/remote_source/messaging.remote';

const sendMessageSchema = z.object({
  chatId: z
    .string()
    .min(1, 'Nomor penerima wajib diisi')
    .regex(/^\d+$/, 'Hanya boleh berisi angka')
    .refine((v) => v.startsWith('62'), 'Nomor harus diawali dengan 62')
    .min(10, 'Nomor terlalu pendek (min 10 digit)')
    .max(15, 'Nomor terlalu panjang (maks 15 digit)')
    .transform((v) => v.trim()),
  content: z
    .string()
    .min(1, 'Pesan wajib diisi')
    .max(1000, 'Pesan maksimal 1000 karakter')
    .transform((v) => v.trim())
    .refine((v) => v.length > 0, 'Pesan tidak boleh hanya spasi'),
});

// Pisahkan input type dan output type karena ada .transform()
type SendMessageFormValues = z.input<typeof sendMessageSchema>;

export default function SendMessageCard({ className }: { className?: string }) {
  const [openContactPicker, setOpenContactPicker] = useState(false);

  const { activeSession } = useActiveSession();

  const form = useForm<SendMessageFormValues>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: { chatId: '', content: '' },
  });

  const { mutateAsync: sending, isPending: isSending } = useMutation({
    mutationFn: (data: SendMessageDto) =>
      MessagingRemote.sendMessage(activeSession?.sessionId ?? '', {
        chatId: `${data.chatId}@c.us`,
        content: data.content,
      }).then(fromApiResult),
    onSuccess: () => {
      form.reset();
    },
  });

  const handleSubmit = async (values: z.output<typeof sendMessageSchema>) => {
    try {
      await sending(values);
      AppNotify.success({ title: 'Pesan berhasil dikirim' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Gagal mengirim pesan';
      AppNotify.error({ title: 'Gagal mengirim pesan', description: message });
    }
  };

  return (
    <MainCard className={className}>
      <ContactPickerModal
        open={openContactPicker}
        sessionID={activeSession?.sessionId ?? ''}
        onClose={() => {
          setOpenContactPicker(false);
        }}
        onSelected={(contact) => {
          setOpenContactPicker(false);
          form.setValue('chatId', contact.number);
          console.log(contact);
        }}
      />
      <form className="w-full" id="form-send-message" onSubmit={form.handleSubmit(handleSubmit)}>
        <AppSection
          title="Buat Pesan"
          className="flex w-full flex-col gap-4"
          rightHeader={
            <Button type="submit" isLoading={isSending}>
              <BsSendFill />
              Kirim Pesan
            </Button>
          }
        >
          {/* Nomor penerima */}
          <FieldGroup>
            <Controller
              name="chatId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Nomor Penerima</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Masukkan nomor penerima"
                    suffixIcon={
                      <Button
                        type="button"
                        isLoading={isSending}
                        size="icon"
                        variant="ghost"
                        tooltip="Pilih kontak"
                        onClick={() => setOpenContactPicker(true)}
                      >
                        <MdContacts className="text-white" />
                      </Button>
                    }
                    required
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          {/* Isi pesan */}
          <FieldGroup>
            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Isi Pesan</FieldLabel>
                  <Textarea
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Masukkan pesan anda"
                    rows={4}
                    required
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </AppSection>
      </form>
    </MainCard>
  );
}
