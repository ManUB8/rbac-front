import { Autocomplete, Box, Divider, FormControl, Grid, IconButton, InputAdornment, MenuItem, Select, TextField, Tooltip, Typography, type OutlinedInputProps } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useFetchEnumPackage } from '../../../hook/useFetchPackage';
import type { FieldErrors, UseFormClearErrors, UseFormGetValues, UseFormSetError, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { IPackageItem } from '../../../interface/PackageServices.interface';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PackageImg from '../../../../../../assets/image/contack.png'
import { labelByCode, PACKAGE_TIER_LABELS } from '../../../constants/package_option';
import PhotoPackage from '../Photo/PhotoPackage';
export interface IPackageDataProps {
    getValues: UseFormGetValues<IPackageItem>
    setValue: UseFormSetValue<IPackageItem>;
    errors: FieldErrors<IPackageItem>;
    watch: UseFormWatch<IPackageItem>;
    setError: UseFormSetError<IPackageItem>
    clearErrors: UseFormClearErrors<IPackageItem>
    actype: string;
};

const PackageData: React.FunctionComponent<IPackageDataProps> = ({
    getValues,
    watch,
    setValue,
    errors,
    actype,
    setError,
    clearErrors
}) => {
    const { package_tier } = useFetchEnumPackage()
    return (
        <>
            <Grid container spacing={2} marginTop={2}>
                <Grid size={12} >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 0.5 }}>
                        <Typography fontSize={18} fontWeight={500} sx={{ display: "flex", alignItems: "center" }}>
                            {" ข้อมูลแพ็กเกจ "}
                        </Typography>
                        <Tooltip title="ระบุประเภทของแพ็คเกจที่ต้องการ" arrow>
                            <InfoOutlinedIcon
                                fontSize="small"
                                sx={{ color: "text.secondary", cursor: "pointer" }}
                            />
                        </Tooltip>
                    </Box>
                </Grid>
                <Grid size={12}>
                    <TextField
                        fullWidth
                        label="ชื่อ"
                        variant="filled"
                        autoComplete="off"
                        value={getValues('package_name')}
                        onChange={(e) => setValue('package_name', e.target.value)}
                        error={!!errors?.package_name}
                        helperText={errors?.package_name?.message || ''}
                        id='package_name'
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                        fullWidth
                        variant="filled"
                        autoComplete="off"
                        label="รหัส"
                        value={getValues('package_code')}
                        onChange={(e) => setValue('package_code', e.target.value)}
                        error={!!errors?.package_code}
                        helperText={errors?.package_code?.message || ''}
                        id='package_code'
                    />
                </Grid>
                <Grid size={12}>
                    <Autocomplete
                        options={package_tier}
                        value={
                            package_tier.find(opt => opt.code === getValues('package_tier.code')) ||
                            package_tier.find(opt => opt.name === getValues('package_tier.name')) ||
                            null
                        }
                        onChange={(_, v) => {
                            setValue('package_tier.code', Number(v?.code) ?? '');
                            setValue('package_tier.name', v?.name ?? '');
                        }}

                        getOptionLabel={(o) =>
                            labelByCode(PACKAGE_TIER_LABELS, o?.code, o?.name ?? '-')
                        }
                        isOptionEqualToValue={(o, v) => o.code === v.code}
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    label="เลือกแพ็คเกจ"
                                    variant="filled"
                                    autoComplete="off"
                                    error={!!errors?.package_tier?.code}
                                    helperText={errors?.package_tier?.code?.message || ''}
                                    id='package_tier.code'
                                    inputProps={{
                                        ...params.inputProps,
                                        name: "package_tier.code",
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': { paddingTop: '28px' },
                                    }}
                                />
                            );
                        }}
                    />
                </Grid>
                <Grid size={12} display="flex" justifyContent="center" mt={2}>
                    <PhotoPackage
                        getValues={getValues}
                        setValue={setValue}
                        watch={watch}
                        errors={errors}
                        actype={actype}
                        setError={setError}
                        clearErrors={clearErrors}
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

export default PackageData;