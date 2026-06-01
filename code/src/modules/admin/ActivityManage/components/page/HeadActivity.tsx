import React from "react";
import {
    Button,
    Chip,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { NumericFormat } from "react-number-format";

import type { IuseActivityFetch } from "../../hook/useFetchActivity";

export interface IHeadActivityProps {
    MasterActivity: IuseActivityFetch;
}

const HeadActivity: React.FC<IHeadActivityProps> = ({
    MasterActivity,
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
                    direction={{ xs: "column", md: "row" }}
                    spacing={1.25}
                    sx={{
                        alignItems: {
                            xs: "center",
                            md: "center",
                        },
                        textAlign: {
                            xs: "center",
                            md: "left",
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
                        จัดการกิจกรรม
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            flexWrap: "wrap",
                            justifyContent: "center",
                        }}
                    >
                        <Chip
                            label={
                                <span>
                                    <NumericFormat
                                        value={MasterActivity.total_activity}
                                        displayType="text"
                                        thousandSeparator=","
                                    />
                                    {" รายการ"}
                                </span>
                            }
                            sx={{ fontWeight: 700 }}
                        />

                        <Chip
                            label={
                                <span>
                                    {"กิจกรรมที่เปิด "}
                                    <NumericFormat
                                        value={MasterActivity.total_active_activity}
                                        displayType="text"
                                        thousandSeparator=","
                                    />
                                    {" รายการ"}
                                </span>
                            }
                            sx={{ fontWeight: 700 }}
                        />
                    </Stack>
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
                        onClick={MasterActivity.handleOpenAdd}
                        sx={{
                            textTransform: "none",
                            fontWeight: 700,
                        }}
                    >
                        เพิ่มกิจกรรม
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default HeadActivity;