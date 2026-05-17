import React from 'react';
import { Autocomplete, Box, Button, Chip, Grid, Stack, TextField, Typography } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import type { IuseActivityFetch } from '../../hook/useFetchActivity';
import { Activity_status, Check_type, Require_registration } from '../../utils/activity_option';

export interface IActivityFilterProps {
    MasterActivity: IuseActivityFetch
};

const ActivityFilter: React.FunctionComponent<IActivityFilterProps> = ({
    MasterActivity
}) => {
    return (
          <>
            <Grid container spacing={2} >
                <Grid size={12}>
                    <Stack direction="row" spacing={1} >

                    </Stack>
                    <Stack direction="row" spacing={2} sx={{ mt: 1 }} >
                        <Box sx={{ flex: 1 }}>
                            <TextField
                                label="ค้นหา ชื่อกิจกรรม"
                                variant="outlined"
                                autoComplete="off"
                                fullWidth
                                value={MasterActivity.searchInput}
                                onChange={(e) => {
                                    const sear = e.target.value;
                                    console.log('SearchOrder', sear)
                                    MasterActivity.handleChangeSearch(sear);
                                }}
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Autocomplete
                                fullWidth
                                options={Activity_status}
                                getOptionLabel={(option) => option.label}
                                value={
                                    Activity_status.find(
                                        (item) => item.id === MasterActivity.searchState.activity_status
                                    ) ?? null
                                }
                                onChange={(_, v) => {
                                    MasterActivity.setSearchStateActivity((prev) => ({
                                        ...prev,
                                        activity_status: v?.id ?? '',
                                        page: 1,
                                    }));
                                }}
                                renderInput={(p) => (
                                    <TextField {...p} label="สถานะ" variant="outlined" />
                                )}
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Autocomplete
                                fullWidth
                                options={Check_type}
                                getOptionLabel={(option) => option.label}
                                value={
                                    Check_type.find(
                                        (item) => item.id === MasterActivity.searchState.check_type
                                    ) ?? null
                                }
                                onChange={(_, v) => {
                                    MasterActivity.setSearchStateActivity((prev) => ({
                                        ...prev,
                                        check_type: v?.id ?? '',
                                        page: 1,
                                    }));
                                }}
                                renderInput={(p) => (
                                    <TextField {...p} label="ประเภท" variant="outlined" />
                                )}
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Autocomplete
                                fullWidth
                                options={Require_registration}
                                getOptionLabel={(option) => option.label}
                                value={
                                    Require_registration.find(
                                        (item) => item.id === MasterActivity.searchState.require_registration
                                    ) ?? null
                                }
                                onChange={(_, v) => {
                                    MasterActivity.setSearchStateActivity((prev) => ({
                                        ...prev,
                                        require_registration: v?.id ?? "",
                                        page: 1,
                                    }));
                                }}
                                renderInput={(p) => (
                                    <TextField {...p} label="ลงทะเบียน" variant="outlined" />
                                )}
                            />
                        </Box>
                    </Stack>
                </Grid>
            </Grid >
        </>
    )
};

export default ActivityFilter;