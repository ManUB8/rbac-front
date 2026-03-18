import { atom } from 'jotai';


const getInitialColorMode = (): 'light' | 'dark' => {
  const saved = localStorage.getItem("theme");
  return saved === 'dark' ? 'dark' : 'light';
};

export const colorModeAtom = atom<'light' | 'dark'>(getInitialColorMode());

