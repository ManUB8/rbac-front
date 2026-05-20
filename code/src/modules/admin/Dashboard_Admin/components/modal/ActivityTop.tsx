import React from "react";
import {
    Box,
    Card,
    CardContent,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";

import type { IActivityDashboardData } from "../../interface/DashboardAdmin.interface";
import { formatDateThai } from "../../../../../shared/components/Date-Time/DateAndTime";

export interface IActivityTopProps {
    dashboard_data: IActivityDashboardData;
}

const ActivityTop: React.FC<IActivityTopProps> = ({ dashboard_data }) => {
    const topActivity = dashboard_data.top_activity;

    if (!topActivity) return null;

    const statItems = [
        { label: "ลงทะเบียนทั้งหมด", value: topActivity.total_count },
        { label: "เข้าร่วม", value: topActivity.joined_count },
        { label: "ไม่เข้าร่วม", value: topActivity.not_joined_count },
        { label: "เช็คอิน", value: topActivity.checkin_count },
        { label: "เช็คเอาท์", value: topActivity.checkout_count },
        { label: "% เข้าร่วม", value: `${topActivity.join_rate_percent}%` },
    ];

    return (
        <Grid container spacing={1} sx={{ mt: 2 }}>
            <Grid size={12}>
                <Card
                    sx={{
                        overflow: "hidden",
                        background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                        boxShadow: "0 12px 32px rgba(25, 118, 210, 0.28)",
                    }}
                >
                    <CardContent sx={{ p: 2.5 }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                minWidth: 0,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 42,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                }}
                            >
                                <EmojiEventsIcon
                                    sx={{
                                        fontSize: 54,
                                        color: "#FFD700",
                                    }}
                                />
                            </Box>

                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: 700,
                                        opacity: 0.9,
                                        color: '#FFFFFF'
                                    }}
                                >
                                    TOP กิจกรรมที่มีผู้เข้าร่วมสูงสุด
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: 25,
                                        fontWeight: 800,
                                        mt: 0.5,
                                        color: '#FFFFFF'
                                    }}
                                    noWrap
                                >
                                    {topActivity.activity_name}
                                </Typography>

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{
                                        mt: 1,
                                        opacity: 0.95,
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        color: '#FFFFFF'
                                    }}
                                >
                                    <CalendarMonthIcon
                                        sx={{
                                            fontSize: 16,
                                            color: "#d0cccb",
                                        }}
                                    />

                                    <Typography variant="body2">
                                        {formatDateThai(topActivity.activity_date)}
                                    </Typography>


                                    <PlaceIcon
                                        sx={{
                                            fontSize: 16,
                                            color: "#ff1744",
                                        }}
                                    />

                                    <Typography variant="body2">
                                        {topActivity.location}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Box>

                        <Grid container spacing={1} sx={{ mt: 2 }}>
                            {statItems.map((item) => (
                                <Grid size={{ xs: 12, sm: 6, md: 2 }} key={item.label}>
                                    <Card
                                        sx={{
                                            p: 2,
                                            textAlign: "center",
                                            bgcolor: "rgba(255,255,255,0.16)",
                                            border: "1px solid rgba(255,255,255,0.18)",
                                            boxShadow:
                                                "inset 0 -1px 0 rgba(255,255,255,0.12)",
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontWeight: 700,
                                                opacity: 0.95,
                                                color: "#e2e0e0",
                                            }}
                                        >
                                            {item.label}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: 24,
                                                fontWeight: 800,
                                                color: "#fff",
                                            }}
                                        >
                                            {item.value}
                                        </Typography>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ActivityTop;