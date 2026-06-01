import React from 'react';
import { Autocomplete, Box, Button, Chip, Grid, Stack, TextField, Typography } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import type { IuseFetchEventRegistrants } from '../../hook/useFetchEventRegistrants';
import { useFetchActivityFilter } from '../../../ActivityManage/hook/useFetchActivity';
import { useFetchFacultyMajors } from '../../../Faculty_Majors/hook/useFetchFaculty_Majors';
import { Year_type } from '../../../Student_Manage/utils/student_option';

export interface IFilterEventProps {
    mastercontroller: IuseFetchEventRegistrants
};

const FilterEvent: React.FunctionComponent<IFilterEventProps> = ({
    mastercontroller
}) => {
    const { faculty_majors, faculty_loading, } = useFetchFacultyMajors()
    const { activity_filter, activity_filter_Loading } = useFetchActivityFilter()

    const selectedFaculty = faculty_majors.find(
        (item) => String(item.faculty_id) === mastercontroller.searchState.faculty_id
    );

    const majorOptions = selectedFaculty?.majors ?? [];

    return (
        <Grid container spacing={2} >
            <Grid size={12}>
                <Stack direction="row" spacing={1} >
                    <Box sx={{ flex: 1 }}>
                        <TextField
                            label="ค้นหา ชื่อ-นามสกุล"
                            variant="outlined"
                            autoComplete="off"
                            fullWidth
                            value={mastercontroller.searchInput}
                            onChange={(e) => {
                                const sear = e.target.value;
                                console.log('SearchOrder', sear)
                                mastercontroller.handleChangeSearch(sear);
                            }}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <TextField
                            label="ค้นหา รหัสนิสิต"
                            variant="outlined"
                            autoComplete="off"
                            fullWidth
                            value={mastercontroller.searchInputCode}
                            onChange={(e) => {
                                const sear = e.target.value;
                                console.log('SearchOrder', sear)
                                mastercontroller.handleChangeSearchCode(sear);
                            }}
                        />
                    </Box>
                </Stack>
                <Stack direction="row" spacing={2} sx={{ mt: 1 }} >
                    <Box sx={{ flex: 1 }}>
                        <Autocomplete
                            fullWidth
                            loading={activity_filter_Loading}
                            options={activity_filter}
                            getOptionLabel={(option) => option.name}
                            value={
                                mastercontroller.searchState.activity_id === ""
                                    ? activity_filter[0] ?? null
                                    : activity_filter.find(
                                        (item) =>
                                            String(item.id) === mastercontroller.searchState.activity_id
                                    ) ?? null
                            }
                            onChange={(_, v) => {
                                mastercontroller.setSearchStateEventRegistrants((prev) => ({
                                    ...prev,
                                    activity_id:
                                        !v || String(v.id) === "0"
                                            ? ""
                                            : String(v.id),
                                    page: 1,
                                }));
                            }}
                            renderInput={(p) => (
                                <TextField {...p} label="กิจกรรม" variant="outlined" />
                            )}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Autocomplete
                            fullWidth
                            loading={faculty_loading}
                            options={faculty_majors}
                            getOptionLabel={(option) => option.faculty_name}
                            value={
                                faculty_majors.find(
                                    (item) => String(item.faculty_id) === mastercontroller.searchState.faculty_id
                                ) ?? null
                            }
                            onChange={(_, v) => {
                                mastercontroller.setSearchStateEventRegistrants((prev) => ({
                                    ...prev,
                                    faculty_id: v ? String(v.faculty_id) : "",
                                    major_id: "",
                                    page: 1,
                                }));
                            }}
                            renderInput={(p) => (
                                <TextField {...p} label="คณะ" variant="outlined" />
                            )}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Autocomplete
                            fullWidth
                            loading={faculty_loading}
                            options={majorOptions}
                            getOptionLabel={(option) => option.major_name}
                            value={
                                majorOptions.find(
                                    (item) => String(item.major_id) === mastercontroller.searchState.major_id
                                ) ?? null
                            }
                            onChange={(_, v) => {
                                mastercontroller.setSearchStateEventRegistrants((prev) => ({
                                    ...prev,
                                    major_id: v ? String(v.major_id) : "",
                                    page: 1,
                                }));
                            }}
                            disabled={!mastercontroller.searchState.faculty_id}
                            renderInput={(p) => (
                                <TextField {...p} label="สาขา" variant="outlined" />
                            )}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Autocomplete
                            fullWidth
                            options={Year_type}
                            getOptionLabel={(option) => option.label}
                            value={
                                Year_type.find(
                                    (item) => item.id === mastercontroller.searchState.year_status
                                ) ?? null
                            }
                            onChange={(_, v) => {
                                mastercontroller.setSearchStateEventRegistrants((prev) => ({
                                    ...prev,
                                    year_status: v?.id ?? "",
                                    page: 1,
                                }));
                            }}
                            renderInput={(p) => (
                                <TextField {...p} label="ชั้นปี" variant="outlined" />
                            )}
                        />
                    </Box>
                </Stack>
            </Grid>
        </Grid >
    )
};

export default FilterEvent;