import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import AddIcon from "@mui/icons-material/Add";
import { useAtom } from "jotai";
import type { IPackageItem, IPackageItemMain } from "../../interface/PackageServices.interface";
import { searchStatePackageMain } from "../../hook/AtomPackageServices";
import type { FieldErrors, UseFormClearErrors, UseFormGetValues, UseFormSetError, UseFormSetValue, UseFormWatch } from "react-hook-form";
import CloseIcon from '../../../../../assets/svg/icon/close.svg';
import { usePkgMainWithCache } from "../../hook/useFetchPackage";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface IRelatedModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getValues: UseFormGetValues<IPackageItem>;
  setValue: UseFormSetValue<IPackageItem>;
  errors: FieldErrors<IPackageItem>;
  watch: UseFormWatch<IPackageItem>;
  setError: UseFormSetError<IPackageItem>;
  clearErrors: UseFormClearErrors<IPackageItem>;
  actype: string;
}

const RelatedModal: React.FC<IRelatedModalProps> = ({
  open,
  setOpen,
  getValues,
  setValue,
  watch,
}) => {
  const [, setSearchState] = useAtom(searchStatePackageMain);
  const { items, loading, hasMore, loadFirst, loadNext, reloadNow } = usePkgMainWithCache();
  // ---------- local state (ใช้แสดง/แก้ไขใน modal เท่านั้น) ----------
  const [tempSelected, setTempSelected] = useState<IPackageItemMain[]>([]);
  const [input, setInput] = useState("");
  const [autoValue, setAutoValue] = useState<IPackageItemMain | null>(null); // ค่าที่เล็งจะ "เพิ่ม"
  const lastSelectedRef = useRef<IPackageItemMain | null>(null);
  const [openAC, setOpenAC] = useState(false);
  const initRef = useRef(false);

  useEffect(() => {
    if (open) {
      reloadNow();
    }
  }, [open]);

  useEffect(() => {
    if (!open || initRef.current) return;
    initRef.current = true;

    setTempSelected((getValues("compatible_package_ids") ?? []) as IPackageItemMain[]);
    setAutoValue(null);
    setSearchState(p => ({ ...p, search: "", page: "1" }));
    loadFirst();
  }, [open]); // หรือจะคุม deps แบบข้อ A

  useEffect(() => {
    if (!open) initRef.current = false; // reset flag ตอนปิด
  }, [open]);

  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const handleAddClick = () => {
    console.log('handleAddClick')
    console.log('autoValue', autoValue)
    console.log('items', items)
    console.log('input', input)
    const option =
      autoValue ??
      lastSelectedRef.current ??
      items.find(x =>
        x.package_name?.toLowerCase() === input.toLowerCase() ||
        x.package_code?.toLowerCase() === input.toLowerCase()
      );

    console.log('option', option)
    if (!option) return;
    console.log('!option', option)

    setTempSelected(prev => ([
      ...prev.filter(p => String(p.package_id) !== String(option.package_id)),
      {
        package_id: option.package_id,
        package_name: option.package_name,
        package_code: option.package_code,
        is_active: !!option.is_active,
      },
    ]));

    // รีเซ็ต แล้วเปิด popup พร้อมโหลดหน้าแรกให้เลือกต่อทันที
    setAutoValue(null);
    lastSelectedRef.current = null;
    setInput('');
    setSearchState(p => ({ ...p, search: '', page: '1' }));
    loadFirst();
    setOpenAC(false);
  };

  // useEffect(() => {
  //   console.log('tempSelected changed =>', tempSelected);
  // }, [tempSelected]);

  const handleDelete = (package_id: string) => {
    setTempSelected((prev) => prev.filter((p) => String(p.package_id) !== String(package_id)));
  };

  // ---------- บันทึก (เพิ่งตอนนี้เท่านั้นที่ setValue ลงฟอร์ม) ----------
  const handleSave = () => {
    setValue("compatible_package_ids", tempSelected, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setOpen(false);
  };

  const hasItems = tempSelected.length > 0;

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      slots={{ transition: Transition }}
      keepMounted
    >
      {/* Header */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "40px 1fr auto",
          alignItems: "center",
          gap: 1,
          px: 2,
          py: 1.25,
        }}
      >
        <IconButton
          size="small"
          onClick={handleClose}
          sx={{
            width: 56,
            height: 56,
            borderRadius: 2,
            bgcolor: 'action.hover',
            '&:hover': { bgcolor: '#E9ECEF' },
          }}
        >
          <img src={CloseIcon} alt="close" />
        </IconButton>
        <Box />
        <Button variant="contained" size="small" onClick={handleSave} sx={{ px: 2 }}>
          <Typography variant="subtitle1" >
            {"บันทึก"}
          </Typography>

        </Button>
      </Box>
      <DialogTitle>
        <Typography fontSize={28} fontWeight={500} sx={{ textAlign: "left" }}>
          {"แพ็คเกจที่เกี่ยวข้อง"}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ pt: 0 }}>
        {/* Chips */}
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 2 }}>
          {hasItems ? (
            tempSelected.map((p) => (
              <Chip
                key={p.package_id}
                onDelete={() => handleDelete(p.package_id)}
                variant="outlined"
                label={<Typography variant="subtitle1">{p.package_name}</Typography>}
                sx={{ height: 40, borderRadius: 1.5 }}
              />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              {"ยังไม่มีแพ็คเกจที่เกี่ยวข้อง"}
            </Typography>
          )}
        </Stack>

        {/* Autocomplete + เพิ่ม */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Autocomplete
              open={openAC}
              onOpen={() => {
                setOpenAC(true);
                // ทุกครั้งที่เปิด ให้รีเซ็ต search เป็นค่าว่างและโหลดหน้าแรก
                setSearchState(p => ({ ...p, search: '', page: '1' }));
                loadFirst();
              }}
              onClose={() => setOpenAC(false)}
              openOnFocus
              disableCloseOnSelect
              clearOnBlur={false}
              value={autoValue}
              onChange={(_, v) => {
                setAutoValue(v);
                lastSelectedRef.current = v ?? null;
              }}
              options={items}
              loading={loading}
              filterOptions={(x) => x}
              getOptionLabel={(o) => o.package_name || o.package_code || ''}
              isOptionEqualToValue={(o, v) => String(o.package_id) === String(v?.package_id)}
              inputValue={input}
              onInputChange={(_, v) => {
                // ให้ยิงค้นหาเฉพาะตอนพิมพ์จริง ๆ
                setInput(v);
                setSearchState(p => ({ ...p, search: v ?? '', page: '1' }));
                loadFirst();
              }}
              ListboxProps={{
                sx: { maxHeight: 280, overflow: 'auto', WebkitOverflowScrolling: 'touch' },
                onScrollCapture: (e: React.UIEvent<HTMLUListElement>) => {
                  const el = e.currentTarget;
                  const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 24;
                  if (nearBottom && !loading && hasMore) loadNext();
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="เลือกแพ็คเกจที่เกี่ยวข้อง"
                  onFocus={() => {
                    // เผื่อผู้ใช้คลิกแล้วอยากเห็นรายการทันที
                    setOpenAC(true);
                    setSearchState(p => ({ ...p, search: '', page: '1' }));
                    loadFirst();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddClick();
                    }
                  }}
                />
              )}
            />
          </Box>

          <Button
            variant="contained"
            color="warning"
            size="small"
            startIcon={<AddIcon />}
            onClick={handleAddClick}
            onMouseDown={(e) => e.preventDefault()}
            sx={{ px: 2, height: 40, alignSelf: 'center' }}
          >
            {"เพิ่ม"}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default RelatedModal;