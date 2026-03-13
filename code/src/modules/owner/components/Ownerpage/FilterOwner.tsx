import { Button, Chip, Grid, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { NumericFormat } from 'react-number-format';
import SearchOrder from '../../../../shared/components/search/SearchOrder';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import type { IuseMasterFunctionOwner } from '../../hook/useFetchOwner';

export interface IFilterOwnerProps {
    masterController:IuseMasterFunctionOwner
};

const FilterOwner: React.FunctionComponent<IFilterOwnerProps> = ({
    masterController
}) => {
    return (
        <>
          <Grid container marginTop={2} spacing={1} >
                {/* ซ้าย: filter + ปุ่มเล็ก */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Grid container spacing={1} alignItems="center">
                        {masterController.FILTERS.map((f) => (
                            <Grid key={f.key} size={{ xs: 12, sm: 6, md: 5 }}>
                                {masterController.renderBox(f)}
                            </Grid>
                        ))}

                        {/* ปุ่ม filter อยู่แถวเดียวกันกับกล่องด้านบน */}
                        <Grid size={{ xs: 'auto' }}>
                            <Tooltip title="ตัวกรองเพิ่มเติม">
                                <Button
                                    variant="outlined"
                                    color='secondary'
                                    onClick={() => masterController.setOpenFilter(true)}
                                    sx={{
                                        height: '48px',
                                        minWidth: '48px',
                                    }}
                                >
                                    <FilterListOutlinedIcon />
                                </Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                    <SearchOrder searchValue={masterController.searchInput} handleChangeSearch={(e: any) => {
                        const sear = e.target.value;
                        console.log('SearchOrder', sear)
                        masterController.handleChangeSearch(sear);
                    }} />
                </Grid>
            </Grid>

        </>
    )
};

export default FilterOwner;