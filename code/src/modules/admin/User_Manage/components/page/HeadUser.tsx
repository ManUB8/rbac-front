import React from "react";
import {  Button, Chip, Grid, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import type { IuseMasterFunctionUser } from "../../hook/useFetchUser";

export interface IHeadUserProps {
    masterController: IuseMasterFunctionUser;
}

const HeadUser: React.FC<IHeadUserProps> = ({ masterController }) => {
    return (
        <Grid container spacing={1.5} sx={{ alignItems: "center" }}>
            <Grid
                size={{ xs: 12, md: 6 }}
                sx={{
                    display: "flex",
                    justifyContent: {
                        xs: "center",
                        md: "flex-start",
                    },
                }}
            >
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={{ xs: 1.25, md: 1.25 }}
                    sx={{
                        alignItems: "center",
                        textAlign: {
                            xs: "center",
                            md: "left",
                        },
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
                        จัดการแอดมิน
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            flexWrap: "wrap",
                            justifyContent: "center",
                            rowGap: 1,
                        }}
                    >
                        <Chip label="ทั้งหมด 11 รายการ" sx={{ fontWeight: 700 }} />
                        <Chip label={`Admin ${masterController.total_Role.admin}`} sx={{ fontWeight: 700 }} />
                        <Chip label={`Temporary ${masterController.total_Role.temporary_admin}`} sx={{ fontWeight: 700 }} />
                    </Stack>
                </Stack>
            </Grid>

            <Grid
                size={{ xs: 12, md: 6 }}
                sx={{
                    display: "flex",
                    justifyContent: {
                        xs: "center",
                        md: "flex-end",
                    },
                }}
            >
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={masterController.handleCreateUser}
                    sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        mt: {
                            xs: 1,
                            md: 0,
                        },
                    }}
                >
                    เพิ่มแอดมิน
                </Button>
            </Grid>
        </Grid>
    );
};

export default HeadUser;