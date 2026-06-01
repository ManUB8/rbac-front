import React from "react";
import { Button, Chip, Grid, Stack, Typography } from "@mui/material";
import { NumericFormat } from "react-number-format";
import AddIcon from "@mui/icons-material/Add";

import type { IuseMasterFunctionStudent } from "../../hook/useFetchStudent";

export interface IHeadStudentProps {
    masterController: IuseMasterFunctionStudent;
}

const HeadStudent: React.FC<IHeadStudentProps> = ({ masterController }) => {
    return (
        <Grid
            container
            spacing={1.5}
            sx={{
                alignItems: "center",
            }}
        >
            <Grid
                size={{ xs: 12, sm: 12, md: 6 }}
                sx={{
                    display: "flex",
                    justifyContent: {
                        xs: "center",
                        md: "flex-start",
                    },
                }}
            >
                <Stack
                    direction="row"
                    spacing={1.25}
                    sx={{
                        alignItems: "center",
                        textAlign: {
                            xs: "center",
                            md: "left",
                        },
                        flexWrap: "wrap",
                        justifyContent: {
                            xs: "center",
                            md: "flex-start",
                        },
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            flexShrink: 0,
                            fontWeight: 800,
                        }}
                    >
                        จัดการนิสิต
                    </Typography>

                    <Chip
                        label={
                            <span>
                                {"ทั้งหมด "}
                                <NumericFormat
                                    value={masterController.total_student}
                                    displayType="text"
                                    thousandSeparator=","
                                />
                                {" รายการ"}
                            </span>
                        }
                        sx={{
                            fontWeight: 700,
                        }}
                    />
                </Stack>
            </Grid>

            <Grid
                size={{ xs: 12, sm: 12, md: 6 }}
                sx={{
                    display: "flex",
                    justifyContent: {
                        xs: "center",
                        md: "flex-end",
                    },
                }}
            >
                <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{
                        alignItems: "center",
                        ml: {
                            md: "auto",
                        },
                        mt: {
                            xs: 1,
                            md: 0,
                        },
                    }}
                >
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={masterController.handleCreateStudent}
                        sx={{
                            textTransform: "none",
                            fontWeight: 700,
                        }}
                    >
                        เพิ่มนิสิต
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default HeadStudent;