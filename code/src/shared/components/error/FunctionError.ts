
export const getAllErrorPaths = (obj: any, prefix = ""): string[] => {
  const out: string[] = [];
  for (const k of Object.keys(obj || {})) {
    const v = obj[k];
    const p = prefix ? `${prefix}.${k}` : k;
    if (v?.message || v?.type) out.push(p);
    else if (v && typeof v === "object") out.push(...getAllErrorPaths(v, p));
  }
  return out;
};

export const isOutOfView = (el: HTMLElement, container: HTMLElement) => {
  const er = el.getBoundingClientRect();
  const cr = container.getBoundingClientRect();
  return er.top < cr.top || er.bottom > cr.bottom;
};
