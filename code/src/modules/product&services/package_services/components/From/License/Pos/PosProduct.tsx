import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type {
  FieldErrors,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import type { IPackageItem, IPagePermission } from '../../../../interface/PackageServices.interface';

import {
  Box,
  Typography,
  Modal,
  IconButton,
  Button,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface IPosProductProps {
  product_data: IPagePermission[];
  getValues: UseFormGetValues<IPackageItem>;
  setValue: UseFormSetValue<IPackageItem>;
  errors: FieldErrors<IPackageItem>;
  watch: UseFormWatch<IPackageItem>;
  setError: UseFormSetError<IPackageItem>;
  clearErrors: UseFormClearErrors<IPackageItem>;
  actype: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '96vw', sm: 720, md: 960 },
  maxWidth: 960,
  maxHeight: '85vh',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
};

const PosProduct: React.FunctionComponent<IPosProductProps> = ({
  product_data,
  getValues,
  setValue,
  open,
  setOpen,
}) => {
  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  // ===== form snapshot (อ่านครั้งเดียวตอนเปิดโมดัล) =====
  const formDevicePerms = getValues('product_device_permissions') ?? [];

  // หาตัว POS (device_id = '2' หรือชื่อ 'pos') จากค่าปัจจุบันของฟอร์ม
  const initialPosDevice = useMemo(() => {
    const idx = (formDevicePerms as any[]).findIndex(
      d => d?.product_device_id === '2' || d?.product_device_name === 'pos'
    );
    return idx >= 0 ? (formDevicePerms as any[])[idx] : undefined;
  }, [formDevicePerms]);

  // ===== draft ใน modal (แก้ไขชั่วคราว) =====
  const [draftDevice, setDraftDevice] = useState<any>(() => {
    if (initialPosDevice) return structuredClone(initialPosDevice);
    // ถ้าไม่มี ให้สร้างใหม่
    return {
      product_device_id: '2',
      product_device_name: 'pos',
      is_selected: true,
      pages: [],
      functions: [],
    };
  });

  // รีเซ็ต draft ทุกครั้งที่ modal เปิดใหม่ (อ่านค่า form ล่าสุดมาเป็นฐาน)
  useEffect(() => {
    if (!open) return;
    if (initialPosDevice) setDraftDevice(structuredClone(initialPosDevice));
    else {
      setDraftDevice({
        product_device_id: '2',
        product_device_name: 'pos',
        is_selected: true,
        pages: [],
        functions: [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // ===== index lookup: page_id -> page (จาก product_data) =====
  const pageIndexMap = useMemo(() => {
    const map = new Map<string, any>();
    for (const m of (product_data ?? [])) {
      map.set(String(m.page_id), m);
      for (const sp of (m.sub_pages ?? [])) {
        map.set(String(sp.page_id), sp);
      }
    }
    return map;
  }, [product_data]);

  // parent map: page_id -> main_id|null
  const parentMainIdMap = useMemo(() => {
    const parent = new Map<string, string | null>();
    for (const m of (product_data ?? [])) {
      parent.set(String(m.page_id), null);
      for (const sp of (m.sub_pages ?? [])) {
        parent.set(String(sp.page_id), String(m.page_id));
      }
    }
    return parent;
  }, [product_data]);

  // === id ที่ถูกเลือกจาก draft ===
  const selectedPageIds = useMemo(
    () => new Set((draftDevice?.pages ?? []).map((p: any) => String(p.page_id))),
    [draftDevice]
  );
  const selectedFunctionIds = useMemo(
    () => new Set((draftDevice?.functions ?? []).map((f: any) => String(f.function_id))),
    [draftDevice]
  );

  // ===== Helpers (ไม่แตะ setValue ทันทีอีกต่อไป) =====
  const stripPage = (p: any) => ({
    ...p,
    sub_pages: [],
    functions: Array.isArray(p?.functions) ? p.functions : [],
  });

  const uniqueByPageId = (arr: any[]) => {
    const seen = new Set<string>();
    return arr.filter(p => {
      const id = String(p?.page_id ?? '');
      if (!id) return false;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  };

  const uniqueByFunctionId = (arr: any[]) => {
    const seen = new Set<string>();
    return arr.filter(fn => {
      const id = String(fn?.function_id ?? '');
      if (!id) return false;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  };

  const collectPagesForMainFlat = (main: any) => {
    const subs = Array.isArray(main?.sub_pages) ? main.sub_pages : [];
    return [stripPage(main), ...subs.map(stripPage)];
  };

  const collectAllIdsForMainCluster = (main: any): Set<string> => {
    const ids = new Set<string>();
    ids.add(String(main.page_id));
    (main.sub_pages ?? []).forEach((sp: any) => ids.add(String(sp.page_id)));
    return ids;
  };

  const collectFunctionsFromCluster = (main: any) => {
    const mainFns = Array.isArray(main?.functions) ? main.functions : [];
    const subFns  = (Array.isArray(main?.sub_pages) ? main.sub_pages : []).flatMap((sp: any) =>
      Array.isArray(sp?.functions) ? sp.functions : []
    );
    return [...mainFns, ...subFns];
  };

  const collectFunctionsFromPage = (page: any) =>
    Array.isArray(page?.functions) ? page.functions : [];

  const removePagesByIds = (pages: any[], removeIds: Set<string>) =>
    (pages ?? []).filter(p => !removeIds.has(String(p.page_id)));

  const removeFunctionsByPageIds = (fns: any[], removeIds: Set<string>) =>
    (fns ?? []).filter(fn => !removeIds.has(String(fn.page_id)));

  // main checkbox UI: ถูกติ๊กถ้ามี main อยู่ใน draft.pages
  const isMainCheckedUI = (main: any) => selectedPageIds.has(String(main.page_id));

  const ensurePageInList = (pages: any[], pageId: string) => {
    const exists = pages.some(p => String(p.page_id) === String(pageId));
    if (exists) return pages;
    const src = pageIndexMap.get(String(pageId));
    if (!src) return pages;
    return uniqueByPageId([...pages, stripPage(src)]);
  };

  const ensureMainForPage = (pages: any[], pageId: string) => {
    const mainId = parentMainIdMap.get(String(pageId));
    if (!mainId) {
      // pageId เป็น main
      return ensurePageInList(pages, pageId);
    }
    // เป็น sub ⇒ ensure main + sub
    let next = ensurePageInList(pages, mainId);
    next = ensurePageInList(next, pageId);
    return next;
  };

  const pruneEmptySubPage = (pages: any[], pageId: string) => {
    const mainId = parentMainIdMap.get(String(pageId));
    if (!mainId) return pages; // main ไม่ prune
    const idx = pages.findIndex(p => String(p.page_id) === String(pageId));
    if (idx < 0) return pages;
    const page = pages[idx];
    const fns = Array.isArray(page.functions) ? page.functions : [];
    if (fns.length > 0) return pages;
    return pages.filter(p => String(p.page_id) !== String(pageId));
  };

  const upsertFunctionInPage = (pages: any[], pageId: string, fn: any, add: boolean) => {
    // ensure main + page
    let safePages = ensureMainForPage(pages, pageId);

    const idx = safePages.findIndex(p => String(p.page_id) === String(pageId));
    if (idx >= 0) {
      const page = safePages[idx];
      const current = Array.isArray(page.functions) ? page.functions : [];
      let nextFns: any[];
      if (add) {
        const exists = current.some((f: any) => String(f.function_id) === String(fn.function_id));
        nextFns = exists ? current : [...current, fn];
      } else {
        nextFns = current.filter((f: any) => String(f.function_id) !== String(fn.function_id));
      }
      const nextPage = { ...page, functions: nextFns };
      const nextPages = [...safePages];
      nextPages[idx] = nextPage;
      if (!add) return pruneEmptySubPage(nextPages, pageId);
      return nextPages;
    }
    return safePages;
  };

  // ===== Toggle handlers (แก้ไขเฉพาะ draftDevice) =====
  const togglePage = (page: any, checked: boolean) => {
    setDraftDevice((prev: any) => {
      const currentPages: any[] = prev?.pages ?? [];
      const currentFns: any[]   = prev?.functions ?? [];

      if (!page?.page_id) return prev;

      const isMain = !page?.main_page_id;

      if (isMain) {
        const flatPages  = collectPagesForMainFlat(page);
        const clusterIds = collectAllIdsForMainCluster(page);
        const clusterFns = collectFunctionsFromCluster(page);

        if (checked) {
          const nextPages = uniqueByPageId([...currentPages, ...flatPages]);
          const nextFns   = uniqueByFunctionId([...currentFns, ...clusterFns]);
          return { ...prev, pages: nextPages, functions: nextFns, is_selected: true };
        } else {
          const idsForRemovePages: Set<string> = new Set<string>(
            flatPages.map((p: any) => String(p.page_id))
          );
          const nextPages = removePagesByIds(currentPages, idsForRemovePages);
          const nextFns   = removeFunctionsByPageIds(currentFns, clusterIds);
          return { ...prev, pages: nextPages, functions: nextFns };
        }
      }

      // sub page
      if (checked) {
        let nextPages = ensureMainForPage(currentPages, String(page.page_id));
        const fnsOfThisPage = collectFunctionsFromPage(page);
        const nextFns = uniqueByFunctionId([...currentFns, ...fnsOfThisPage]);
        return { ...prev, pages: nextPages, functions: nextFns, is_selected: true };
      } else {
        const nextPages = currentPages.filter(p => String(p.page_id) !== String(page.page_id));
        const nextFns   = (currentFns ?? []).filter(fn => String(fn.page_id) !== String(page.page_id));
        return { ...prev, pages: nextPages, functions: nextFns };
      }
    });
  };

  const toggleFunction = (fn: any, checked: boolean) => {
    setDraftDevice((prev: any) => {
      const currentFns: any[]   = prev?.functions ?? [];
      const currentPages: any[] = prev?.pages ?? [];
      if (!fn?.function_id || !fn?.page_id) return prev;

      const exists = currentFns.findIndex(f => String(f.function_id) === String(fn.function_id)) >= 0;
      const nextFns = checked
        ? (exists ? currentFns : [...currentFns, fn])
        : currentFns.filter(f => String(f.function_id) !== String(fn.function_id));

      let nextPages = upsertFunctionInPage(currentPages, String(fn.page_id), fn, checked);
      if (!checked) {
        nextPages = pruneEmptySubPage(nextPages, String(fn.page_id));
      }

      return { ...prev, pages: nextPages, functions: uniqueByFunctionId(nextFns), is_selected: true };
    });
  };

  // main list (จาก product_data)
  const mains = useMemo(
    () => (product_data ?? []).filter(p => !p.main_page_id),
    [product_data]
  );

  // ===== SAVE: ค่อย setValue กลับเข้า form ตอนนี้เท่านั้น =====
  const handleSave = useCallback(() => {
    // ยัด draftDevice กลับไปใน product_device_permissions (แทนที่/เพิ่ม POS)
    const list = [...(formDevicePerms as any[])];
    const idx = list.findIndex(
      d => d?.product_device_id === '2' || d?.product_device_name === 'pos'
    );
    if (idx >= 0) list[idx] = draftDevice;
    else list.push(draftDevice);

    setValue('product_device_permissions', list, { shouldDirty: true, shouldTouch: true });
    setOpen(false);
  }, [draftDevice, formDevicePerms, setOpen, setValue]);

  return (
    <Modal
      open={open}
      aria-labelledby="pkg-title"
      closeAfterTransition
      keepMounted
      slotProps={{ backdrop: { timeout: 200 } }}
    >
      <Box sx={modalStyle}>
        {/* Header */}
        <Box
          sx={{
            px: { xs: 1, sm: 2 },
            py: 1,
            display: 'grid',
            gridTemplateColumns: '40px 1fr auto',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>

          <Typography id="pkg-title" variant="h5" sx={{ textAlign: 'center', fontWeight: 600 }}>
            แพ็คเกจ
          </Typography>

          <Button variant="contained" color="warning" size="small" onClick={handleSave} sx={{ justifySelf: 'end', px: 2 }}>
            บันทึก
          </Button>
        </Box>

        <Divider />

        {/* Body */}
        <Box sx={{ p: { xs: 1.5, sm: 2 }, overflowY: 'auto', flex: 1 }}>
          {mains.map(main => (
            <Accordion key={main.page_id} disableGutters defaultExpanded sx={{ bgcolor: 'transparent', boxShadow: 'none', mb: 1 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <FormControlLabel
                  onClick={e => e.stopPropagation()}
                  onFocus={e => e.stopPropagation()}
                  control={
                    <Checkbox
                      checked={isMainCheckedUI(main)}
                      onChange={(_, checked) => togglePage(main, checked)}
                    />
                  }
                  label={<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{main.page_name}</Typography>}
                />
              </AccordionSummary>

              <AccordionDetails>
                <Stack spacing={1.25}>
                  {/* sub pages */}
                  {(main.sub_pages ?? []).map(sp => (
                    <Box key={sp.page_id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedPageIds.has(String(sp.page_id))}
                            onChange={(_, checked) => togglePage(sp, checked)}
                          />
                        }
                        label={<Typography variant="body1">{sp.page_name}</Typography>}
                      />

                      {/* functions under sub page (ตั้งแถวลงมา) */}
                      {(sp.functions ?? []).length > 0 && (
                        <Box sx={{ pl: 4, mt: 0.25 }}>
                          <Stack direction="column" spacing={0.5}>
                            {(sp.functions ?? []).map(fn => (
                              <FormControlLabel
                                key={fn.function_id}
                                control={
                                  <Checkbox
                                    checked={selectedFunctionIds.has(String(fn.function_id))}
                                    onChange={(_, checked) => toggleFunction(fn, checked)}
                                  />
                                }
                                label={<Typography variant="body2">• {fn.function_name}</Typography>}
                              />
                            ))}
                          </Stack>
                        </Box>
                      )}
                    </Box>
                  ))}

                  {/* functions attached directly to main (ถ้ามี) */}
                  {(main.functions ?? []).length > 0 && (
                    <Box sx={{ pl: 2, mt: 1.25 }}>
                      <Stack direction="column" spacing={0.5}>
                        {(main.functions ?? []).map(fn => (
                          <FormControlLabel
                            key={fn.function_id}
                            sx={{ display: 'block', alignItems: 'flex-start', m: 0 }}
                            control={
                              <Checkbox
                                checked={selectedFunctionIds.has(String(fn.function_id))}
                                onChange={(_, checked) => toggleFunction(fn, checked)}
                                size="small"
                              />
                            }
                            label={<Typography variant="body2">• {fn.function_name}</Typography>}
                          />
                        ))}
                      </Stack>
                    </Box>
                  )}
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default PosProduct;