import React from 'react';
import { Autocomplete, Box, Button, Chip, Grid, Stack, TextField, Typography } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { useFetchActivityFilterAll, type IuseActivityFetch } from '../../hook/useFetchActivity';

export interface IActivityFilterProps {
    MasterActivity: IuseActivityFetch
};

const ActivityFilter: React.FunctionComponent<IActivityFilterProps> = ({
    MasterActivity
}) => {
    const { hour_type, check_type, activity_status, require_registration, activity_all_Loading } = useFetchActivityFilterAll()
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
                                loading={activity_all_Loading}
                                options={activity_status}
                                getOptionLabel={(option) => option.label}
                                value={
                                    activity_status.find(
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
                                loading={activity_all_Loading}
                                options={check_type}
                                getOptionLabel={(option) => option.label}
                                value={
                                    check_type.find(
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
                                loading={activity_all_Loading}
                                options={require_registration}
                                getOptionLabel={(option) => option.label}
                                value={
                                    require_registration.find(
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
                        <Box sx={{ flex: 1 }}>
                            <Autocomplete
                                fullWidth
                                loading={activity_all_Loading}
                                options={hour_type}
                                getOptionLabel={(option) => option.label}
                                value={
                                    hour_type.find(
                                        (item) => item.id === MasterActivity.searchState.hour_type_id
                                    ) ?? null
                                }
                                onChange={(_, v) => {
                                    MasterActivity.setSearchStateActivity((prev) => ({
                                        ...prev,
                                        hour_type_id: v?.id ?? "",
                                        page: 1,
                                    }));
                                }}
                                renderInput={(p) => (
                                    <TextField {...p} label="ประเภทชั่วโมง" variant="outlined" />
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