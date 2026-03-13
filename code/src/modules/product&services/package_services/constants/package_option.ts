// ---- types ชัดเจน ----
export type StatusKey = '0' | '1' | '2' | '3';

export type BubbleStyle = {
  bg: string | ((theme: any) => string);
  color: string | ((theme: any) => string);
  border: string | ((theme: any) => string);
};

export const stylesByStatus: Record<StatusKey, BubbleStyle> = {
  0: {
    bg: 'secondaryContainer',
    color: 'onSecondaryContainer',
    border: 'none',
  },
  1: {
    bg: 'background.default',
    color: 'onSurfaceVariant',
    border: (t) => `1px solid ${t.palette.outlineVariant}`,
  },
  2: {
    bg: 'secondaryTones.99',   
    color: 'secondaryTones.80',
    border: 'none',
  },
  3: {
    bg: 'tertiaryTones.98',
    color: 'tertiaryTones.50',
    border: 'none',
  },
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