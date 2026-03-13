import { Grid } from '@mui/material';
import React from 'react';
import SearchOrder from '../../../../../shared/components/search/SearchOrder';
import type { IuseMasterFunctionPackage } from '../../hook/useFetchMasterPackage';

export interface IFilterPackageProps {
    masterController: IuseMasterFunctionPackage
};

const FilterPackage: React.FunctionComponent<IFilterPackageProps> = ({
    masterController
}) => {
    return (
        <>
            <Grid container marginTop={2} >
                <Grid size={{ xs: 12, sm: 12, md: 8 }}>
                    <SearchOrder searchValue={masterController.searchInput}
                        handleChangeSearch={(e: any) => {
                            console.log('SearchOrder', e.target.value)
                            masterController.handleChangeSearch(e.target.value)
                        }} />
                </Grid>
            </Grid>
        </>
    )
};

export default FilterPackage;