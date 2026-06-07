import React from "react";
import { Autocomplete, Box, Grid, Stack, TextField } from "@mui/material";
import type { IuseMasterFunctionStudent } from "../../hook/useFetchStudent";
import { Year_type } from "../../utils/student_option";

export interface IFilterStudentProps {
    masterController: IuseMasterFunctionStudent;
}

const FilterStudent: React.FC<IFilterStudentProps> = ({ masterController }) => {
    const facultyOptions = masterController.faculty_majors ?? [];

    const selectedFaculty = facultyOptions.find(
        (item) => item.faculty_id === masterController.searchState.faculty_id
    );

    const majorOptions = selectedFaculty?.majors ?? [];

    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                            label="รหัสนิสิต / ชื่อนิสิต"
                            variant="outlined"
                            autoComplete="off"
                            fullWidth
                            value={masterController.searchInput}
                            onChange={(e) => {
                                masterController.handleChangeSearch(e.target.value);
                            }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                        <Autocomplete
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
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                        <Autocomplete
                            fullWidth
                            options={majorOptions}
                            getOptionLabel={(option) => option.major_name}
                            value={
                                majorOptions.find(
                                    (item) =>
                                        item.major_id ===
                                        masterController.searchState.major_id
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
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                        <Autocomplete
                            fullWidth
                            options={Year_type}
                            getOptionLabel={(option) => option.label}
                            value={
                                Year_type.find(
                                    (item) =>
                                        item.id ===
                                        masterController.searchState.year_status
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
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default FilterStudent;