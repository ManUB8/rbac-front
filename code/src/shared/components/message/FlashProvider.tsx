// FlashProvider.tsx
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import AlertMessage from './AlertMessage';
import { flashAlertAtom } from '../constants/OptionsAtom';

export default function FlashProvider() {
  const [flash, setFlash] = useAtom(flashAlertAtom);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (flash) setOpen(true);
  }, [flash]);

  const handleClose = () => {
    setOpen(false);
    // เคลียร์หลังปิด เพื่อกันโชว์ซ้ำ
    setTimeout(() => setFlash(null), 0);
  };

  return (
    <AlertMessage
      open={open}
      popupValue={flash ? {
        title: flash.title ?? '',
        content: flash.content,
        type_severity: flash.type_severity,
        onClose: handleClose,
      } : null}
      autoHideDuration={2000}
    />
  );
}