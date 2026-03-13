import React, { useMemo } from 'react';
import type { FieldErrors, UseFormClearErrors, UseFormGetValues, UseFormSetError, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { IPackageItem } from '../../../../interface/PackageServices.interface';
import { Box, Card, CardContent, Divider, Grid, IconButton, List, ListItem, ListItemText, Paper, Stack, Switch, Tooltip, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useLicenseProductFetch } from '../../../../hook/useFetchPackage';
import MobileStaffProduct from './MobileStaffProduct';

export interface IMobileStaffPageProps {
    getValues: UseFormGetValues<IPackageItem>
    setValue: UseFormSetValue<IPackageItem>;
    errors: FieldErrors<IPackageItem>;
    watch: UseFormWatch<IPackageItem>;
    setError: UseFormSetError<IPackageItem>
    clearErrors: UseFormClearErrors<IPackageItem>
    actype: string;
};

const MobileStaffPage: React.FunctionComponent<IMobileStaffPageProps> = ({
    getValues,
    watch,
    setValue,
    errors,
    actype,
    setError,
    clearErrors
}) => {
    const { product_data, loading } = useLicenseProductFetch('3')
    const [open, setOpen] = React.useState(false);
    // ดึงเฉพาะ device = "pos"
    const productDevices = watch('product_device_permissions') ?? getValues('product_device_permissions') ?? [];
    const getPosIndex = (list: any[]) => list.findIndex(d => d.product_device_id === '3' || d.product_device_name === 'mobile-staff');
    const posIndex = getPosIndex(productDevices);
    const posDevice = posIndex >= 0 ? productDevices[posIndex] : undefined;

    // ✅ เปิด/ปิด POS + สร้าง entry ถ้ายังไม่มี
    const togglePOS = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const list = Array.isArray(productDevices) ? [...productDevices] : [];

        if (posIndex >= 0) {
            list[posIndex] = { ...list[posIndex], is_selected: checked };
        } else if (checked) {
            // สร้าง minimal object เมื่อเปิดครั้งแรก
            list.push({
                product_device_id: '3',
                product_device_name: 'mobile-staff',
                is_selected: true,
                pages: [],
                functions: [],
            });
        } else {
            // ปิด แต่ไม่มีอยู่แล้ว -> ไม่ต้องทำอะไร
        }

        setValue('product_device_permissions', list, { shouldDirty: true, shouldTouch: true });
    };

    const handleOpenPosDetail = () => {
        // console.log('open POS detail', posDevice);
        // console.log('open POS detail', productDevices);
        setOpen(true)
    };

    // เตรียมข้อมูลกลุ่มหน้าหลัก (main pages) และรายการย่อย
    const groups = useMemo(() => {
        if (!posDevice) return [];

        const pages = posDevice.pages ?? [];
        const mains = pages.filter((p: any) => !p.main_page_id); // main_page_id == "" => กลุ่ม
        const byMain: Record<string, any[]> = {};
        pages.forEach((p: any) => {
            if (p.main_page_id) {
                byMain[p.main_page_id] = byMain[p.main_page_id] ?? [];
                byMain[p.main_page_id].push(p);
            }
        });

        // โครงสร้าง [{ main, children }]
        return mains.map((m: any) => ({
            main: m,
            children: (byMain[m.page_id] ?? []).sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0)),
        }));
    }, [posDevice]);

    // แบ่งกลุ่มเป็น 2 คอลัมน์ให้ใกล้เคียงรูป
    const [leftCol, rightCol] = useMemo(() => {
        const half = Math.ceil(groups.length / 2);
        return [groups.slice(0, half), groups.slice(half)];
    }, [groups]);

    return (
        <>
            <MobileStaffProduct
                open={open}
                setOpen={setOpen}
                product_data={product_data}
                getValues={getValues}
                setValue={setValue}
                errors={errors}
                watch={watch}
                setError={setError}
                clearErrors={clearErrors}
                actype={actype}
            />
            <Card variant="outlined" sx={{ overflow: 'hidden' }}>
                <CardContent sx={{ pt: 2, pb: 0 }}>
                    {/* Header */}
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="h6">{"Mobile Staff"}</Typography>
                            <Tooltip title="สิทธิ์การใช้งานของอุปกรณ์ Mobile Staff">
                                <IconButton size="small">
                                    <InfoOutlinedIcon sx={{ fontSize: 18 }} />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        <Switch
                            checked={Boolean(posDevice?.is_selected)}
                            onChange={togglePOS}
                            color="warning"
                        />
                    </Stack>

                    <Box sx={{ px: 1, mt: 1, mb: 1 }}>
                        <Typography fontSize={18} fontWeight={500}>
                            {'เงื่อนไขปรับระดับ'}
                        </Typography>
                    </Box>

                    <Divider />

                    {/* Body: 2 Columns + floating arrow */}
                    <Box sx={{ px: 1.5, py: 2, position: 'relative', minHeight: 56 }}>
                        {/** เช็คว่ามีข้อมูลจริงไหม */}
                        {(() => {

                            const hasData =
                                groups.length > 0 &&
                                groups.some(g => (g.children?.length ?? 0) > 0);

                            if (!hasData) {
                                // ====== กรณีไม่มีข้อมูล ======
                                return (
                                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                                        <Typography variant="body2" sx={{ color: 'text.disabled' }}>-</Typography>

                                        {/* ลูกศรอยู่ขวาสุดแบบ "วางปกติ" (ไม่ absolute) */}
                                        {Boolean(posDevice?.is_selected) && (
                                            <Tooltip title="ตั้งค่ารายละเอียด POS">
                                                <IconButton
                                                    size="small"
                                                    onClick={handleOpenPosDetail}
                                                    sx={{
                                                        bgcolor: (t) => t.palette.background.paper,
                                                        boxShadow: 1,
                                                        border: (t) => `1px solid ${t.palette.divider}`,
                                                    }}
                                                >
                                                    <ArrowForwardIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </Stack>
                                );
                            }

                            // ====== กรณีมีข้อมูล ======
                            return (
                                <>
                                    <Grid container spacing={4}>
                                        {[leftCol, rightCol].map((col, ci) => (
                                            <Grid size={{ xs: 12, md: 6 }} key={ci}>
                                                {col.map(({ main, children }) => (
                                                    <Box key={main.page_id} sx={{ mb: 2 }}>
                                                        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 0.5 }}>
                                                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                                                {main.page_name}
                                                            </Typography>
                                                        </Stack>

                                                        <List dense disablePadding sx={{ pl: 0.5 }}>
                                                            {children?.map((p: any) => (
                                                                <Box key={p.page_id}>
                                                                    <ListItem disableGutters dense sx={{ py: 0.2 }}>
                                                                        {/*   {`-${p.page_name}`} */}
                                                                        <ListItemText
                                                                            disableTypography
                                                                            primary={
                                                                                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                                                                    {`- ${p.page_name}`}
                                                                                </Typography>
                                                                            }
                                                                        />
                                                                    </ListItem>
                                                                    {(p.functions ?? []).map((fn: any) => (
                                                                        <ListItem key={fn.function_id} disableGutters dense sx={{ py: 0.1, pl: 2 }}>
                                                                            <ListItemText
                                                                                disableTypography
                                                                                primary={
                                                                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                                                                        • {fn.function_name}
                                                                                    </Typography>
                                                                                }
                                                                            />
                                                                        </ListItem>
                                                                    ))}
                                                                </Box>
                                                            ))}
                                                        </List>
                                                    </Box>
                                                ))}
                                            </Grid>
                                        ))}
                                    </Grid>

                                    {/* ลูกศรลอยชิดขวา "ไม่ทับเส้น" (ยึดจากขอบบนของ body) */}
                                    {Boolean(posDevice?.is_selected) && (
                                        <Tooltip title="ตั้งค่ารายละเอียด POS">
                                            <IconButton
                                                size="small"
                                                onClick={handleOpenPosDetail}
                                                sx={{
                                                    position: 'absolute',
                                                    right: 8,
                                                    top: 12, // <— วางต่ำกว่า Divider ลงมา ไม่ทับเส้น
                                                    bgcolor: (t) => t.palette.background.paper,
                                                    boxShadow: 1,
                                                    border: (t) => `1px solid ${t.palette.divider}`,
                                                    zIndex: 2,
                                                }}
                                            >
                                                <ArrowForwardIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </>
                            );
                        })()}
                    </Box>
                </CardContent>
            </Card>
        </>
    );
};

export default MobileStaffPage;