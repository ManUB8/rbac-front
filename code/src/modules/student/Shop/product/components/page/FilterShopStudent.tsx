import React from 'react';
import type { IuseFetchMasterFunctionShopStudent } from '../../hook/useFetchShopStudent';
import { Autocomplete, Grid, TextField } from '@mui/material';
export interface IFilterShopStudentProps {
    mastercontroller: IuseFetchMasterFunctionShopStudent
};

const FilterShopStudent: React.FunctionComponent<IFilterShopStudentProps> = ({ mastercontroller }) => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <TextField
                                label="ชื่อสินค้า"
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
                            <Autocomplete
                                fullWidth
                                options={mastercontroller.category_data}
                                getOptionLabel={(option) => option.category_name}
                                value={
                                    mastercontroller.category_data.find(
                                        (item) =>
                                            item.category_id ===
                                            mastercontroller.searchStateProduct.category_id
                                    ) ?? null
                                }
                                onChange={(_, v) => {
                                    mastercontroller.setSearchStateProduct((prev) => ({
                                        ...prev,
                                        category_id: v?.category_id ?? '',
                                        page: 1,
                                    }));
                                }}
                                renderInput={(p) => (
                                    <TextField {...p} label="หมวดหมู่" variant="outlined" />
                                )}
                            />
                        </Grid>


                    </Grid>
                </Grid>
            </Grid>
        </>
    )
};

export default FilterShopStudent;