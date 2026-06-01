import React from 'react';
import type { IuseMasterFunctionStudent } from '../../hook/useFetchStudent';
import { Autocomplete, Box, Grid, TextField, } from '@mui/material';
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
            <Grid container spacing={2} sx={{  mt: 2, }}>
                <Grid size={{ xs: 6, md: 2 }}>
                    <TextField
                        fullWidth
                        label="รหัสนิสิต"
                        value={masterController.searchState.search}
                        onChange={(e) => {
                            masterController.handleChangeSearch(e.target.value);
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 6, md: 2 }}>
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
                        renderInput={(params) => (
                            <TextField {...params} label="ชั้นปี" />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ flex: 1}}>
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
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
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
                </Grid>

            </Grid>
        </>
    )
};

export default FilterStudent;