import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
    FieldErrors,
    UseFormGetValues,
    UseFormSetValue,
    UseFormWatch
} from 'react-hook-form';
import type {
    IPackageItemMain
} from '../../../../../product&services/package_services/interface/PackageServices.interface';
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

export interface IChangePackageProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    getValues: UseFormGetValues<IBranchItem>;
    setValue: UseFormSetValue<IBranchItem>;
    errors: FieldErrors<IBranchItem>;
    watch: UseFormWatch<IBranchItem>;
}

// ช่วยให้ TypeScript เงียบ ถ้า interface จริงมี field เพิ่มก็จะยัง work
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
    end_at?: string;   // 'DD/MM/YYYY'
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

const ChangePackage: React.FunctionComponent<IChangePackageProps> = ({
    open,
    setOpen,
    getValues,
    setValue,
    watch,
    errors
}) => {
    const [, setSearchState] = useAtom(searchStatePackageMain);
    const { items, loading, hasMore, loadFirst, loadNext } = usePkgMainWithCache();

    const [input, setInput] = useState('');
    const [autoValue, setAutoValue] = useState<IPackageItemMain | null>(null); // package ที่เลือกใน dialog
    const lastSelectedRef = useRef<IPackageItemMain | null>(null);
    const [openAC, setOpenAC] = useState(false);

    // ----- draft state: แก้เล่นใน dialog ก่อน -----
    const [draftSummary, setDraftSummary] = useState<PackageSummary | null>(null);
    const [draftNatsItems, setDraftNatsItems] = useState<any[]>([]);

    // เวลา dialog เปิด → โหลดค่าเดิมจาก form มาเป็น draft
    // useEffect(() => {
    //     if (open) {
    //         const currentSummary = (getValues('package_summary') ?? {}) as PackageSummary;
    //         const currentItems = getValues('nats_subscription.items') || [];
    //         setDraftSummary({
    //             ...defaultSummary,
    //             ...currentSummary
    //         });
    //         setDraftNatsItems(currentItems);
    //         // ถ้าอยาก auto select package ใน autocomplete จากของเดิม
    //         // สามารถใช้ package_id เทียบกับ items ได้ ถ้าจำเป็น
    //     }
    // }, [open, getValues]);
    useEffect(() => {
        if (open) {
            setDraftSummary({ ...defaultSummary });
            setDraftNatsItems([]);
            setAutoValue(null);
            setInput('');
        }
    }, [open]);
    
    const selectedMain: IPackageItemMain | null = autoValue;

    // ----- options สำหรับ "การใช้บริการ" -----
    const serviceOptions = useMemo(() => {
        if (!autoValue) {
            // ถ้ายังไม่เลือกแพ็ก → ให้เลือกได้แค่ "ทดลองใช้" code 4
            return SERVICE_TYPE_LABELS.filter((o) => o.code === '4');
        }

        const enabledCodes: string[] = [];
        if (autoValue.price_daily?.is_selected) enabledCodes.push('1');
        if (autoValue.price_monthly?.is_selected) enabledCodes.push('2');
        if (autoValue.price_yearly?.is_selected) enabledCodes.push('3');

        let opts = SERVICE_TYPE_LABELS.filter((o) => enabledCodes.includes(o.code));

        if (opts.length === 0) {
            opts = SERVICE_TYPE_LABELS.filter((o) => o.code === '4');
        }

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

    const resetDraft = useCallback(() => {
        setDraftSummary(null);
        setDraftNatsItems([]);
        setAutoValue(null);
        setInput('');
        lastSelectedRef.current = null;
        setOpenAC(false);
    }, []);

    // helper คำนวณราคา
    const calcPriceFromService = (
        pkg: IPackageItemMain | null,
        serviceCode?: string
    ): number => {
        if (!pkg || !serviceCode) return 0;

        switch (serviceCode) {
            case '1': // รายวัน
                if (pkg.price_daily?.is_selected) return pkg.price_daily.price;
                return 0;
            case '2': // รายเดือน
                if (pkg.price_monthly?.is_selected) return pkg.price_monthly.price;
                return 0;
            case '3': // รายปี
                if (pkg.price_yearly?.is_selected) return pkg.price_yearly.price;
                return 0;
            case '4': // ทดลองใช้
            default:
                return 0;
        }
    };

    const handleStartDateChange = (value: Dayjs | null) => {
        if (!value) {
            // clear
            setDraftSummary((prev) =>
                prev
                    ? {
                        ...prev,
                        start_at: '',
                        end_at: '',
                        start_date: '',
                        end_date: '',
                    }
                    : prev
            );

            setDraftNatsItems((prev) => {
                if (!prev[0]) return prev;
                return [
                    {
                        ...prev[0],
                        start_at: 0,
                        end_at: 0
                    }
                ];
            });

            return;
        }

        const startDay = value.startOf('day');

        setDraftSummary((prev) => {
            const current = prev ?? { ...defaultSummary };

            const currentUnit = current.unit_price || '';
            const service = serviceOptions.find((opt) => opt.name === currentUnit);

            let endDay: Dayjs | null = null;
            if (service) {
                switch (service.code) {
                    case '1':
                        endDay = startDay.add(1, 'day');
                        break;
                    case '2':
                        endDay = startDay.add(1, 'month');
                        break;
                    case '3':
                        endDay = startDay.add(1, 'year');
                        break;
                    default:
                        endDay = null;
                }
            }

            // sync draftNatsItems
            setDraftNatsItems((prevItems) => {
                if (!prevItems[0]) return prevItems;
                return [
                    {
                        ...prevItems[0],
                        start_at: startDay.unix(),
                        end_at: endDay ? endDay.startOf('day').unix() : 0
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
            setDraftSummary((prev) =>
                prev
                    ? {
                        ...prev,
                        end_at: ''
                    }
                    : prev
            );

            setDraftNatsItems((prev) => {
                if (!prev[0]) return prev;
                return [
                    {
                        ...prev[0],
                        end_at: 0
                    }
                ];
            });

            return;
        }

        let endDay = value.startOf('day');

        // กันเคส end < start
        if (draftSummary?.start_at) {
            const startDay = dayjs(draftSummary.start_at, 'DD/MM/YYYY').startOf('day');
            if (endDay.isBefore(startDay)) {
                endDay = startDay;
            }
        }

        setDraftSummary((prev) =>
            prev
                ? {
                    ...prev,
                    end_at: endDay.format('DD/MM/YYYY'),
                    end_date: endDay.format('DD/MM/YYYY'),
                }
                : prev
        );

        setDraftNatsItems((prev) => {
            if (!prev[0]) return prev;
            return [
                {
                    ...prev[0],
                    end_at: endDay.unix()
                }
            ];
        });
    };

    const handleClose = useCallback(() => {
        setOpen(false);
        resetDraft();
    }, [setOpen, resetDraft]);

    const handleSave = () => {
        if (draftSummary) {
            setValue('package_summary', draftSummary);
        }
        setValue('nats_subscription.items', draftNatsItems);

        if (draftNatsItems[0]) {
            setValue('nats_subscription.start_at', draftNatsItems[0].start_at ?? 0);
            setValue('nats_subscription.end_at', draftNatsItems[0].end_at ?? 0);
        }

        setOpen(false);
        resetDraft();
    };

    return (
        <Dialog fullWidth maxWidth={'md'} open={open}>
            {/* Header */}
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
                        <Typography variant="subtitle2">{'ข้อมูลแพ็คเกจหลัก'}</Typography>
                    </Grid>

                    <Grid size={12} sx={{ mt: 1 }}>
                        <Stack direction="column" spacing={1}>
                            {/* เลือกแพ็คเกจหลัก */}
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Autocomplete
                                    open={openAC}
                                    onOpen={() => {
                                        setOpenAC(true);
                                        setSearchState((p) => ({ ...p, search: '', page: '1' }));
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

                                        setDraftSummary((prev) => {
                                            const prevSummary = prev ?? defaultSummary;
                                            return {
                                                ...defaultSummary,
                                                ...prevSummary,
                                                package_name_main: v?.package_name ?? '',
                                                start_date: '',
                                                end_date: '',
                                                price: 0,
                                                unit_price: '',
                                                payment_status: prevSummary.payment_status ?? 'รอชำระเงิน',
                                                add_pk_Count: 0,
                                                add_pk: [],
                                                start_at: '',
                                                end_at: ''
                                            };
                                        });

                                        if (v) {
                                            setDraftNatsItems([
                                                {
                                                    package_code: v.package_code,
                                                    package_name: v.package_name,
                                                    package_id: v.package_id,
                                                    start_at: 0,
                                                    end_at: 0,
                                                    price: 0,
                                                    compatible_main_package_id: '',
                                                    periodicity: {
                                                        daily: false,
                                                        monthly: false,
                                                        yearly: false
                                                    }
                                                }
                                            ]);
                                        } else {
                                            setDraftNatsItems([]);
                                        }
                                    }}
                                    options={items}
                                    loading={loading}
                                    filterOptions={(x) => x}
                                    getOptionLabel={(o) => o.package_name || o.package_code || ''}
                                    isOptionEqualToValue={(o, v) => String(o.package_id) === String(v?.package_id)}
                                    inputValue={input}
                                    onInputChange={(_, v) => {
                                        setInput(v);
                                        setSearchState((p) => ({ ...p, search: v ?? '', page: '1' }));
                                        loadFirst();
                                    }}
                                    ListboxProps={{
                                        sx: {
                                            maxHeight: 280,
                                            overflow: 'auto',
                                            WebkitOverflowScrolling: 'touch'
                                        },
                                        onScrollCapture: (e: React.UIEvent<HTMLUListElement>) => {
                                            const el = e.currentTarget;
                                            const nearBottom =
                                                el.scrollTop + el.clientHeight >= el.scrollHeight - 24;
                                            if (nearBottom && !loading && hasMore) loadNext();
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="แพ็คเกจหลัก"
                                            variant="filled"
                                            autoComplete="off"
                                            onFocus={() => {
                                                setOpenAC(true);
                                                setSearchState((p) => ({ ...p, search: '', page: '1' }));
                                                loadFirst();
                                            }}
                                            error={!!errors?.package_summary?.package_name_main}
                                            helperText={
                                                errors?.package_summary?.package_name_main?.message || ''
                                            }
                                        />
                                    )}
                                />
                            </Box>

                            {/* การใช้บริการ */}
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Autocomplete
                                    fullWidth
                                    options={serviceOptions}
                                    value={
                                        serviceOptions.find(
                                            (opt) => opt.name === (draftSummary?.unit_price ?? '')
                                        ) ?? null
                                    }
                                    getOptionLabel={(o) => o.name}
                                    isOptionEqualToValue={(o, v) => o.code === v.code}
                                    onChange={(_, v) => {
                                        const price = calcPriceFromService(selectedMain, v?.code);

                                        // อัปเดต summary
                                        setDraftSummary((prev) => {
                                            const current = prev ?? defaultSummary;
                                            return {
                                                ...current,
                                                unit_price: v?.name ?? '',
                                                price
                                            };
                                        });

                                        // อัปเดต periodicity + price ใน item หลัก
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
                                                    }
                                                }
                                            ];
                                        });

                                        // จัดการวันที่ตาม period
                                        setDraftSummary((prev) => {
                                            const current = prev ?? defaultSummary;

                                            let startDay: Dayjs;
                                            if (current.start_at) {
                                                startDay = dayjs(current.start_at, 'DD/MM/YYYY').startOf('day');
                                            } else {
                                                startDay = dayjs().startOf('day');
                                            }

                                            let endDay: Dayjs | null = null;
                                            if (v) {
                                                switch (v.code) {
                                                    case '1':
                                                        endDay = startDay.add(1, 'day');
                                                        break;
                                                    case '2':
                                                        endDay = startDay.add(1, 'month');
                                                        break;
                                                    case '3':
                                                        endDay = startDay.add(1, 'year');
                                                        break;
                                                    default:
                                                        endDay = null;
                                                }
                                            }

                                            setDraftNatsItems((prevItems) => {
                                                if (!prevItems[0]) return prevItems;
                                                return [
                                                    {
                                                        ...prevItems[0],
                                                        start_at: startDay.unix(),
                                                        end_at: endDay ? endDay.startOf('day').unix() : 0
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
                                            return [
                                                {
                                                    ...prevItems[0],
                                                    price: v
                                                }
                                            ];
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
                                                textField: {
                                                    variant: 'filled',
                                                    autoComplete: 'off',
                                                    fullWidth: true
                                                }
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
                                                textField: {
                                                    variant: 'filled',
                                                    autoComplete: 'off',
                                                    fullWidth: true
                                                }
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

export default ChangePackage;