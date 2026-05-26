import React from "react";
import { Button, Chip, Grid, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { NumericFormat } from "react-number-format";

import type { IuseFaculty_MajorsFetch } from "../../hook/useFetchFaculty_Majors";

export interface IHeader_Faculty_MajorsProps {
    Master_Faculty_Majors: IuseFaculty_MajorsFetch;
}

const Header_Faculty_Majors: React.FC<IHeader_Faculty_MajorsProps> = ({
    Master_Faculty_Majors,
}) => {
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
                        {"จัดการคณะสาขา"}
                    </Typography>

                    <Chip
                        label={
                            <span>
                                <NumericFormat
                                    value={Master_Faculty_Majors.faculty_total}
                                    displayType="text"
                                    thousandSeparator=","
                                />
                                {" คณะ"}
                            </span>
                        }
                        sx={{
                            fontWeight: 700,
                        }}
                    />

                    <Chip
                        label={
                            <span>
                                <NumericFormat
                                    value={Master_Faculty_Majors.majors_total}
                                    displayType="text"
                                    thousandSeparator=","
                                />
                                {" สาขา"}
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
                        onClick={Master_Faculty_Majors.handleOpenCreateFaculty}
                        sx={{
                            textTransform: "none",
                            fontWeight: 700,
                        }}
                    >
                        เพิ่มคณะ
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default Header_Faculty_Majors;