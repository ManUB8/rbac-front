import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import PopupConfirm from './PopupConfirm';
import type { ITextPopup } from './PopupConfirm.interface';
import { confirmPopupAtom } from '../constants/OptionsAtom';

export default function PopupProvider() {
  const [popup, setPopup] = useAtom(confirmPopupAtom);
  const [open, setOpen] = useState(false);

  // เมื่อมีค่า popup -> เปิด dialog
  useEffect(() => {
    if (popup) setOpen(true);
    console.log("popup",popup)
    console.log("open",open)
  }, [popup]);

  // ปิด dialog และเคลียร์ atom เพื่อกันโชว์ซ้ำ
  const clearAndClose = () => {
    setOpen(false);
    setTimeout(() => setPopup(null), 0);
  };

  // wrap onClose/onConfirm ที่ผู้เรียกส่งมา เพื่อ:
  // 1) ทำงาน callback เดิม
  // 2) ปิดและเคลียร์ atom ให้อัตโนมัติ
  if (!popup) return null;

  const wrappedPopup: ITextPopup = {
    ...popup,
    onClose: () => {
      try { popup.onClose?.(); } finally { clearAndClose(); }
    },
    onConfirm: async () => {
      try { await popup.onConfirm?.(); } finally { clearAndClose(); }
    },
  };

  return <PopupConfirm open={open} popupValue={wrappedPopup} />;
}