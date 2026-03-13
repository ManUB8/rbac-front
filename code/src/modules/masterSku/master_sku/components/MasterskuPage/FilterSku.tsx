import { Grid } from '@mui/material';
import React from 'react';
import SearchOrder from '../../../../../shared/components/search/SearchOrder';
import type { IuseMasterFunctionSkuFetch } from '../../hook/useFetchMasterSku';

export interface IFilterSkuProps {
    masterController: IuseMasterFunctionSkuFetch
};

const FilterSku: React.FunctionComponent<IFilterSkuProps> = ({
    masterController
}) => {

    return (
        <>
            <Grid container marginTop={2} spacing={1} >
                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                    <SearchOrder searchValue={masterController.searchInput} handleChangeSearch={(e: any) => {
                        const sear = e.target.value;
                        console.log('SearchOrder', sear)
                        masterController.handleChangeSearch(sear);
                    }} />
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Grid container spacing={1} alignItems="center">
                        {masterController.FILTERS.map((f) => (
                            <Grid key={f.key} size={{ xs: 12, sm: 6, md: 4 }}>
                                {masterController.renderBox(f)}
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
};

export default FilterSku;