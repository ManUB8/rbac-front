// ---- types ชัดเจน ----
export type StatusKey = '0' | '1' | '2' | '3';

export type BubbleStyle = {
  bg: string | ((theme: any) => string);
  color: string | ((theme: any) => string);
  border: string | ((theme: any) => string);
};

// ---- style map แยกออกจาก component ----
export const stylesByStatus: Record<StatusKey, BubbleStyle> = {
  0: { bg: '#FBBF14', color: '#000', border: 'none' },
  1: { bg: 'transparent', color: 'text.secondary', border: (t: any) => `1px solid ${t.palette.grey[400]}` },
  2: { bg: '#FFFDF6', color: '#F9BD11', border: 'none' },
  3: { bg: '#FAF8FF', color: '#286CFF', border: 'none' },
};

export const labelByCode = (map: Record<string, string>, code?: string | number | null, fallback?: string) => {
  const key = code != null ? String(code) : "";
  return map[key] ?? (fallback ?? "-");
};


export const PACKAGE_TYPE_LABELS: Record<string, string> = {
  "1": "แพ็กเกจหลัก",
  "2": "แพ็กเกจเสริม",
  "3": "Top-up",
};

export const PACKAGE_TIER_LABELS: Record<string, string> = {
  "1": "Starter",
  "2": "Standard",
  "3": "Exclusive",
};

export const BILLING_TYPE_LABELS: Record<string, string> = {
  "1": "Subscribe",
  "2": "Pay-as-you-go",
  "3": "One-time",
};

// export const SERVICE_TYPE_LABELS: Record<string, string> = {
//   "1": "รายวัน",
//   "2": "รายเดือน",
//   "3": "รายปี",
//   "4": "ทดลองใช้",
// };
export const SERVICE_TYPE_LABELS = [
  {
    "name":'รายวัน',
    "code":"1"
  },
  {
    "name":'รายเดือน',
    "code":"2"
  },
  {
    "name":'รายปี',
    "code":"3"
  },
]

export const PERIODICITY_MAP: Record<string, string> = {
  daily: "1",
  monthly: "2",
  yearly: "3",
};