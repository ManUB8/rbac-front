import { atom } from 'jotai';


const getInitialColorMode = (): 'light' | 'dark' => {
  const saved = localStorage.getItem("theme");
  return saved === 'dark' ? 'dark' : 'light';
};

export const colorModeAtom = atom<'light' | 'dark'>(getInitialColorMode());

// atom สำหรับ toggle พร้อมบันทึกลง localStorage
// export const toggleColorModeAtom = atom(
//   null,
//   (get, set) => {
//     const current = get(colorModeAtom);
//     const next = current === 'light' ? 'dark' : 'light';
//     localStorage.setItem("theme", next);
//     set(colorModeAtom, next);
//   }
// );