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
import type { IMasterSkuData } from '../../../../interface/MadterSku.interface';
import { useFetchInfo } from '../../../../hook/useFetchMasterSku';
import { NumericFormat } from 'react-number-format';
import WarehouseSku from './WarehouseSku';
import BranchSku from './BranchSku';

export interface IStorageMasterSkuProps {
    getValues: UseFormGetValues<IMasterSkuData>;
    setValue: UseFormSetValue<IMasterSkuData>;
    errors: FieldErrors<IMasterSkuData>;
    watch: UseFormWatch<IMasterSkuData>;
}

const StorageMasterSku: React.FunctionComponent<IStorageMasterSkuProps> = ({
    getValues,
    setValue,
    errors,
    watch
}) => {
    const { storage_types } = useFetchInfo();

    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <Typography variant="h6">{"ข้อมูลการเก็บรักษา"}</Typography>
            </Grid>
            <Grid size={12}>
                <WarehouseSku
                    getValues={getValues}
                    setValue={setValue}
                    watch={watch}
                    errors={errors}
                    storage_types={storage_types}
                />
            </Grid>
            <Grid size={12}>
                <BranchSku
                    getValues={getValues}
                    setValue={setValue}
                    watch={watch}
                    errors={errors}
                    storage_types={storage_types}
                />
            </Grid>
        </Grid>
    );
};

export default StorageMasterSku;