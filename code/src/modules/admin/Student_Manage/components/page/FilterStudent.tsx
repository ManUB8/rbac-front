import React from 'react';
import type { IuseMasterFunctionStudent } from '../../hook/useFetchStudent';
import { Autocomplete, Box, Button, Chip, Grid, Stack, TextField, Typography } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { Year_type } from '../../utils/student_option';

export interface IFilterStudentProps {
    masterController: IuseMasterFunctionStudent
};

const FilterStudent: React.FunctionComponent<IFilterStudentProps> = ({
    masterController
}) => {
    const facultyOptions = masterController.faculty_majors ?? [];

    const selectedFaculty = facultyOptions.find(
        (item) => item.faculty_id === masterController.searchState.faculty_id
    );

    const majorOptions = selectedFaculty?.majors ?? [];

    return (
        <>
            <Grid container spacing={2} >
                <Grid size={12}>
                    <Stack direction="row" spacing={2} sx={{ mt: 1 }} >
                        <Box sx={{ flex: 1 }}>
                            <TextField
                                label="ค้นหา (รหัส/ชื่อ/คณะ/สาขา)"
                                variant="outlined"
                                autoComplete="off"
                                fullWidth
                                value={masterController.searchInput}
                                onChange={(e) => {
                                    const sear = e.target.value;
                                    console.log('SearchOrder', sear)
                                    masterController.handleChangeSearch(sear);
                                }}
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Autocomplete
                                fullWidth
                                options={facultyOptions}
                                getOptionLabel={(option) => option.faculty_name}
                                value={
                                    facultyOptions.find(
                                        (item) => item.faculty_id === masterController.searchState.faculty_id
                                    ) ?? null
                                }
                                onChange={(_, v) => {
                                    masterController.setSearchStateStudent((prev) => ({
                                        ...prev,
                                        faculty_id: v?.faculty_id ?? 0,
                                        major_id: 0, // เปลี่ยนคณะแล้วล้างสาขา
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
                                options={majorOptions}
                                getOptionLabel={(option) => option.major_name}
                                value={
                                    majorOptions.find(
                                        (item) => item.major_id === masterController.searchState.major_id
                                    ) ?? null
                                }
                                onChange={(_, v) => {
                                    masterController.setSearchStateStudent((prev) => ({
                                        ...prev,
                                        major_id: v?.major_id ?? 0,
                                        page: 1,
                                    }));
                                }}
                                disabled={!masterController.searchState.faculty_id}
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
                                        (item) => item.id === masterController.searchState.year_status
                                    ) ?? null
                                }
                                onChange={(_, v) => {
                                    masterController.setSearchStateStudent((prev) => ({
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
        </>
    )
};

export default FilterStudent;