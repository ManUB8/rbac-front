import React from 'react';
import PackageDetail from './PackageDetail';
import PackageData from './PackageData';
import type { FieldErrors, UseFormClearErrors, UseFormGetValues, UseFormSetError, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { IPackageItem } from '../../../interface/PackageServices.interface';
import PackagePayment from './PackagePayment';
import RelatedPackages from './RelatedPackages';

export interface IPackagePageProps {
    getValues: UseFormGetValues<IPackageItem>
    setValue: UseFormSetValue<IPackageItem>;
    errors: FieldErrors<IPackageItem>;
    watch: UseFormWatch<IPackageItem>;
    setError: UseFormSetError<IPackageItem>
    clearErrors: UseFormClearErrors<IPackageItem>
    actype: string;
};

const PackagePage: React.FunctionComponent<IPackagePageProps> = ({
    getValues,
    watch,
    setValue,
    errors,
    actype,
    setError,
    clearErrors
}) => {
    const isEmptyPackageType = (pkg?: { code?: unknown; name?: unknown }) =>
        (String(pkg?.code ?? "") === "") && (String(pkg?.name ?? "") === "");

    const isMainPackageType = (pkg?: { code?: unknown; name?: unknown }) =>
        String(pkg?.code) === "1" && String(pkg?.name).toUpperCase() === "MAIN";
    const pt = getValues("package_type");
    const showRelated = !isEmptyPackageType(pt) && !isMainPackageType(pt);
    return (
        <>
            <PackageDetail
                getValues={getValues}
                setValue={setValue}
                watch={watch}
                errors={errors}
                actype={actype}
                setError={setError}
                clearErrors={clearErrors}
            />
            <PackageData
                getValues={getValues}
                setValue={setValue}
                watch={watch}
                errors={errors}
                actype={actype}
                setError={setError}
                clearErrors={clearErrors}
            />
            <PackagePayment
                getValues={getValues}
                setValue={setValue}
                watch={watch}
                errors={errors}
                actype={actype}
                setError={setError}
                clearErrors={clearErrors}
            />

            {showRelated && (
                <RelatedPackages
                    getValues={getValues}
                    setValue={setValue}
                    watch={watch}
                    errors={errors}
                    actype={actype}
                    setError={setError}
                    clearErrors={clearErrors}
                />
            )}
        </>
    )
};

export default PackagePage;