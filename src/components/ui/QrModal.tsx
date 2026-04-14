// QrModal.tsx
import { AppConstants } from '@/core/constants/app.constant';
import { QueryKey } from '@/core/constants/query-key.constant';
import { SessionRemote } from '@/features/session/data/remote_source/session.remote';
import { fromApiResult } from '@/lib/query.adapter';
import { useQuery } from '@tanstack/react-query';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { Button } from './shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './shadcn/dialog';
import { Spinner } from './shadcn/spinner';

type QrModalProps = {
  open: boolean;
  sessionID: string;
  onClose: (isScanned: boolean) => void;
};

export default function QrModal({ open, sessionID, onClose }: QrModalProps) {
  const [isScanned, setIsScanned] = useState(false);

  const {
    data: qrResult,
    isFetching,
    error,
    isError,
  } = useQuery({
    queryKey: [...QueryKey.QR, sessionID],
    queryFn: () => SessionRemote.getQr(sessionID).then(fromApiResult),
    enabled: open && !!sessionID,
    staleTime: 0,
    gcTime: 0, // buang cache klo gk dipakai
    refetchInterval: isScanned ? false : 5_000, // kalau udah di scan, gk usah refresh qr code baru dan set 5s saja biar cepat didetect kalau udah discan
    refetchIntervalInBackground: false, // berhenti jika modal gk aktif
  });

  useEffect(() => {
    if (isError && error.message.includes('scanned')) {
      setIsScanned(true);
    }
  }, [isError]);

  const renderContent = () => {
    if (isFetching)
      return (
        <div className="flex h-full w-full items-center justify-center gap-2 py-5">
          <Spinner className="size-4" />
          <p>Sedang memuat...</p>
        </div>
      );

    if (isScanned)
      return <p className="text-muted-foreground py-5 text-center text-sm">QrCode telah di scan</p>;

    if (isError || !qrResult)
      return <p className="text-muted-foreground py-5 text-center text-sm">{error?.message}</p>;

    return <QRCodeSVG value={qrResult.qr} size={220} level="M" marginSize={5} />;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Scan QR Code</DialogTitle>
          <DialogDescription>Buka WhatsApp lalu scan QR berikut</DialogDescription>
        </DialogHeader>
        <div className="flex h-64 w-full items-center justify-center">{renderContent()}</div>
        <DialogFooter>
          <div className="text-subtitle flex w-full flex-col items-center gap-2 text-center">
            {!isError && (
              <p>QrCode akan diupdate setiap {AppConstants.QR_INTERVAL_MS / 1000} detik</p>
            )}
            <Button className="w-full" variant="outline" onClick={() => onClose(isScanned)}>
              Tutup
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
