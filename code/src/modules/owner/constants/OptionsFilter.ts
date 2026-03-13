// ---- types ชัดเจน ----
import type { Theme } from '@mui/material/styles';

export type StatusKey = '0' | '1' | '2' | '3';

export type BubbleStyle = {
  bg: string | ((theme: Theme) => string);
  color: string | ((theme: Theme) => string);
  border: string | ((theme: Theme) => string);
};

// // ---- style map แยกออกจาก component ----
export const stylesByStatus: Record<StatusKey, BubbleStyle> = {
    0: { bg: 'secondaryContainer', color: 'onSecondaryContainer', border: 'none' },
    1: { bg: 'successVariant80', color: 'successVariant0', border: 'none' },
    2: { bg: 'errorTones.98', color: 'errorTones.40', border: 'none' },
    3: { bg: 'onSurface', color: 'onPrimary', border: 'none' },
};


export const labelByCode = (map: Record<string, string>, code?: string | number | null, fallback?: string) => {
    const key = code != null ? String(code) : "";
    return map[key] ?? (fallback ?? "-");
};


export const OWNER_TYPE_LABELS: Record<string, string> = {
    "0": "ทั้งหมด",
    "1": "เปิดใช้งาน",
    "2": "ปิดใช้งาน",
    "3": "ระงับการใช้งาน",
};

// ใช้ StatusKey เดิม
// export const OWNER_STATUS_OPTIONS: { id: StatusKey; name: string }[] = [
//   { id: '0', name: OWNER_TYPE_LABELS['0'] }, // ทั้งหมด
//   { id: '1', name: OWNER_TYPE_LABELS['1'] }, // เปิดใช้งาน
//   { id: '2', name: OWNER_TYPE_LABELS['2'] }, // ปิด
//   { id: '3', name: OWNER_TYPE_LABELS['3'] }, // ระงับการใช้งาน
// ];

export const OWNER_STATUS_OPTIONS: { id: StatusKey; name: string }[] = [
  { id: '0', name: 'ทั้งหมด' },
  { id: '1', name: 'เปิดใช้งาน' },
  { id: '2', name: 'ปิดใช้งาน' },
  { id: '3', name: 'ระงับการใช้งาน' },
];

export const UNIT_MAP: Record<string, string> = {
  รายปี: '/ปี',
  รายเดือน: '/เดือน',
  รายวัน: '/วัน',
};