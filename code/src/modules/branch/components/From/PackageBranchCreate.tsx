import React, { useEffect, useRef, useState } from 'react';
import type { FieldErrors, UseFormGetValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { IBranchItem } from '../../interface/Branch.interface';
import { usePackageCompatibleMain, usePkgMainWithCache } from '../../../product&services/package_services/hook/useFetchPackage';
import { Autocomplete, Box, Divider, Grid, InputAdornment, Stack, TextField, Typography, type OutlinedInputProps } from '@mui/material';
import PackageMain from '../Package/main_package/PackageMain';
import PackageAdd from '../Package/add_package/PackageAdd';


export interface IPackageBranchCreateProps {
    getValues: UseFormGetValues<IBranchItem>
    setValue: UseFormSetValue<IBranchItem>;
    errors: FieldErrors<IBranchItem>;
    watch: UseFormWatch<IBranchItem>;
    actype: string;
};

const PackageBranchCreate: React.FunctionComponent<IPackageBranchCreateProps> = ({
    getValues,
    setValue,
    errors,
    watch,
    actype
}) => {
    const mainPackageId = watch('package_request.items')?.[0]?.package_id ?? "";
    return (
        <>
            <Grid container >
                <Grid size={12}>
                    <PackageMain
                        getValues={getValues}
                        setValue={setValue}
                        watch={watch}
                        errors={errors}
                        actype={actype}
                    />
                </Grid>
                <Grid size={12}>
                    <Divider
                        sx={{
                            backgroundColor: 'var(--Schemes-Outline-Variant, #C0C8CB)',
                            height: '2px', // ความหนา
                        }}
                    />
                </Grid>
                {mainPackageId ? (
                    <Grid size={12}>
                        <PackageAdd
                            getValues={getValues}
                            setValue={setValue}
                            watch={watch}
                            errors={errors}
                            actype={actype}
                            mainPackageId={mainPackageId}
                        />
                    </Grid>
                ) : null}

            </Grid>
        </>
    )
};

export default PackageBranchCreate;