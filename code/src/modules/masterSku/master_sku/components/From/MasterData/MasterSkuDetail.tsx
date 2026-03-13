import React from 'react';
import type { FieldErrors, UseFormClearErrors, UseFormGetValues, UseFormSetError, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { IMasterSkuData } from '../../../interface/MadterSku.interface';
import { useFetchInfo } from '../../../hook/useFetchMasterSku';
import { Box, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import DataMasterSku from './Detail/DataMasterSku';
import StorageMasterSku from './Storage/StorageMasterSku';
import StatusMasterSku from './Detail/StatusMasterSku';

export interface IMasterSkuDetailProps {
    getValues: UseFormGetValues<IMasterSkuData>
    setValue: UseFormSetValue<IMasterSkuData>;
    errors: FieldErrors<IMasterSkuData>;
    watch: UseFormWatch<IMasterSkuData>;
    setError: UseFormSetError<IMasterSkuData>
    clearErrors: UseFormClearErrors<IMasterSkuData>
    actype: string;
};

const MasterSkuDetail: React.FunctionComponent<IMasterSkuDetailProps> = ({
    getValues,
    setValue,
    errors,
    watch,
}) => {

    return (
        <>
            <DataMasterSku
                getValues={getValues}
                setValue={setValue}
                watch={watch}
                errors={errors}
            />

            <Divider
                sx={{
                    backgroundColor: 'outlineVariant',
                    height: '4px', // ความหนา
                    marginTop: 2,
                    marginBottom: 2,
                }}
            />

            <StorageMasterSku
                getValues={getValues}
                setValue={setValue}
                watch={watch}
                errors={errors}
            />

             <Divider
                sx={{
                    backgroundColor: 'outlineVariant',
                    height: '4px', // ความหนา
                    marginTop: 2,
                    marginBottom: 2,
                }}
            />

             <StatusMasterSku
                getValues={getValues}
                setValue={setValue}
                watch={watch}
                errors={errors}
            />
        </>
    )
};

export default MasterSkuDetail;