import React from 'react';
import type { IuseFetchMasterStudentYearReport } from '../../hook/useFetchStudentYearReport';
import { Chip, Grid, Stack, Typography } from '@mui/material';

export interface IHeadStudentYearReportProps {
    mastercontroller: IuseFetchMasterStudentYearReport
};

const HeadStudentYearReport: React.FunctionComponent<IHeadStudentYearReportProps> = ({ mastercontroller }) => {
    return (
        <>
            <Grid container spacing={2} sx={{ alignItems: "flex-start" }}>
                <Grid size={{ xs: 12, md: 9 }}>
                    <Stack
                        spacing={{ xs: 1.5, md: 1 }}
                        sx={{
                            alignItems: { xs: "center", md: "flex-start" },
                            textAlign: { xs: "center", md: "left" },
                        }}
                    >
                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={1.5}
                            sx={{ alignItems: "center" }}
                        >
                            <Typography variant="h5" sx={{ fontWeight: 800 }}>
                                รายงานนิสิตในระบบ
                            </Typography>

                            <Chip
                                label={`ทั้งหมด ${mastercontroller.total_student_year.toLocaleString()} รายการ`}
                                sx={{ fontWeight: 700 }}
                            />
                        </Stack>
                    </Stack>
                </Grid>

            </Grid>
        </>
    )
};

export default HeadStudentYearReport;