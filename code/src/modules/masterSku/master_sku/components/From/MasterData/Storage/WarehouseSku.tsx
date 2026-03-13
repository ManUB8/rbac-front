import React from 'react';
import {
    Autocomplete,
    Box,
    Grid,
    TextField,
    Typography,
    InputAdornment,
} from '@mui/material';
import type {
    FieldErrors,
    UseFormGetValues,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';
import type { IMasterSkuData, IStorageTypeItem } from '../../../../interface/MadterSku.interface';
import { useFetchInfo } from '../../../../hook/useFetchMasterSku';
import { NumericFormat } from 'react-number-format';

export interface IWarehouseSkuProps {
    getValues: UseFormGetValues<IMasterSkuData>;
    setValue: UseFormSetValue<IMasterSkuData>;
    errors: FieldErrors<IMasterSkuData>;
    watch: UseFormWatch<IMasterSkuData>;
    storage_types: IStorageTypeItem[]
};

const WarehouseSku: React.FunctionComponent<IWarehouseSkuProps> = ({
    getValues,
    setValue,
    errors,
    storage_types
}) => {

    const currentStorageTypeId = getValues('warehouse_storage_type.warehouse_storage_type_id') ?? '';

    const storageTypeValue = storage_types.find((s: any) => s.storage_type_id === currentStorageTypeId) ?? null;

    return (
        <>
            <Grid container>
                <Grid size={12}>
                    <Typography variant="h6">{"Warehouse"}</Typography>
                </Grid>

                {/* แถว: อุณหภูมิ / อายุการเก็บรักษา */}
                <Grid size={12} container spacing={2}>
                    {/* ซ้าย: อุณหภูมิการจัดเก็บ (Autocomplete) */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={(t) => ({
                                border: `1px solid ${t.palette.outlineVariant}`,
                                borderRadius: 2,
                                p: 2,
                                width: '100%',
                            })}
                        >
                            <Typography fontSize={18} fontWeight={500} sx={{ mb: 1 }}>
                                {"อุณหภูมิการจัดเก็บ"}
                            </Typography>

                            <Autocomplete
                                fullWidth
                                options={storage_types}
                                getOptionLabel={(opt: any) => opt.storage_type_name ?? ''}
                                value={storageTypeValue}
                                onChange={(_, newVal: any | null) => {
                                    setValue(
                                        'warehouse_storage_type.warehouse_storage_type_id',
                                        newVal?.storage_type_id ?? '',
                                    );
                                    setValue('warehouse_storage_type_id', newVal?.storage_type_id)
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        // variant="filled"
                                        placeholder="เลือกอุณหภูมิการจัดเก็บ *"
                                        id='warehouse_storage_type_id'
                                        error={!!errors?.warehouse_storage_type_id}
                                        helperText={errors?.warehouse_storage_type_id?.message || ''}
                                        inputProps={{
                                            ...params.inputProps,
                                            name: "warehouse_storage_type_id",
                                        }}
                                    />
                                )}
                            />
                        </Box>
                    </Grid>

                    {/* ขวา: อายุการเก็บรักษา (เต็มอายุ) + วัน */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={(t) => ({
                                border: `1px solid ${t.palette.outlineVariant}`,
                                borderRadius: 2,
                                p: 2,
                                width: '100%',
                            })}
                        >
                            <Typography fontSize={18} fontWeight={500} sx={{ mb: 1 }}>
                                {"อายุการเก็บรักษา (เต็มอายุ)"}
                            </Typography>

                            <NumericFormat
                                customInput={TextField}
                                fullWidth
                                thousandSeparator=","
                                allowNegative={false}
                                decimalScale={0}
                                value={getValues('warehouse_shelf_life') ?? ''}
                                onValueChange={(values) =>
                                    setValue('warehouse_shelf_life', values.value)
                                }
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">{"วัน"}</InputAdornment>
                                        ),
                                    }
                                }}
                                placeholder="0"
                                error={!!errors?.warehouse_shelf_life}
                                helperText={errors?.warehouse_shelf_life?.message || ''}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
};

export default WarehouseSku;