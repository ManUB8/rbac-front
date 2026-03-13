import React from 'react';
import type { FieldErrors, UseFormGetValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { IBranchItem } from '../../interface/Branch.interface';
import { useAtom } from 'jotai';
import { searchStatePackageMain } from '../../../product&services/package_services/hook/AtomPackageServices';
import { usePkgMainWithCache } from '../../../product&services/package_services/hook/useFetchPackage';
import { Divider, Grid } from '@mui/material';
import PackageMainView from '../Package/main_package/PackageMainView';
import PackageAddView from '../Package/add_package/PackageAddView';


export interface IPackageBranchViewProps {
    getValues: UseFormGetValues<IBranchItem>
    setValue: UseFormSetValue<IBranchItem>;
    errors: FieldErrors<IBranchItem>;
    watch: UseFormWatch<IBranchItem>;
    actype: string;
};

const PackageBranchView: React.FunctionComponent<IPackageBranchViewProps> = ({
    getValues,
    setValue,
    errors,
    watch,
    actype
}) => {
    return (
        <>
            <Grid container >
                <Grid size={12}>
                    <PackageMainView
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
                            backgroundColor: 'outlineVariant',
                            height: '2px', // ความหนา
                        }}
                    />
                </Grid>
                <Grid size={12}>
                    <PackageAddView
                        getValues={getValues}
                        setValue={setValue}
                        watch={watch}
                        errors={errors}
                        actype={actype}
                    />
                </Grid>
            </Grid>
        </>
    )
};

export default PackageBranchView;