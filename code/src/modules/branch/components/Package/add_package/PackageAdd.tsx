import React, { useEffect } from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Grid,
    InputAdornment,
    Stack,
    TextField,
    Typography,
    useTheme,
    type OutlinedInputProps,
} from '@mui/material';
import { NumericFormat } from 'react-number-format';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { usePackageCompatibleMain } from '../../../../product&services/package_services/hook/useFetchPackage';
import type {
    FieldErrors,
    UseFormGetValues,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';
import type { IBranchItem } from '../../../interface/Branch.interface';
import { SERVICE_TYPE_LABELS } from '../../constants/package_option';
import type { IPackageItemMain } from '../../../../product&services/package_services/interface/PackageServices.interface';

export interface IPackageAddProps {
    getValues: UseFormGetValues<IBranchItem>;
    setValue: UseFormSetValue<IBranchItem>;
    errors: FieldErrors<IBranchItem>;
    watch: UseFormWatch<IBranchItem>;
    actype: string;
    mainPackageId: string; // package_id ของแพ็กหลัก
}

const PackageAdd: React.FunctionComponent<IPackageAddProps> = ({
    getValues,
    setValue,
    errors,
    watch,
    actype,
    mainPackageId,
}) => {
    const theme = useTheme();
    const { package_add, loading_add } = usePackageCompatibleMain(mainPackageId);

    // debug
    useEffect(() => {
        console.log('[PackageAdd] mainPackageId =', mainPackageId);
        console.log('[PackageAdd] compatible packages =', package_add);
    }, [mainPackageId, package_add]);

    // ==== helper ====
    const getItems = () => getValues('package_request.items') || [];
    const setItems = (items: any[]) => setValue('package_request.items', items);

    const findPkg = (id?: string) =>
        package_add.find((p) => p.package_id === id);

    // summary date (ของแพ็กหลัก ใช้เป็นฐานคำนวณวันของเสริม)
    const startDateStr = watch('package_summary.start_date');
    const endDateStr = watch('package_summary.end_date');

    // ====== กดปุ่มเพิ่มแพ็กเกจเสริม ======
    const handleAddAddon = () => {
        const items = getItems();
        const mainItem = items[0];

        if (!mainItem || !mainItem.package_id) {
            console.warn('ต้องมีแพ็กหลักก่อนถึงจะเพิ่มแพ็กเสริมได้');
            return;
        }

        const addonItems = items.slice(1);
        if (addonItems.length >= package_add.length) {
            console.warn('เพิ่มแพ็กเกจเสริมครบจำนวนที่มีแล้ว');
            return;
        }

        const newAddon = {
            package_id: '',
            start_at: mainItem.start_at ?? 0,
            end_at: mainItem.end_at ?? 0,
            price: 0,
            compatible_main_package_id: mainItem.package_id,
            periodicity: {
                daily: false,
                monthly: false,
                yearly: false,
            },
        };

        setItems([...items, newAddon]);

        const currentAddPk = (getValues('package_summary.add_pk') as { name: string }[]) || [];
        const nextAddPk = [...currentAddPk, { name: '' }];
        setValue('package_summary.add_pk', nextAddPk);
        setValue('package_summary.add_pk_Count', nextAddPk.length);
    };

    // ====== ลบแพ็กเกจเสริมตัวหนึ่ง ======
    const handleRemoveAddon = (itemIndex: number) => {
        const items = getItems();
        const mainItem = items[0];

        const newItems = items.filter((_, idx) => idx !== itemIndex);
        setItems(newItems);

        // update add_pk ด้วย (index ใน add_pk = itemIndex - 1)
        const currentAddPk = (getValues('package_summary.add_pk') as { name: string }[]) || [];
        const newAddPk = currentAddPk.filter((_, idx) => idx !== itemIndex - 1);
        setValue('package_summary.add_pk', newAddPk);
        setValue('package_summary.add_pk_Count', newAddPk.length);
    };

    // ====== เปลี่ยนแพ็กเกจเสริมของ index ใด index หนึ่ง ======
    const handleChangeAddonPackage = (itemIndex: number, pkg: IPackageItemMain | null) => {
        const items = getItems();
        const mainItem = items[0];
        if (!mainItem || !mainItem.package_id) return;

        const newItems = [...items];

        if (pkg) {
            // ❗ เช็คว่าถูกใช้ใน addon ตัวอื่นแล้วหรือยัง
            const isDuplicate = newItems.some((it, idx) =>
                idx !== itemIndex && it.package_id === pkg.package_id
            );
            if (isDuplicate) {
                console.warn('แพ็กเกจเสริมนี้ถูกเลือกไปแล้ว');
                return;
            }

            newItems[itemIndex] = {
                package_id: pkg.package_id,
                start_at: mainItem.start_at ?? 0,
                end_at: mainItem.end_at ?? 0,
                price: 0,
                compatible_main_package_id: mainItem.package_id,
                periodicity: {
                    daily: false,
                    monthly: false,
                    yearly: false,
                },
            };
        } else {
            // ถ้าเคลียร์ → ลบทิ้ง
            newItems.splice(itemIndex, 1);
        }

        setItems(newItems);

        const currentAddPk = (getValues('package_summary.add_pk') as { name: string }[]) || [];
        const newAddPk = [...currentAddPk];

        const pkIndex = itemIndex - 1;
        if (pkg) {
            newAddPk[pkIndex] = { name: pkg.package_name };
        } else {
            newAddPk.splice(pkIndex, 1);
        }

        setValue('package_summary.add_pk', newAddPk);
        setValue('package_summary.add_pk_Count', newAddPk.length);
    };

    // ====== เปลี่ยนประเภทการใช้บริการของแพ็กเสริม ======
    const handleChangeServiceType = (
        itemIndex: number,
        v: { code: string; name: string } | null
    ) => {
        const items = getItems();
        const mainItem = items[0];
        const addonItem = items[itemIndex];
        if (!addonItem || !mainItem) return;

        const pkgMeta = findPkg(addonItem.package_id);
        if (!pkgMeta) return;

        // 1. ราคา
        let price = 0;
        if (v) {
            switch (v.code) {
                case "1":
                    if (pkgMeta.price_daily?.is_selected) price = pkgMeta.price_daily.price;
                    break;
                case "2":
                    if (pkgMeta.price_monthly?.is_selected)
                        price = pkgMeta.price_monthly.price;
                    break;
                case "3":
                    if (pkgMeta.price_yearly?.is_selected)
                        price = pkgMeta.price_yearly.price;
                    break;
                default:
                    price = 0;
                    break;
            }
        }

        // 2. ขอบเขตของแพ็กหลัก
        let mainStartDay: Dayjs;
        let mainEndDay: Dayjs | null = null;

        if (startDateStr) {
            mainStartDay = dayjs(startDateStr, "DD/MM/YYYY").startOf("day");
        } else if (mainItem.start_at) {
            mainStartDay = dayjs.unix(mainItem.start_at).startOf("day");
        } else {
            mainStartDay = dayjs().startOf("day");
        }

        if (endDateStr) {
            mainEndDay = dayjs(endDateStr, "DD/MM/YYYY").startOf("day");
        } else if (mainItem.end_at) {
            mainEndDay = dayjs.unix(mainItem.end_at).startOf("day");
        } else {
            mainEndDay = null;
        }

        // 3. start ของเสริม: ใช้ของตัวเอง ถ้าไม่มีใช้ mainStart
        let startDay = addonItem.start_at
            ? dayjs.unix(addonItem.start_at).startOf("day")
            : mainStartDay;

        if (startDay.isBefore(mainStartDay)) startDay = mainStartDay;
        if (mainEndDay && startDay.isAfter(mainEndDay)) startDay = mainEndDay;

        // 4. end ตาม period
        let endDay: Dayjs | null = null;
        if (v) {
            switch (v.code) {
                case "1":
                    endDay = startDay.add(1, "day");
                    break;
                case "2":
                    endDay = startDay.add(1, "month");
                    break;
                case "3":
                    endDay = startDay.add(1, "year");
                    break;
                default:
                    endDay = null;
                    break;
            }
        }

        if (endDay && mainEndDay && endDay.isAfter(mainEndDay)) {
            endDay = mainEndDay;
        }
        if (endDay && endDay.isBefore(startDay)) {
            endDay = startDay;
        }

        const newItems = [...items];
        newItems[itemIndex] = {
            ...addonItem,
            price,
            compatible_main_package_id: mainItem.package_id,
            periodicity: {
                daily: v?.code === "1",
                monthly: v?.code === "2",
                yearly: v?.code === "3",
            },
            start_at: startDay.unix(),
            end_at: endDay ? endDay.startOf("day").unix() : 0,
        };

        setItems(newItems);
    };

    // ====== คำนวณ service options สำหรับแต่ละ addon จาก meta ======
    const getServiceOptionsForAddon = (pkgMeta?: IPackageItemMain) => {
        if (!pkgMeta) {
            return SERVICE_TYPE_LABELS.filter((o) => o.code === '4');
        }
        const enabledCodes: string[] = [];
        if (pkgMeta.price_daily?.is_selected) enabledCodes.push('1');
        if (pkgMeta.price_monthly?.is_selected) enabledCodes.push('2');
        if (pkgMeta.price_yearly?.is_selected) enabledCodes.push('3');

        let opts = SERVICE_TYPE_LABELS.filter((o) => enabledCodes.includes(o.code));
        if (opts.length === 0) {
            opts = SERVICE_TYPE_LABELS.filter((o) => o.code === '4');
        }
        return opts;
    };

    // ====== เปลี่ยนวันที่เริ่มต้นของแพ็กเกจเสริม (ต่อ 1 index) ======
    const handleAddonStartDateChange = (itemIndex: number, value: Dayjs | null) => {
        const items = getItems();
        const mainItem = items[0];
        const addonItem = items[itemIndex];
        if (!addonItem || !mainItem) return;

        // ถ้าเคลียร์วัน → ล้าง start/end ของตัวเสริมตัวนั้น
        if (!value) {
            const newItems = [...items];
            newItems[itemIndex] = {
                ...addonItem,
                start_at: 0,
                end_at: 0,
            };
            setItems(newItems);
            return;
        }

        // --- ขอบเขตของแพ็กหลัก ---
        let mainStartDay: Dayjs;
        let mainEndDay: Dayjs | null = null;

        if (startDateStr) {
            mainStartDay = dayjs(startDateStr, "DD/MM/YYYY").startOf("day");
        } else if (mainItem.start_at) {
            mainStartDay = dayjs.unix(mainItem.start_at).startOf("day");
        } else {
            mainStartDay = dayjs().startOf("day");
        }

        if (endDateStr) {
            mainEndDay = dayjs(endDateStr, "DD/MM/YYYY").startOf("day");
        } else if (mainItem.end_at) {
            mainEndDay = dayjs.unix(mainItem.end_at).startOf("day");
        } else {
            mainEndDay = null;
        }

        // --- วันเริ่มที่ user เลือก แล้ว clamp เข้าในช่วงของ main ---
        let startDay = value.startOf("day");
        if (startDay.isBefore(mainStartDay)) startDay = mainStartDay;
        if (mainEndDay && startDay.isAfter(mainEndDay)) startDay = mainEndDay;

        // --- ดูว่า addon ใช้ period แบบไหนอยู่ตอนนี้ ---
        const periodicity = addonItem.periodicity || {};
        let endDay: Dayjs | null = null;

        if (periodicity.daily) {
            endDay = startDay.add(1, "day");
        } else if (periodicity.monthly) {
            endDay = startDay.add(1, "month");
        } else if (periodicity.yearly) {
            endDay = startDay.add(1, "year");
        }

        // clamp endDay ไม่ให้เกิน mainEndDay
        if (endDay && mainEndDay && endDay.isAfter(mainEndDay)) {
            endDay = mainEndDay;
        }
        if (endDay && endDay.isBefore(startDay)) {
            endDay = startDay;
        }

        const newItems = [...items];
        newItems[itemIndex] = {
            ...addonItem,
            start_at: startDay.unix(),
            end_at: endDay ? endDay.startOf("day").unix() : 0,
        };

        setItems(newItems);
    };

    const handleAddonEndDateChange = (itemIndex: number, value: Dayjs | null) => {
        const items = getItems();
        const mainItem = items[0];
        const addonItem = items[itemIndex];
        if (!addonItem || !mainItem) return;

        // ถ้าเคลียร์วัน → ล้าง end ของตัวเสริม
        if (!value) {
            const newItems = [...items];
            newItems[itemIndex] = {
                ...addonItem,
                end_at: 0,
            };
            setItems(newItems);
            return;
        }

        // --- ขอบเขตของแพ็กหลัก ---
        let mainStartDay: Dayjs;
        let mainEndDay: Dayjs | null = null;

        if (startDateStr) {
            mainStartDay = dayjs(startDateStr, "DD/MM/YYYY").startOf("day");
        } else if (mainItem.start_at) {
            mainStartDay = dayjs.unix(mainItem.start_at).startOf("day");
        } else {
            mainStartDay = dayjs().startOf("day");
        }

        if (endDateStr) {
            mainEndDay = dayjs(endDateStr, "DD/MM/YYYY").startOf("day");
        } else if (mainItem.end_at) {
            mainEndDay = dayjs.unix(mainItem.end_at).startOf("day");
        } else {
            mainEndDay = null;
        }

        // --- วันเริ่มต้นของเสริม (ใช้ของตัวเอง ถ้าไม่มีใช้ mainStartDay) ---
        let startDay = addonItem.start_at
            ? dayjs.unix(addonItem.start_at).startOf("day")
            : mainStartDay;

        // --- end ที่ user เลือก แล้ว clamp ---
        let endDay = value.startOf("day");

        // ห้ามจบก่อน startDay
        if (endDay.isBefore(startDay)) endDay = startDay;
        // ห้ามจบก่อน mainStart (กันเคสแปลก ๆ)
        if (endDay.isBefore(mainStartDay)) endDay = mainStartDay;
        // ห้ามจบเกิน mainEnd
        if (mainEndDay && endDay.isAfter(mainEndDay)) endDay = mainEndDay;

        const newItems = [...items];
        newItems[itemIndex] = {
            ...addonItem,
            start_at: startDay.unix(),                      // sync ให้ชัวร์
            end_at: endDay ? endDay.startOf("day").unix() : 0,
        };

        setItems(newItems);
    };

    const handleAddonPriceChange = (itemIndex: number, price: number) => {
        const items = getItems();
        const addonItem = items[itemIndex];
        if (!addonItem) return;

        const newItems = [...items];
        newItems[itemIndex] = {
            ...addonItem,
            price, // ✅ อัปเดตราคาแถวนี้
        };

        setItems(newItems);
    };
    // ====== render ======
    const items = getItems();
    const mainItem = items[0];
    const addonItems = items.slice(1); // index 1..n

    const maxAddonCount = package_add.length;
    const canAddMore = maxAddonCount > 0 && addonItems.length < maxAddonCount;

    return (
        <Grid container spacing={2} p={4}>
            <Grid size={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle2">{'ข้อมูลแพ็กเกจเสริม'}</Typography>
                    <Button
                        variant="contained"
                        color="info"
                        size='large'
                        startIcon={<AddOutlinedIcon fontSize="small" />}
                        onClick={handleAddAddon}
                        disabled={!canAddMore}
                    >
                        {"เพิ่มแพ็กเกจเสริม"}
                    </Button>
                </Stack>
            </Grid>

            {/* แสดง form ของแพ็กเสริมแต่ละตัว ตาม index 1..n */}
            {addonItems.map((addon, idx) => {

                const itemIndex = idx + 1; // index จริงใน items[]

                // --- ห้ามซ้ำ: รวม package_id ที่ถูกเลือกอยู่ใน addon ตัวอื่น ๆ ---
                const selectedAddonIds = addonItems
                    .map((a, innerIdx) => (innerIdx === idx ? null : a.package_id))
                    .filter((id): id is string => !!id);

                // options ที่ใช้ได้ของแถวนี้ = ทั้งหมดที่ยังไม่ถูกใช้ หรือเป็นตัวที่ตัวเองเลือกอยู่
                const availablePackages = package_add.filter(
                    (p) => !selectedAddonIds.includes(p.package_id) || p.package_id === addon.package_id
                );

                const pkgMeta = findPkg(addon.package_id);
                // ใช้ availablePackages แทน package_add
                const serviceOptions = getServiceOptionsForAddon(pkgMeta);

                // หาค่า service ปัจจุบันจาก periodicity
                const currentServiceCode = addon.periodicity?.daily
                    ? '1'
                    : addon.periodicity?.monthly
                        ? '2'
                        : addon.periodicity?.yearly
                            ? '3'
                            : undefined;
                const currentService =
                    serviceOptions.find((opt) => opt.code === currentServiceCode) || null;

                const selectedPkg = pkgMeta || null;
                const addonStartValue = addon.start_at ? dayjs.unix(addon.start_at) : dayjs();
                const addonEndValue = addon.end_at ? dayjs.unix(addon.end_at) : dayjs();
                const mainStartDay =
                    startDateStr
                        ? dayjs(startDateStr, "DD/MM/YYYY").startOf("day")
                        : mainItem?.start_at
                            ? dayjs.unix(mainItem.start_at).startOf("day")
                            : dayjs();

                const mainEndDay =
                    endDateStr
                        ? dayjs(endDateStr, "DD/MM/YYYY").startOf("day")
                        : mainItem?.end_at
                            ? dayjs.unix(mainItem.end_at).startOf("day")
                            : dayjs();
                return (
                    <>
                        <Grid size={12} key={itemIndex} sx={{ mt: 2 }}>
                            <Box sx={{ mb: 1 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography variant="subtitle1">{`แพ็กเกจเสริม ${itemIndex}`}</Typography>
                                    <Button
                                        variant="contained"
                                        size='large'
                                        sx={{
                                            backgroundColor: theme.palette.surfaceContainerLowest,   // สีพื้นหลังที่ต้องการ
                                            color: theme.palette.errorTones[60],
                                            transition: 'all 200ms ease',
                                            '&:hover': {
                                                borderRadius: '8px',
                                                backgroundColor: 'rgba(73, 69, 79, 0.08)',
                                                boxShadow: "none",
                                            }
                                        }}
                                        onClick={() => handleRemoveAddon(itemIndex)}
                                    >
                                        {"ยกเลิกแพ็กเกจ"}
                                    </Button>
                                </Stack>
                            </Box>

                            <Stack direction="row" spacing={1}>
                                {/* เลือกแพ็กเกจเสริม */}
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Autocomplete
                                        fullWidth
                                        loading={loading_add}
                                        options={availablePackages}
                                        value={selectedPkg}
                                        getOptionLabel={(o) => o.package_name}
                                        isOptionEqualToValue={(o, v) => o.package_id === v.package_id}
                                        onChange={(_, v) => handleChangeAddonPackage(itemIndex, v)}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    label="แพ็กเกจเสริม"
                                                    variant="filled"
                                                    autoComplete="off"
                                                    error={!!errors?.package_summary?.add_pk}
                                                    helperText={errors?.package_summary?.add_pk?.message || ''}
                                                />
                                            );
                                        }}
                                    />
                                </Box>

                                {/* การใช้บริการของแพ็กเสริม */}
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Autocomplete
                                        fullWidth
                                        options={serviceOptions}
                                        value={currentService}
                                        getOptionLabel={(o) => o.name}
                                        isOptionEqualToValue={(o, v) => o.code === v.code}
                                        onChange={(_, v) => handleChangeServiceType(itemIndex, v)}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    label="การใช้บริการ"
                                                    variant="filled"
                                                    autoComplete="off"
                                                />
                                            );
                                        }}
                                    />
                                </Box>

                                {/* ราคาแพ็กเสริม */}
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <NumericFormat
                                        displayType="input"
                                        value={addon.price ?? 0}
                                        customInput={TextField}
                                        onValueChange={(values) =>
                                            handleAddonPriceChange(itemIndex, values.floatValue ?? 0)
                                        }
                                        thousandSeparator=","
                                        allowNegative={false}
                                        decimalScale={2}
                                        fixedDecimalScale
                                        label="ราคา"
                                        variant="filled"
                                        autoComplete="off"
                                        fullWidth
                                    />
                                </Box>
                            </Stack>
                        </Grid>
                        {/* วันที่เริ่ม / สิ้นสุด (ใช้ summary ของแพ็กหลัก + ใช้ร่วมกับเสริมทุกตัว) */}
                        <Grid size={12} >
                            <Grid container spacing={1}>
                                {/* วันที่เริ่มใช้งานของแพ็กเสริม (เลือกได้) */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={["DatePicker"]}>
                                            <DatePicker
                                                value={addonStartValue}
                                                format="DD/MM/YYYY"
                                                label="วันที่เริ่มใช้งาน"
                                                onChange={(val) => handleAddonStartDateChange(itemIndex, val)}
                                                minDate={mainStartDay || undefined}
                                                maxDate={mainEndDay || undefined}
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

                                {/* วันที่สิ้นสุดของแพ็กเสริม (แสดงตามที่คำนวณ) */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={["DatePicker"]}>
                                            <DatePicker
                                                value={addonEndValue}
                                                format="DD/MM/YYYY"
                                                label='วันที่สิ้นสุด'
                                                onChange={(val) => handleAddonEndDateChange(itemIndex, val)}
                                                minDate={mainStartDay || undefined}
                                                maxDate={mainEndDay || undefined}
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
                    </>
                );
            })}
        </Grid>
    );
};

export default PackageAdd;