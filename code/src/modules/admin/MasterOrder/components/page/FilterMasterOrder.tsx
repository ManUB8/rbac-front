import React from 'react';
import type { IuseFetchMasterFunctionOrder } from '../../hook/useFetchMasterOrder';
import { Grid, TextField } from '@mui/material';

export interface IFilterMasterOrderProps {
    mastercontroller:IuseFetchMasterFunctionOrder
};

const FilterMasterOrder: React.FunctionComponent<IFilterMasterOrderProps> = ({mastercontroller}) => {
    return (
         <>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <TextField
                                label="ค้นหาเลขออเดอร์ / รหัสนิสิต"
                                variant="outlined"
                                autoComplete="off"
                                fullWidth
                                value={mastercontroller.searchInput}
                                onChange={(e) => {
                                    mastercontroller.handleChangeSearch(e.target.value);
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                            {/* <Autocomplete
                            fullWidth
                            options={facultyOptions}
                            getOptionLabel={(option) => option.faculty_name}
                            value={
                                facultyOptions.find(
                                    (item) =>
                                        item.faculty_id ===
                                        masterController.searchState.faculty_id
                                ) ?? null
                            }
                            onChange={(_, v) => {
                                masterController.setSearchStateStudent((prev) => ({
                                    ...prev,
                                    faculty_id: v?.faculty_id ?? 0,
                                    major_id: 0,
                                    page: 1,
                                }));
                            }}
                            renderInput={(p) => (
                                <TextField {...p} label="คณะ" variant="outlined" />
                            )}
                        /> */}
                        </Grid>


                    </Grid>
                </Grid>
            </Grid>
        </>
    )
};

export default FilterMasterOrder;