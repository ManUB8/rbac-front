import { Autocomplete, Box, Divider, FormControl, FormControlLabel, FormHelperText, Grid, MenuItem, Select, Switch, TextField, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import type { FieldErrors, UseFormClearErrors, UseFormGetValues, UseFormSetError, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { IPackageItem } from '../../../interface/PackageServices.interface';
import { useFetchEnumPackage } from '../../../hook/useFetchPackage';
import { labelByCode, PACKAGE_TYPE_LABELS } from '../../../constants/package_option';
export interface IPackageDetailProps {
    getValues: UseFormGetValues<IPackageItem>
    setValue: UseFormSetValue<IPackageItem>;
    errors: FieldErrors<IPackageItem>;
    watch: UseFormWatch<IPackageItem>;
    setError: UseFormSetError<IPackageItem>
    clearErrors: UseFormClearErrors<IPackageItem>
    actype: string;
};

const PackageDetail: React.FunctionComponent<IPackageDetailProps> = ({
    getValues,
    watch,
    setValue,
    errors,
    actype,
    setError,
    clearErrors
}) => {
    const { package_type, loading_enum_package } = useFetchEnumPackage()
    return (
        <>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 0.5 }}>
                        <Typography fontSize={18} fontWeight={500} sx={{ display: "flex", alignItems: "center" }}>
                            {" ประเภทแพ็คเกจ "}
                            <Typography component="span" color="error">
                                {" * "}
                            </Typography>
                        </Typography>
                        <Tooltip title="ระบุประเภทของแพ็คเกจที่ต้องการ" arrow>
                            <InfoOutlinedIcon
                                fontSize="small"
                                sx={{ color: "text.secondary", cursor: "pointer" }}
                            />
                        </Tooltip>
                    </Box>
                    <Autocomplete
                        fullWidth
                        options={package_type}
                        value={
                            package_type.find(
                                (opt) =>
                                    String(opt.code) === String(getValues('package_type.code')) ||
                                    opt.name === getValues('package_type.name')
                            ) || null
                        }
                        getOptionLabel={(o) =>
                            labelByCode(PACKAGE_TYPE_LABELS, o?.code, o?.name ?? '-')
                        }
                        isOptionEqualToValue={(o, v) => String(o.code) === String(v.code)}
                        onChange={(_, v) => {
                            setValue('package_type.code', v ? Number(v.code) : '');
                            // setValue('package_type.code', v ? v.code : '');
                            setValue('package_type.name', v?.name ?? '');
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="filled"
                                autoComplete="off"
                                label="ประเภทแพ็คเกจ"
                                id='package_type.code'
                                error={!!errors?.package_type?.code}
                                helperText={errors?.package_type?.code?.message || ''}
                                inputProps={{
                                    ...params.inputProps,
                                    name: "package_type.code",
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid size={12}>
                    <Typography fontSize={18} fontWeight={500} sx={{ mb: 1 }}>
                        {"สถานะ"}
                    </Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={getValues('is_active')}
                                onChange={(e) => setValue('is_active', e.target.checked)}
                            />
                        }
                        // ทำ label เป็นกล่อง: บรรทัดหัวเรื่อง + บรรทัดคำอธิบาย
                        label={
                            <Box>
                                <Typography fontSize={18} fontWeight={500}>
                                    {"เปิดการใช้งาน / ปิดการใช้งาน"}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                    sx={{ mt: 0.5, lineHeight: 1.6 }}
                                >
                                    <strong>สถานะ</strong> หากเปิดใช้งาน ระบบจะจัดการรวมข้อมูลแพ็คเกจค่าบริการ
                                    <strong> เปิดการใช้งาน / ปิดการใช้งาน </strong>
                                    เพื่อแสดงผลในหน้ารวมข้อมูล
                                </Typography>
                            </Box>
                        }
                        sx={{
                            alignItems: 'flex-start',   // ให้ label ชิดบนเท่าหัวเรื่อง
                            gap: 2,                     // ระยะห่างระหว่างสวิตช์กับข้อความ (≈16px)
                            m: 0,                       // ไม่ให้มี margin เกิน
                            '& .MuiFormControlLabel-label': { m: 0 },
                        }}
                    />
                </Grid>
                <Grid size={12}>
                    <Divider
                        sx={{
                            backgroundColor: 'grey.100',
                            height: '4px', // ความหนา
                        }}
                    />
                </Grid>
            </Grid>

        </>
    )
};

export default PackageDetail;