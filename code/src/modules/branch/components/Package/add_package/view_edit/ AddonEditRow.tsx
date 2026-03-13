import React from 'react';
import { Autocomplete, Box, Button, Grid, Stack, TextField, Typography, useTheme } from '@mui/material';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import type { FieldErrors } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from 'dayjs';
import type { IPackageItemMain } from '../../../../../product&services/package_services/interface/PackageServices.interface';
import type { IBranchItem } from '../../../../interface/Branch.interface';

export type ServiceOpt = { code: string; name: string };

export interface IAddonEditRowProps {
    index: number;
    addon: any;
    loadingAdd: boolean;
    availablePackages: IPackageItemMain[];
    selectedPkg: IPackageItemMain | null;
    serviceOptions: ServiceOpt[];
    currentService: ServiceOpt | null;
    addonStartValue: Dayjs | null;
    addonEndValue: Dayjs | null;
    mainStartDay: Dayjs | null;
    mainEndDay: Dayjs | null;
    errors: FieldErrors<IBranchItem>;
    onRemove: () => void;
    onSave: () => void;
    onChangePackage: (pkg: IPackageItemMain | null) => void;
    onChangeService: (opt: ServiceOpt | null) => void;
    onChangePrice: (price: number) => void;
    onChangeStart: (val: Dayjs | null) => void;
    onChangeEnd: (val: Dayjs | null) => void;
};

const AddonEditRow: React.FunctionComponent<IAddonEditRowProps> = ({
    index,
    addon,
    loadingAdd,
    availablePackages,
    selectedPkg,
    serviceOptions,
    currentService,
    addonStartValue,
    addonEndValue,
    mainStartDay,
    mainEndDay,
    errors,
    onRemove,
    onSave,
    onChangePackage,
    onChangeService,
    onChangePrice,
    onChangeStart,
    onChangeEnd,
}) => {
    const theme = useTheme();
    return (
        <>
            <Grid size={12} sx={{ mt: 2 }}>
                <Box sx={{ mb: 1 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="subtitle1">{`แพ็กเกจเสริม ${index + 1}`}</Typography>

                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    backgroundColor: theme.palette.surfaceContainerLowest,
                                    color: theme.palette.errorTones[60],
                                    transition: 'all 200ms ease',
                                    '&:hover': {
                                        borderRadius: '8px',
                                        backgroundColor: 'rgba(73, 69, 79, 0.08)',
                                        boxShadow: 'none',
                                    },
                                }}
                                onClick={onRemove}
                            >
                                {'ยกเลิกแพ็กเกจ'}
                            </Button>

                            <Button
                                variant="contained"
                                color="info"
                                size="large"
                                startIcon={<ModeEditOutlinedIcon fontSize="small" />}
                                onClick={onSave}
                            >
                                {'บันทึก'}
                            </Button>
                        </Box>
                    </Stack>
                </Box>

                <Stack direction="row" spacing={1}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Autocomplete
                            fullWidth
                            loading={loadingAdd}
                            options={availablePackages}
                            value={selectedPkg}
                            getOptionLabel={(o) => o.package_name}
                            isOptionEqualToValue={(o, v) => o.package_id === v.package_id}
                            onChange={(_, v) => onChangePackage(v)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="แพ็กเกจเสริม"
                                    variant="filled"
                                    autoComplete="off"
                                    error={!!(errors as any)?.package_summary?.add_pk}
                                    helperText={(errors as any)?.package_summary?.add_pk?.message || ''}
                                />
                            )}
                        />
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Autocomplete
                            fullWidth
                            options={serviceOptions}
                            value={currentService}
                            getOptionLabel={(o) => o.name}
                            isOptionEqualToValue={(o, v) => o.code === v.code}
                            onChange={(_, v) => onChangeService(v)}
                            renderInput={(params) => (
                                <TextField {...params} label="การใช้บริการ" variant="filled" autoComplete="off" />
                            )}
                        />
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <NumericFormat
                            displayType="input"
                            value={addon.price ?? 0}
                            customInput={TextField}
                            thousandSeparator=","
                            allowNegative={false}
                            decimalScale={2}
                            label="ราคา"
                            variant="filled"
                            autoComplete="off"
                            fullWidth
                            onValueChange={(values) => onChangePrice(values.floatValue ?? 0)}
                        />
                    </Box>
                </Stack>
            </Grid>

            <Grid size={12} sx={{ pb: 3, borderBottom: '1px solid', borderColor: 'grey.200' }}>
                <Grid container spacing={1}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    value={addonStartValue}
                                    format="DD/MM/YYYY"
                                    label="วันที่เริ่มใช้งาน"
                                    onChange={onChangeStart}
                                    minDate={mainStartDay || undefined}
                                    maxDate={mainEndDay || undefined}
                                    slotProps={{
                                        textField: {
                                            variant: 'filled',
                                            autoComplete: 'off',
                                            fullWidth: true,
                                        },
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    value={addonEndValue}
                                    format="DD/MM/YYYY"
                                    label="วันที่สิ้นสุด"
                                    onChange={onChangeEnd}
                                    minDate={mainStartDay || undefined}
                                    maxDate={mainEndDay || undefined}
                                    slotProps={{
                                        textField: {
                                            variant: 'filled',
                                            autoComplete: 'off',
                                            fullWidth: true,
                                        },
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default AddonEditRow;