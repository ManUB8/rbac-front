import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { FieldErrors, UseFormGetValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { IPackageItemMain } from '../../../../../product&services/package_services/interface/PackageServices.interface';
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import CloseIcon from '../../../../../../assets/svg/icon/close.svg';
import { useAtom } from 'jotai';
import { searchStatePackageMain } from '../../../../../product&services/package_services/hook/AtomPackageServices';
import { usePkgMainWithCache } from '../../../../../product&services/package_services/hook/useFetchPackage';
import type { IBranchItem } from '../../../../interface/Branch.interface';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { SERVICE_TYPE_LABELS } from '../../../constants/package_option';
import { NumericFormat } from 'react-number-format';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export interface IRenewPackageProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getValues: UseFormGetValues<IBranchItem>;
  setValue: UseFormSetValue<IBranchItem>;
  errors: FieldErrors<IBranchItem>;
  watch: UseFormWatch<IBranchItem>;
}

type PackageSummary = IBranchItem['package_summary'] & {
  package_name_main?: string;
  start_date?: string;
  end_date?: string;
  price?: number;
  unit_price?: string;
  payment_status?: string;
  add_pk_Count?: number;
  add_pk?: any[];
  start_at?: string; // 'DD/MM/YYYY'
  end_at?: string; // 'DD/MM/YYYY'
};

const defaultSummary: PackageSummary = {
  package_name_main: '',
  start_date: '',
  end_date: '',
  price: 0,
  unit_price: '',
  payment_status: 'รอชำระเงิน',
  add_pk_Count: 0,
  add_pk: [],
  start_at: '',
  end_at: ''
};

const RenewPackage: React.FunctionComponent<IRenewPackageProps> = ({
  open,
  setOpen,
  getValues,
  setValue,
  watch,
  errors
}) => {
  const [, setSearchState] = useAtom(searchStatePackageMain);
  const { items, loading } = usePkgMainWithCache();

  const [input, setInput] = useState('');
  const [autoValue, setAutoValue] = useState<IPackageItemMain | undefined>(undefined);
  const lastSelectedRef = useRef<IPackageItemMain | undefined>(undefined);

  const [draftSummary, setDraftSummary] = useState<PackageSummary | null>(null);
  const [draftNatsItems, setDraftNatsItems] = useState<any[]>([]);

  const findServiceByName = (name?: string) =>
    SERVICE_TYPE_LABELS.find((x) => x.name === (name ?? ''));

  const calcEndByService = (startDay: Dayjs, serviceCode?: string) => {
    if (!serviceCode) return null;
    switch (serviceCode) {
      case '1':
        return startDay.add(1, 'day');
      case '2':
        return startDay.add(1, 'month');
      case '3':
        return startDay.add(1, 'year');
      default:
        return null;
    }
  };

  const calcPriceFromService = (pkg: IPackageItemMain | undefined, serviceCode?: string): number => {
    if (!pkg || !serviceCode) return 0;
    switch (serviceCode) {
      case '1':
        return pkg.price_daily?.is_selected ? pkg.price_daily.price : 0;
      case '2':
        return pkg.price_monthly?.is_selected ? pkg.price_monthly.price : 0;
      case '3':
        return pkg.price_yearly?.is_selected ? pkg.price_yearly.price : 0;
      case '4':
      default:
        return 0;
    }
  };

  // ✅ เปิด dialog -> โหลดค่าเดิม + ล็อกแพ็คเกจหลัก
  // ✅ “การใช้บริการ” ต้อง default ค่าเดิม (ไม่ reset)
  useEffect(() => {
    if (!open) return;

    const currentSummary = (getValues('package_summary') ?? {}) as PackageSummary;
    const currentItems = getValues('nats_subscription.items') || [];
    const item0 = currentItems?.[0] ?? {};

    // ---- lock package main (จาก items[0]) ----
    const lockedPkgId = item0?.package_id ?? undefined;
    const lockedPkgName = item0?.package_name ?? currentSummary?.package_name_main ?? '';

    const fullPkgFromCache = items.find((p) => String(p.package_id) === String(lockedPkgId));
    const lockedPkg = (fullPkgFromCache ??
      ({
        package_id: lockedPkgId,
        package_name: lockedPkgName
      } as unknown as IPackageItemMain)) as IPackageItemMain;

    if (lockedPkgId || lockedPkgName) {
      setAutoValue(lockedPkg);
      lastSelectedRef.current = lockedPkg;
      setInput(lockedPkgName || lockedPkg.package_name || '');
    } else {
      setAutoValue(undefined);
      lastSelectedRef.current = undefined;
      setInput('');
    }

    // ✅ draft summary: คงค่าเดิมไว้ทั้งหมด (รวม unit_price/price/start_at/end_at)
    setDraftSummary({
      ...defaultSummary,
      ...currentSummary
    });

    // ✅ draft items: คงค่าเดิมไว้ (ไม่ reset periodicity)
    setDraftNatsItems(currentItems);
  }, [open, getValues, items]);

  const packageMainOptions = useMemo(() => {
    if (!autoValue) return items;
    const exists = items.some((x) => String(x.package_id) === String(autoValue.package_id));
    return exists ? items : [autoValue, ...items];
  }, [items, autoValue]);

  // options การใช้บริการ อิงจากแพ็คหลัก
  const serviceOptions = useMemo(() => {
    if (!autoValue) return SERVICE_TYPE_LABELS.filter((o) => o.code === '4');

    const enabledCodes: string[] = [];
    if (autoValue.price_daily?.is_selected) enabledCodes.push('1');
    if (autoValue.price_monthly?.is_selected) enabledCodes.push('2');
    if (autoValue.price_yearly?.is_selected) enabledCodes.push('3');

    let opts = SERVICE_TYPE_LABELS.filter((o) => enabledCodes.includes(o.code));
    if (opts.length === 0) opts = SERVICE_TYPE_LABELS.filter((o) => o.code === '4');
    return opts;
  }, [autoValue]);

  const startDateValue: Dayjs | null = useMemo(() => {
    if (!draftSummary?.start_at) return null;
    return dayjs(draftSummary.start_at, 'DD/MM/YYYY');
  }, [draftSummary?.start_at]);

  const endDateValue: Dayjs | null = useMemo(() => {
    if (!draftSummary?.end_at) return null;
    return dayjs(draftSummary.end_at, 'DD/MM/YYYY');
  }, [draftSummary?.end_at]);

  const handleStartDateChange = (value: Dayjs | null) => {
    if (!value) {
      setDraftSummary((prev) => (prev ? { ...prev, start_at: '', end_at: '', start_date: '', end_date: '', } : prev));
      setDraftNatsItems((prev) => {
        if (!prev[0]) return prev;
        return [{ ...prev[0], start_at: 0, end_at: 0 }];
      });
      return;
    }

    const startDay = value.startOf('day');

    setDraftSummary((prev) => {
      const current = prev ?? { ...defaultSummary };

      const service = findServiceByName(current.unit_price);
      const endDay = calcEndByService(startDay, service?.code);

      setDraftNatsItems((prevItems) => {
        if (!prevItems[0]) return prevItems;
        return [
          {
            ...prevItems[0],
            start_at: startDay.unix(),
            end_at: endDay ? endDay.startOf('day').unix() : 0, 
          }
        ];
      });

      return {
        ...current,
        start_at: startDay.format('DD/MM/YYYY'),
        end_at: endDay ? endDay.format('DD/MM/YYYY') : '',
        start_date: startDay.format('DD/MM/YYYY'),
        end_date: endDay ? endDay.format('DD/MM/YYYY') : '',
      };
    });
  };

  const handleEndDateChange = (value: Dayjs | null) => {
    if (!value) {
      setDraftSummary((prev) => (prev ? { ...prev, end_at: '' } : prev));
      setDraftNatsItems((prev) => {
        if (!prev[0]) return prev;
        return [{ ...prev[0], end_at: 0 }];
      });
      return;
    }

    let endDay = value.startOf('day');
    if (draftSummary?.start_at) {
      const startDay = dayjs(draftSummary.start_at, 'DD/MM/YYYY').startOf('day');
      if (endDay.isBefore(startDay)) endDay = startDay;
    }

    setDraftSummary((prev) => (prev ? { ...prev, end_at: endDay.format('DD/MM/YYYY'), end_date: endDay.format('DD/MM/YYYY') } : prev));

    setDraftNatsItems((prev) => {
      if (!prev[0]) return prev;
      return [{ ...prev[0], end_at: endDay.unix() }];
    });
  };

  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const handleSave = () => {
    console.log('draftSummary', draftSummary)
    if (draftSummary) setValue('package_summary', draftSummary);
    setValue('nats_subscription.items', draftNatsItems);

    if (draftNatsItems[0]) {
      setValue('nats_subscription.start_at', draftNatsItems[0].start_at ?? 0);
      setValue('nats_subscription.end_at', draftNatsItems[0].end_at ?? 0);
    }

    setOpen(false);
  };

  return (
    <Dialog fullWidth maxWidth={'md'} open={open}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '40px 1fr auto',
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 1.25
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
            '&:hover': { bgcolor: '#E9ECEF' }
          }}
        >
          <img src={CloseIcon} alt="close" />
        </IconButton>
        <Box />
        <Button variant="contained" size="small" onClick={handleSave} sx={{ px: 2 }}>
          <Typography variant="subtitle1">{'บันทึก'}</Typography>
        </Button>
      </Box>

      <DialogTitle>
        <Typography fontSize={28} fontWeight={500} sx={{ textAlign: 'left' }}>
          {'แพ็คเกจ'}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography variant="subtitle2">{'ข้อมูลแพ็กหลัก'}</Typography>
          </Grid>

          <Grid size={12} sx={{ mt: 1 }}>
            <Stack direction="column" spacing={1}>
              {/* แพ็คเกจหลัก: ล็อก */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Autocomplete
                  disabled
                  disableClearable
                  value={autoValue}
                  options={packageMainOptions}
                  loading={loading}
                  filterOptions={(x) => x}
                  getOptionLabel={(o) => o.package_name || o.package_code || ''}
                  isOptionEqualToValue={(o, v) => String(o.package_id) === String(v?.package_id)}
                  inputValue={input}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="แพ็คเกจหลัก"
                      variant="filled"
                      autoComplete="off"
                      InputProps={{ ...params.InputProps, readOnly: true }}
                      error={!!errors?.package_summary?.package_name_main}
                      helperText={errors?.package_summary?.package_name_main?.message || ''}
                    />
                  )}
                />
              </Box>

              {/* ✅ การใช้บริการ: default ค่าจาก draftSummary และเลือกแล้วค้าง */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Autocomplete
                  fullWidth
                  options={serviceOptions}
                  value={
                    serviceOptions.find((opt) => opt.name === (draftSummary?.unit_price ?? '')) ??
                    null
                  }
                  getOptionLabel={(o) => o.name}
                  isOptionEqualToValue={(o, v) => o.code === v.code}
                  onChange={(_, v) => {
                    const price = calcPriceFromService(autoValue, v?.code);

                    setDraftSummary((prev) => {
                      const current = prev ?? defaultSummary;

                      const startDay = current.start_at
                        ? dayjs(current.start_at, 'DD/MM/YYYY').startOf('day')
                        : dayjs().startOf('day');

                      const endDay = calcEndByService(startDay, v?.code);

                      setDraftNatsItems((prevItems) => {
                        if (!prevItems[0]) return prevItems;
                        return [
                          {
                            ...prevItems[0],
                            price,
                            periodicity: {
                              daily: v?.code === '1',
                              monthly: v?.code === '2',
                              yearly: v?.code === '3'
                            },
                            start_at: startDay.unix(),
                            end_at: endDay ? endDay.startOf('day').unix() : 0
                          }
                        ];
                      });

                      return {
                        ...current,
                        unit_price: v?.name ?? '',
                        price,
                        start_at: startDay.format('DD/MM/YYYY'),
                        end_at: endDay ? endDay.format('DD/MM/YYYY') : '',
                        start_date: startDay.format('DD/MM/YYYY'),
                        end_date: endDay ? endDay.format('DD/MM/YYYY') : '',
                      };
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="การใช้บริการ"
                      variant="filled"
                      autoComplete="off"
                      error={!!errors?.package_summary?.unit_price}
                      helperText={errors?.package_summary?.unit_price?.message || ''}
                    />
                  )}
                />
              </Box>

              {/* ราคา */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <NumericFormat
                  label="ราคา"
                  displayType="input"
                  variant="filled"
                  autoComplete="off"
                  value={draftSummary?.price ?? 0}
                  onValueChange={(values) => {
                    const v = values.floatValue ?? 0;

                    setDraftSummary((prev) => ({
                      ...(prev ?? defaultSummary),
                      price: v
                    }));

                    setDraftNatsItems((prevItems) => {
                      if (!prevItems[0]) return prevItems;
                      return [{ ...prevItems[0], price: v }];
                    });
                  }}
                  customInput={TextField}
                  thousandSeparator=","
                  allowNegative={false}
                  decimalScale={2}
                  fullWidth
                />
              </Box>
            </Stack>
          </Grid>

          {/* วันที่เริ่ม / สิ้นสุด */}
          <Grid size={12}>
            <Grid container spacing={1}>
              <Grid size={{ xs: 12, md: 6 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      label="วันที่เริ่มใช้งาน"
                      value={startDateValue}
                      onChange={handleStartDateChange}
                      format="DD/MM/YYYY"
                      slotProps={{
                        textField: { variant: 'filled', autoComplete: 'off', fullWidth: true }
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      label="วันที่สิ้นสุด"
                      value={endDateValue}
                      onChange={handleEndDateChange}
                      format="DD/MM/YYYY"
                      slotProps={{
                        textField: { variant: 'filled', autoComplete: 'off', fullWidth: true }
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default RenewPackage;