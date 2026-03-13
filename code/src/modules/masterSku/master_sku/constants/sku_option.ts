// ---- types ชัดเจน ----
import type { Theme } from '@mui/material/styles';
import type { SortGroup, StatusOption } from '../interface/MadterSku.interface';

// export type StatusKey = 'all' | 'active' | 'inactive';

export type BubbleStyle = {
    bg: string | ((theme: Theme) => string);
    color: string | ((theme: Theme) => string);
    border: string | ((theme: Theme) => string);
};


export type StatusKey = 'active' | 'inactive';

export const statusToSet = (status: string): Set<StatusKey> => {
    if (status === 'all') return new Set<StatusKey>(['active', 'inactive']);
    if (status === 'active') return new Set<StatusKey>(['active']);
    if (status === 'inactive') return new Set<StatusKey>(['inactive']);
    return new Set<StatusKey>(); // '' หรือค่าอื่น = ไม่เลือกอะไรเลย
};

export const setToStatus = (set: Set<StatusKey>): string => {
    const hasActive = set.has('active');
    const hasInactive = set.has('inactive');

    if (hasActive && hasInactive) return 'all';
    if (hasActive) return 'active';
    if (hasInactive) return 'inactive';
    return ''; // ไม่มี filter
};


// // ---- style map แยกออกจาก component ----
export const stylesByStatus: Record<StatusKey, BubbleStyle> = {
    // all: { bg: 'secondaryContainer', color: 'onSecondaryContainer', border: 'none' },
    active: { bg: 'successVariant80', color: 'successVariant0', border: 'none' },
    inactive: { bg: 'errorTones.98', color: 'errorTones.40', border: 'none' },
};


export const SKU_TYPE_LABELS: Record<string, string> = {
    "all": "ทั้งหมด",
    "active": "เปิดใช้งาน",
    "inactive": "ปิดใช้งาน",
};


export const sortFilterList: SortGroup[] = [
    {
        title: 'วันที่สร้าง',
        options: [
            { label: 'ใหม่ไปเก่า', value: 5 },
            { label: 'เก่าไปใหม่', value: 6 }
        ]
    },
    {
        title: 'ชื่อ',
        options: [
            { label: 'A → Z (น้อยไปมาก)', value: 1 },
            { label: 'Z → A (มากไปน้อย)', value: 2 },
        ]
    },
    {
        title: 'รหัส',
        options: [
            { label: 'A → Z (น้อยไปมาก)', value: 3 },
            { label: 'Z → A (มากไปน้อย)', value: 4 },
        ]
    }
];

export const Status_active: StatusOption[] = [
    {
        label: "เปิดการใช้งาน",
        value: 1,
    },
    {
        label: "ปิดการใช้งาน",
        value: 0,
    },
]