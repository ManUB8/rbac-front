import React from 'react';
import type { FieldErrors, UseFormClearErrors, UseFormGetValues, UseFormSetError, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { IPackageItem } from '../../../interface/PackageServices.interface';
import { Grid } from '@mui/material';
import PosPage from './Pos/PosPage';
import OwnerPage from './Web-Owner/OwnerPage';
import MobileStaffPage from './Mobile-Staff/MobileStaffPage';

export interface ILicensePageProps {
    getValues: UseFormGetValues<IPackageItem>
    setValue: UseFormSetValue<IPackageItem>;
    errors: FieldErrors<IPackageItem>;
    watch: UseFormWatch<IPackageItem>;
    setError: UseFormSetError<IPackageItem>
    clearErrors: UseFormClearErrors<IPackageItem>
    actype: string;
};

const LicensePage: React.FunctionComponent<ILicensePageProps> = ({
    getValues,
    watch,
    setValue,
    errors,
    actype,
    setError,
    clearErrors
}) => {

    return (
        <>
            <Grid container spacing={1}>
                <Grid size={12}>
                    <OwnerPage
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
                    <PosPage
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
                    <MobileStaffPage
                        getValues={getValues}
                        setValue={setValue}
                        watch={watch}
                        errors={errors}
                        actype={actype}
                        setError={setError}
                        clearErrors={clearErrors}
                    />
                </Grid>

            </Grid>
        </>
    )
};

export default LicensePage;