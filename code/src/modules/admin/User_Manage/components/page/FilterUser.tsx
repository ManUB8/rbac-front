import React from 'react';
import type { IuseMasterFunctionUser } from '../../hook/useFetchUser';
import { Autocomplete, Box, Grid, TextField, } from '@mui/material';
import { roleOptions } from '../../utils/User_option';

export interface IFilterUserProps {
    masterController: IuseMasterFunctionUser
};

const FilterUser: React.FunctionComponent<IFilterUserProps> = ({
    masterController
}) => {

    return (
        <>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            label="Name"
                            fullWidth
                            value={masterController.searchInput}
                            onChange={(e) => {
                                masterController.handleChangeSearch(e.target.value);
                            }}
                        />
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Box sx={{ mt: 2 }}>
                        <Autocomplete
                            fullWidth
                            options={roleOptions}
                            getOptionLabel={(option) => option.label}
                            value={
                                roleOptions.find(
                                    (item) =>
                                        item.value ===
                                        masterController.searchState.role
                                ) ?? null
                            }
                            onChange={(_, v) => {
                                masterController.setSearchStateUser((prev) => ({
                                    ...prev,
                                    role: v?.value ?? "",
                                    page: 1,
                                }));
                            }}
                            renderInput={(p) => (
                                <TextField
                                    {...p}
                                    label="Role"
                                    variant="outlined"
                                />
                            )}
                        />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default FilterUser;