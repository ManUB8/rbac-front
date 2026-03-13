import { atom } from "jotai";
import type { ITextAlert } from "../message/Alert.interface";
import type { ITextPopup } from "../popup/PopupConfirm.interface";


export const colorModeAtom = atom<'light' | 'dark'>('light');

// export const toggleColorModeAtom = atom(
//   null,
//   (get, set) => {
//     const next = get(colorModeAtom) === 'light' ? 'dark' : 'light';
//     set(colorModeAtom, next);
//   }
// );

export const flashAlertAtom = atom<Partial<ITextAlert> | null>(null);
export const confirmPopupAtom = atom<ITextPopup | null>(null);
