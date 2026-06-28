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
                    <Grid size={{ xs: 6, md: 4 }}>
                        <TextField
                            label="รหัสนิสิต 4 ตัวหน้า"
                            variant="outlined"
                            placeholder="6701"
                            autoComplete="off"
                            fullWidth
                            value={mastercontroller.studentCodeInput}
                            error={
                                mastercontroller.studentCodeInput.length > 0 &&
                                mastercontroller.studentCodeInput.length < 4
                            }
                            helperText={
                                    mastercontroller.studentCodeInput.length > 0 &&
                                    mastercontroller.studentCodeInput.length < 4
                                    ? "กรุณากรอกรหัสนิสิตอย่างน้อย 4 หลัก"
                                    : ""
                            }
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");

                                mastercontroller.handleChangeStudentCodePrefix(
                                    value
                                );
                            }}
                        />
                    </Grid>

                    <Grid size={{ xs: 6, md: 4 }}>
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