import React, { useRef, useState } from 'react';
import { usePkgMainWithCache } from '../../../../product&services/package_services/hook/useFetchPackage';
import { useAtom } from 'jotai';
import { searchStatePackageMain } from '../../../../product&services/package_services/hook/AtomPackageServices';
import type { FieldErrors, UseFormGetValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { IBranchItem } from '../../../interface/Branch.interface';
import { SERVICE_TYPE_LABELS } from '../../constants/package_option';
import type { IPackageItemMain } from '../../../../product&services/package_services/interface/PackageServices.interface';
import { Autocomplete, Box, Divider, Grid, InputAdornment, Stack, TextField, Typography, type OutlinedInputProps } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export interface IPackageMainProps {
    getValues: UseFormGetValues<IBranchItem>
    setValue: UseFormSetValue<IBranchItem>;
    errors: FieldErrors<IBranchItem>;
    watch: UseFormWatch<IBranchItem>;
    actype: string;
};

const PackageMain: React.FunctionComponent<IPackageMainProps> = ({
    getValues,
    setValue,
    errors,
    watch,
    actype
}) => {
    const [, setSearchState] = useAtom(searchStatePackageMain);
    const { items, loading, hasMore, loadFirst, loadNext, reloadNow } = usePkgMainWithCache();
    const [input, setInput] = useState("");
    const [autoValue, setAutoValue] = useState<IPackageItemMain | null>(null); // ค่าที่เล็งจะ "เพิ่ม"
    const lastSelectedRef = useRef<IPackageItemMain | null>(null);
    const [openAC, setOpenAC] = useState(false);
    const initRef = useRef(false);
    const selectedMain: any = autoValue; // แพ็กเกจที่เลือกปัจจุบัน

    const startDateStr = watch('package_summary.start_date');
    const endDateStr = watch('package_summary.end_date');

    const startDateValue: Dayjs | null = startDateStr
        ? dayjs(startDateStr, 'DD/MM/YYYY')
        : dayjs();

    const endDateValue = endDateStr
        ? dayjs(endDateStr, 'DD/MM/YYYY')
        : dayjs();


    const serviceOptions = React.useMemo(() => {
        if (!autoValue) {
            return SERVICE_TYPE_LABELS.filter(o => o.code === "4");
        }

        console.log('autoValue package:', autoValue); // 👈 ดูว่ามี price_daily จริงไหม

        const enabledCodes: string[] = [];
        if (autoValue.price_daily?.is_selected) enabledCodes.push("1");
        if (autoValue.price_monthly?.is_selected) enabledCodes.push("2");
        if (autoValue.price_yearly?.is_selected) enabledCodes.push("3");

        let opts = SERVICE_TYPE_LABELS.filter(o => enabledCodes.includes(o.code));

        if (opts.length === 0) {
            opts = SERVICE_TYPE_LABELS.filter(o => o.code === "4");
        }

        return opts;
    }, [autoValue]);


    const handleStartDateChange = (value: Dayjs | null) => {
        if (!value) {
            // เคลียร์ทุกอย่าง
            setValue('package_summary.start_date', '');
            setValue('package_summary.end_date', '');

            const items = getValues('package_request.items') || [];
            if (items[0]) {
                setValue('package_request.items', [{
                    ...items[0],
                    start_at: 0,
                    end_at: 0,
                }]);
            }
            return;
        }

        const startDay = value.startOf('day');

        // 1) summary.start_date = 'DD/MM/YYYY'
        setValue('package_summary.start_date', startDay.format('DD/MM/YYYY'));

        // 2) หา service ที่เลือกอยู่ (รายวัน / เดือน / ปี จาก unit_price)
        const service = serviceOptions.find(
            opt => opt.name === getValues('package_summary.unit_price')
        );

        let endDay: Dayjs | null = null;

        if (service) {
            switch (service.code) {
                case '1': // รายวัน
                    endDay = startDay.add(1, 'day');
                    break;
                case '2': // รายเดือน
                    endDay = startDay.add(1, 'month');
                    break;
                case '3': // รายปี
                    endDay = startDay.add(1, 'year');
                    break;
                default:
                    endDay = null;
                    break;
            }
        }

        // 3) summary.end_date = 'DD/MM/YYYY' หรือเคลียร์
        if (endDay) {
            setValue('package_summary.end_date', endDay.format('DD/MM/YYYY'));
        } else {
            setValue('package_summary.end_date', '');
        }

        // 4) package_request.items[0].start_at / end_at = unix (sec)
        const items = getValues('package_request.items') || [];
        if (items[0]) {
            setValue('package_request.items', [{
                ...items[0],
                start_at: startDay.unix(),
                end_at: endDay ? endDay.startOf('day').unix() : 0,
            }]);
        }
    };

    const handleEndDateChange = (value: Dayjs | null) => {
        const items = getValues('package_request.items') || [];
        const mainItem = items[0];

        if (!mainItem) return;

        if (!value) {
            // เคลียร์ end ทั้ง summary และ request
            setValue('package_summary.end_date', '');
            setValue('package_request.items', [{
                ...mainItem,
                end_at: 0,
            }]);
            return;
        }

        let endDay = value.startOf('day');

        // กันกรณี end < start → บีบให้เท่ากับ start
        const startStr = getValues('package_summary.start_date');
        if (startStr) {
            const startDay = dayjs(startStr, 'DD/MM/YYYY').startOf('day');
            if (endDay.isBefore(startDay)) {
                endDay = startDay;
            }
        }

        // 1) set summary.end_date เป็น string
        setValue('package_summary.end_date', endDay.format('DD/MM/YYYY'));

        // 2) set request.items[0].end_at เป็น unix (sec)
        setValue('package_request.items', [{
            ...mainItem,
            end_at: endDay.unix(),
        }]);
    };

    return (
        <>
            <Grid container spacing={2} p={4} >
                <Grid size={12}>
                    <Typography variant='subtitle2'>{'ข้อมูลแพ็กหลัก'}</Typography>
                </Grid>
                <Grid size={12} sx={{ mt: 1 }}>
                    <Stack direction="row" spacing={1}>
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

                                    // เก็บ payment_status เดิมไว้ (ถ้าต้องการ fix ให้เป็น "รอชำระเงิน" ตลอดก็ไม่ต้อง getValues)
                                    const prevSummary = getValues("package_summary");

                                    // ✅ 1) รีเซ็ต package_summary กลับเป็นค่า default
                                    setValue("package_summary", {
                                        package_name_main: v?.package_name ?? "", // ชื่อแพ็กใหม่ (หรือ "" ถ้าเคลียร์)
                                        start_date: "",
                                        end_date: "",
                                        price: 0,
                                        unit_price: "",
                                        payment_status: prevSummary?.payment_status ?? "รอชำระเงิน",
                                        add_pk_Count: 0,
                                        add_pk: [],
                                        start_at: '',
                                        end_at: ''
                                    });

                                    // ✅ 2) รีเซ็ต package_request.items[0] สำหรับแพ็กหลัก
                                    if (v) {
                                        setValue("package_request.items", [
                                            {
                                                package_id: v.package_id,
                                                start_at: 0,
                                                end_at: 0,
                                                price: 0,
                                                compatible_main_package_id: "",
                                                periodicity: {
                                                    daily: false,
                                                    monthly: false,
                                                    yearly: false,
                                                },
                                            },
                                        ]);
                                    } else {
                                        // ถ้าเคลียร์แพ็ก ให้ล้าง items ด้วย
                                        setValue("package_request.items", []);
                                    }
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
                                renderInput={(params) => {
                                    return (
                                        <TextField
                                            {...params}
                                            label="แพ็คเกจหลัก"
                                            variant="filled"
                                            autoComplete="off"
                                            onFocus={() => {
                                                setOpenAC(true);
                                                setSearchState(p => ({ ...p, search: '', page: '1' }));
                                                loadFirst();
                                            }}
                                            error={!!errors?.package_summary?.package_name_main}
                                            helperText={errors?.package_summary?.package_name_main?.message || ''}
                                        />
                                    );
                                }}
                            />
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Autocomplete
                                fullWidth
                                options={serviceOptions}
                                value={
                                    serviceOptions.find(
                                        opt => opt.name === getValues('package_summary.unit_price')
                                    ) ?? null
                                }
                                getOptionLabel={(o) => o.name}
                                isOptionEqualToValue={(o, v) => o.code === v.code}
                                onChange={(_, v) => {
                                    setValue('package_summary.unit_price', v?.name ?? '');

                                    const items = getValues('package_request.items') || [];
                                    const mainItem = items[0];

                                    // -------- 1) คำนวณราคา --------
                                    let price = 0;

                                    if (selectedMain && v) {
                                        switch (v.code) {
                                            case '1': // รายวัน
                                                if (selectedMain.price_daily?.is_selected) {
                                                    price = selectedMain.price_daily.price;
                                                }
                                                break;
                                            case '2': // รายเดือน
                                                if (selectedMain.price_monthly?.is_selected) {
                                                    price = selectedMain.price_monthly.price;
                                                }
                                                break;
                                            case '3': // รายปี
                                                if (selectedMain.price_yearly?.is_selected) {
                                                    price = selectedMain.price_yearly.price;
                                                }
                                                break;
                                            case '4': // ทดลองใช้
                                            default:
                                                price = 0;
                                                break;
                                        }
                                    }

                                    //  summary.price
                                    setValue('package_summary.price', price);

                                    // -------- 2) อัปเดต periodicity + price ใน request.items[0] --------
                                    if (mainItem) {
                                        const updatedMain = {
                                            ...mainItem,
                                            price,
                                            periodicity: {
                                                daily: v?.code === '1',
                                                monthly: v?.code === '2',
                                                yearly: v?.code === '3',
                                            },
                                        };

                                        setValue('package_request.items', [updatedMain]);
                                    }

                                    // -------- 3) จัดการวันที่ + unix time --------

                                    // ถ้ามี start_date อยู่แล้ว → ใช้อันนั้น
                                    // ถ้ายังไม่มี → default เป็น "วันนี้"
                                    let startStr = getValues('package_summary.start_date');
                                    let startDay: Dayjs;

                                    if (startStr) {
                                        startDay = dayjs(startStr, 'DD/MM/YYYY').startOf('day');
                                    } else {
                                        startDay = dayjs().startOf('day');
                                        setValue('package_summary.start_date', startDay.format('DD/MM/YYYY'));
                                    }

                                    let endDay: Dayjs | null = null;

                                    if (v) {
                                        switch (v.code) {
                                            case '1': // รายวัน
                                                endDay = startDay.add(1, 'day');
                                                break;
                                            case '2': // รายเดือน
                                                endDay = startDay.add(1, 'month');
                                                break;
                                            case '3': // รายปี
                                                endDay = startDay.add(1, 'year');
                                                break;
                                            default:
                                                endDay = null;
                                                break;
                                        }
                                    }

                                    if (endDay) {
                                        // summary
                                        setValue('package_summary.end_date', endDay.format('DD/MM/YYYY'));

                                        // request.items[0]
                                        const items2 = getValues('package_request.items') || [];
                                        if (items2[0]) {
                                            setValue('package_request.items', [{
                                                ...items2[0],
                                                start_at: startDay.unix(),
                                                end_at: endDay.startOf('day').unix(),
                                            }]);
                                        }
                                    } else {
                                        // แบบที่ไม่มี period (เช่น ทดลองใช้) → เคลียร์ end
                                        setValue('package_summary.end_date', '');

                                        const items2 = getValues('package_request.items') || [];
                                        if (items2[0]) {
                                            setValue('package_request.items', [{
                                                ...items2[0],
                                                end_at: 0,
                                            }]);
                                        }
                                    }
                                }}
                                renderInput={(params) => {
                                    return (
                                        <TextField
                                            {...params}
                                            label="การใช้บริการ"
                                            variant="filled"
                                            autoComplete="off"
                                            error={!!errors?.package_summary?.unit_price}
                                            helperText={errors?.package_summary?.unit_price?.message || ''}
                                        />
                                    );
                                }}
                            />
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <NumericFormat
                                label='ราคา'
                                displayType="input"
                                variant="filled"
                                autoComplete="off"
                                value={getValues("package_summary.price") ?? 0}
                                onValueChange={(values) => {
                                    const v = values.floatValue ?? 0;
                                    setValue("package_summary.price", v);
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
                <Grid size={12} >
                    <Grid container spacing={1}>
                        {/* วันที่เริ่มใช้งาน */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        views={['year', 'month', 'day']}
                                        label="วันที่เริ่มใช้งาน"
                                        value={startDateValue}
                                        onChange={handleStartDateChange}
                                        format="DD/MM/YYYY"
                                        slotProps={{
                                            textField: {
                                                variant: "filled",
                                                autoComplete: "off",
                                                fullWidth: true,
                                            }
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>

                        {/* วันที่สิ้นสุด */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        label="วันที่สิ้นสุด"
                                        value={endDateValue}
                                        format="DD/MM/YYYY"
                                        onChange={handleEndDateChange}
                                        slotProps={{
                                            textField: {
                                                variant: "filled",
                                                autoComplete: "off",
                                                fullWidth: true,
                                            }
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
};

export default PackageMain;