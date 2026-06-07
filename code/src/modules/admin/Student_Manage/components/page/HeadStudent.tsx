import React from "react";
import { Box, Button, Chip, Grid, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import type { IuseMasterFunctionStudent } from "../../hook/useFetchStudent";

export interface IHeadStudentProps {
    masterController: IuseMasterFunctionStudent;
}

const HeadStudent: React.FC<IHeadStudentProps> = ({ masterController }) => {
    const renderYearChip = (
        year: string,
        value: number,
        color: string
    ) => (
        <Chip
            label={
                <>
                    {year}{" "}
                    <Box component="span" sx={{ color, fontWeight: 800 }}>
                        {value.toLocaleString()}
                    </Box>{" "}
                    รายการ
                </>
            }
            sx={{
                width: { xs: "100%", md: "auto" },
                fontWeight: 700,
            }}
        />
    );

    return (
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
                            จัดการนิสิต
                        </Typography>

                        <Chip
                            label={`ทั้งหมด ${masterController.total_student_all.toLocaleString()} รายการ`}
                            sx={{ fontWeight: 700 }}
                        />
                    </Stack>

                    <Grid
                        container
                        spacing={1.5}
                        sx={{
                            width: { xs: 320, md: "auto" },
                            justifyContent: "center",
                        }}
                    >
                        <Grid size={{ xs: 6, md: "auto" }}>
                            {renderYearChip("ปี 1", masterController.total_student.student_1, "primary.main")}
                        </Grid>

                        <Grid size={{ xs: 6, md: "auto" }}>
                            {renderYearChip("ปี 2", masterController.total_student.student_2, "primary.main")}
                        </Grid>

                        <Grid size={{ xs: 6, md: "auto" }}>
                            {renderYearChip("ปี 3", masterController.total_student.student_3, "primary.main")}
                        </Grid>

                        <Grid size={{ xs: 6, md: "auto" }}>
                            {renderYearChip("ปี 4", masterController.total_student.student_4, "primary.main")}
                        </Grid>
                    </Grid>
                </Stack>
            </Grid>

            <Grid
                size={{ xs: 12, md: 3 }}
                sx={{
                    display: "flex",
                    justifyContent: { xs: "center", md: "flex-end" },
                }}
            >
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={masterController.handleCreateStudent}
                    sx={{ textTransform: "none", fontWeight: 700 }}
                >
                    เพิ่มนิสิต
                </Button>
            </Grid>
        </Grid>
    );
};

export default HeadStudent;