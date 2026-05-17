import React from "react";
import {
    Card,
    CardContent,
    Grid,
    Stack,
    Typography,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import type { IusFetcheActivityStudentCode } from "../../hook/useFetchActivitySummary";

export interface IHeadCardeProps {
    mastercontroller: IusFetcheActivityStudentCode;
}

const HeadCarde: React.FC<IHeadCardeProps> = ({
    mastercontroller,
}) => {
    const dashboard_data = mastercontroller.dashboard_code;

    const cards = [
        {
            title: "จำนวนกิจกรรม",
            value: dashboard_data?.total_activity_count ?? 0,
            color: "#7c3aed",
            icon: <EventAvailableIcon />,
        },
        {
            title: "เข้าร่วม",
            value: dashboard_data?.joined_count ?? 0,
            color: "#16a34a",
            icon: <CheckCircleIcon />,
        },
        {
            title: "ไม่เข้าร่วม",
            value: dashboard_data?.not_joined_count ?? 0,
            color: "#dc2626",
            icon: <CancelIcon />,
        },
        {
            title: "เช็คอิน",
            value: dashboard_data?.checkin_count ?? 0,
            color: "#2563eb",
            icon: <LoginIcon />,
        },
        {
            title: "เช็คเอาท์",
            value: dashboard_data?.checkout_count ?? 0,
            color: "#ea580c",
            icon: <LogoutIcon />,
        },

        {
            title: "ชั่วโมงรวม",
            value: dashboard_data?.total_hours ?? 0,
            color: "#0891b2",
            icon: <AccessTimeFilledIcon />,
        },
    ];

    return (
        <Grid container spacing={2}>
            {cards.map((item) => (
                <Grid
                    key={item.title}
                    size={{ xs: 12, sm: 6, md: 4 }}
                >
                    <Card
                        sx={{
                            height: "100%",
                            boxShadow: "0 6px 20px rgba(15,23,42,0.08)",
                            border: "1px solid #e2e8f0",
                        }}
                    >
                        <CardContent>
                            <Stack
                                direction="row"
                                spacing={1.5}
                                sx={{
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Stack spacing={0.5}>
                                    <Typography
                                        sx={{
                                            fontSize: 14,
                                            color: "text.secondary",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {item.title}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: 28,
                                            fontWeight: 800,
                                            color: item.color,
                                            lineHeight: 1,
                                        }}
                                    >
                                        {item.value}
                                    </Typography>
                                </Stack>

                                <Stack
                                    sx={{
                                        width: 52,
                                        height: 52,
                                        borderRadius: "50%",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        bgcolor: `${item.color}15`,
                                        color: item.color,

                                        "& svg": {
                                            fontSize: 28,
                                        },
                                    }}
                                >
                                    {item.icon}
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default HeadCarde;