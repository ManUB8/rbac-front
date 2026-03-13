import React from 'react';
import type { FieldErrors, UseFormClearErrors, UseFormGetValues, UseFormSetError, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { IEnumPackageType, IPackageItem } from '../../../interface/PackageServices.interface';
import { Box, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, Radio, RadioGroup, TextField, Tooltip, Typography } from '@mui/material';
import { useFetchEnumPackage } from '../../../hook/useFetchPackage';
import { NumericFormat } from 'react-number-format';
import { BILLING_TYPE_LABELS, labelByCode } from '../../../constants/package_option';
export interface IPackagePaymentProps {
    getValues: UseFormGetValues<IPackageItem>
    setValue: UseFormSetValue<IPackageItem>;
    errors: FieldErrors<IPackageItem>;
    watch: UseFormWatch<IPackageItem>;
    setError: UseFormSetError<IPackageItem>
    clearErrors: UseFormClearErrors<IPackageItem>
    actype: string;
};

const PackagePayment: React.FunctionComponent<IPackagePaymentProps> = ({
    getValues,
    watch,
    setValue,
    errors,
    actype,
    setError,
    clearErrors
}) => {
    const { billing_type } = useFetchEnumPackage()
    const selectedBillingCode = String(getValues('billing')?.[0]?.code ?? '');

    // const handleToggle = (key: 'price_daily' | 'price_monthly' | 'price_yearly') => {
    //     const current = getValues(key);
    //     setValue(`${key}.is_selected`, !current.is_selected);
    // };

    const priceError =
        errors?.price_daily?.is_selected?.message ||
        errors?.price_monthly?.is_selected?.message ||
        errors?.price_yearly?.is_selected?.message;


    const handleToggle = (key: 'price_daily' | 'price_monthly' | 'price_yearly') => {
        const current = watch(`${key}.is_selected`);
        setValue(`${key}.is_selected`, !current);
    };

    const handlePriceChange = (key: 'price_daily' | 'price_monthly' | 'price_yearly', val: number) => {
        setValue(`${key}.price`, val);
    };

    return (
        <>
            <Grid container spacing={2} marginTop={2}>
                <Grid size={12}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 0.5 }}>
                        <Typography fontSize={18} fontWeight={500} sx={{ display: "flex", alignItems: "center" }}>
                            {" ข้อมูลการชำระเงิน  "}
                            <Typography component="span" color="error">
                                {"*"}
                            </Typography>
                        </Typography>
                    </Box>

                </Grid>
                <Grid size={12}>
                    <Typography fontSize={18} fontWeight={500} sx={{ mb: 1 }}>
                        {'รายละเอียดการเรียกเก็บเงิน'}
                    </Typography>
                    <FormControl
                        error={!!errors?.billing}
                        component="fieldset"
                        id='billing'
                    >
                        <RadioGroup
                            row
                            name="billing-type-group"
                            value={selectedBillingCode}
                            onChange={(_, v) => {
                                const found = billing_type.find(x => String(x.code) === v);
                                setValue(
                                    'billing',
                                    found ? [{ code: Number(found.code), name: found.name }] : [],
                                    { shouldDirty: true, shouldValidate: true }
                                );
                            }}
                        >
                            {billing_type.map((opt) => {
                                const label = labelByCode(BILLING_TYPE_LABELS, opt?.code, opt?.name ?? '-');
                                return (
                                    <FormControlLabel
                                        key={String(opt.code)}
                                        value={String(opt.code)}
                                        control={<Radio />}
                                        label={<Typography variant="body1">{label}</Typography>}
                                    />
                                );
                            })}
                        </RadioGroup>
                        <FormHelperText>
                            {errors?.billing?.message ?? ' '}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid size={12}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 0.5 }}>
                        <Typography fontSize={18} fontWeight={500} sx={{ display: "flex", alignItems: "center" }}>
                            {" ประเภทแพ็คเกจ  "}
                            <Typography component="span" color="error">
                                {"*"}
                            </Typography>
                        </Typography>
                    </Box>
                    <FormControl component="fieldset" sx={{ width: '100%' }} id='price_daily'>
                        <FormGroup>
                            {/* ✅ ราคา 1 วัน */}
                            <Box sx={{ mb: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={watch('price_daily.is_selected') ?? false}
                                            onChange={() => handleToggle('price_daily')}
                                        />
                                    }
                                    label="ราคา 1 วัน"
                                />
                                {watch('price_daily.is_selected') && (
                                    <Grid container spacing={1} sx={{ pl: 4, mt: 1 }}>
                                        <Grid size={{ xs: 12, sm: 6, md: 4 }} >
                                            <NumericFormat
                                                customInput={TextField}
                                                fullWidth
                                                thousandSeparator
                                                variant="filled"
                                                autoComplete="off"
                                                value={watch('price_daily.price') ?? 0}
                                                onValueChange={val =>
                                                    handlePriceChange('price_daily', Number(val.value))
                                                }
                                                label="ราคา"
                                                suffix=" บาท"
                                            />
                                        </Grid>
                                    </Grid>
                                )}
                            </Box>

                            {/* ✅ ราคา 1 เดือน */}
                            <Box sx={{ mb: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={watch('price_monthly.is_selected') ?? false}
                                            onChange={() => handleToggle('price_monthly')}
                                        />
                                    }
                                    label="ราคา 1 เดือน (30 วัน)"
                                />
                                {watch('price_monthly.is_selected') && (
                                    <Grid container spacing={1} sx={{ pl: 4, mt: 1 }}>
                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                            <NumericFormat
                                                customInput={TextField}
                                                fullWidth
                                                thousandSeparator
                                                variant="filled"
                                                autoComplete="off"
                                                value={watch('price_monthly.price') ?? 0}
                                                onValueChange={val =>
                                                    handlePriceChange('price_monthly', Number(val.value))
                                                }
                                                label="ราคา"
                                                suffix=" บาท"
                                            />
                                        </Grid>
                                    </Grid>
                                )}
                            </Box>

                            {/* ✅ ราคา 1 ปี */}
                            <Box sx={{ mb: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={watch('price_yearly.is_selected') ?? false}
                                            onChange={() => handleToggle('price_yearly')}
                                        />
                                    }
                                    label="ราคา 1 ปี (365 วัน)"
                                />
                                {watch('price_yearly.is_selected') && (
                                    <Grid container spacing={1} sx={{ pl: 4, mt: 1 }}>
                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                            <NumericFormat
                                                customInput={TextField}
                                                fullWidth
                                                variant="filled"
                                                autoComplete="off"
                                                thousandSeparator
                                                value={watch('price_yearly.price') ?? 0}
                                                onValueChange={val =>
                                                    handlePriceChange('price_yearly', Number(val.value))
                                                }
                                                label="ราคา"
                                                suffix=" บาท"
                                            />
                                        </Grid>
                                    </Grid>
                                )}
                            </Box>
                        </FormGroup>
                        <FormHelperText error sx={{ mt: -0.5 }}>
                            {priceError}
                        </FormHelperText>
                    </FormControl>
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

export default PackagePayment;