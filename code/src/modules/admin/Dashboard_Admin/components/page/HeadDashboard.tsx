import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import type { IuseuseFetchDashboardAdmin } from "../../hook/useFetchDashboardAdmin";

export interface IHeadDashboardProps {
    mastercontroller: IuseuseFetchDashboardAdmin;
}

const HeadDashboard: React.FC<IHeadDashboardProps> = ({
    mastercontroller,
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
                    direction="column"
                    spacing={1.25}
                    sx={{
                        justifyContent: "flex-start",
                        textAlign: {
                            xs: "center",
                            md: "left",
                        },
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            flexShrink: 0,
                            fontWeight: 800,
                        }}
                    >
                        Dashboard
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            flexShrink: 0,
                            fontWeight: 700,
                        }}
                    >
                        ภาพรวมระบบทะเบียนกิจกรรม
                    </Typography>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default HeadDashboard;