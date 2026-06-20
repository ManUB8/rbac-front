import React from 'react';
import type { IuseFetchMasterFunctionProduct } from '../../hook/useFetchMasterProduct';
import { Autocomplete, Grid, TextField } from '@mui/material';

export interface IFilterMasterProductProps {
    master_product: IuseFetchMasterFunctionProduct
};

const FilterMasterProduct: React.FunctionComponent<IFilterMasterProductProps> = ({master_product}) => {
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
                            value={master_product.searchInput}
                            onChange={(e) => {
                                master_product.handleChangeSearch(e.target.value);
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

export default FilterMasterProduct;