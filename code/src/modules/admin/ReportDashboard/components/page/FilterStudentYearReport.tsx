import React from "react";
import type { IuseFetchMasterStudentYearReport } from "../../hook/useFetchStudentYearReport";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { Year_type } from "../../../Student_Manage/utils/student_option";

export interface IFilterStudentYearReportProps {
    mastercontroller: IuseFetchMasterStudentYearReport;
}

const FilterStudentYearReport: React.FC<IFilterStudentYearReportProps> = ({
    mastercontroller,
}) => {
    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            label="รหัสนิสิต"
                            variant="outlined"
                            autoComplete="off"
                            fullWidth
                            value={mastercontroller.studentCodeInput}
                            onChange={(e) => {
                                mastercontroller.handleChangeStudentCodePrefix(
                                    e.target.value
                                );
                            }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Autocomplete
                            fullWidth
                            options={Year_type}
                            getOptionLabel={(option) => option.label}
                            value={
                                Year_type.find(
                                    (item) => item.id === mastercontroller.searchInput.year_status
                                ) ?? null
                            }
                            onChange={(_, value) => {
                                mastercontroller.handleChangeYearStatus(value?.id ?? "");
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="ชั้นปี" variant="outlined" />
                            )}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default FilterStudentYearReport;