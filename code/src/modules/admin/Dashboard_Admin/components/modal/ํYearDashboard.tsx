import React from "react";
import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";

import LinearProgress, {
    linearProgressClasses,
} from "@mui/material/LinearProgress";

import type { IActivityDashboardData } from "../../interface/DashboardAdmin.interface";

export interface IYearDashboardProps {
    dashboard_data: IActivityDashboardData;
}

const YearDashboard: React.FC<IYearDashboardProps> = ({ dashboard_data }) => {
    const yearCount = dashboard_data.year_count ?? [];

    return (
        <Card variant="outlined" sx={{ mt: 2 }}>
            <CardContent>
                <Typography sx={{ fontSize: 18, fontWeight: 800, mb: 2 }}>
                    การเข้าร่วมตามชั้นปี
                </Typography>

                <Grid container spacing={2}>
                    {yearCount.map((item) => (
                        <Grid key={item.name} size={{ xs: 12, sm: 6, md: 3 }}>
                            <Card variant="outlined" sx={{ height: "100%" }}>
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            mb: 1.5,
                                        }}
                                    >
                                        <Typography sx={{ fontWeight: 800, fontSize: 16 }}>
                                            {item.name}
                                        </Typography>

                                        <Box
                                            sx={{
                                                px: 1.5,
                                                py: 0.4,
                                                borderRadius: 99,
                                                bgcolor: "error.main",
                                                color: "#fff",
                                                fontWeight: 800,
                                                fontSize: 13,
                                            }}
                                        >
                                            {item.join_rate_percent}%
                                        </Box>
                                    </Box>

                                    <LinearProgress
                                        variant="determinate"
                                        value={item.join_rate_percent}
                                        sx={{
                                            height: 7,
                                            borderRadius: 999,
                                            mb: 1.5,
                                            [`&.${linearProgressClasses.colorPrimary}`]: {
                                                backgroundColor: "#c7bdf9",
                                            },
                                            [`& .${linearProgressClasses.bar}`]: {
                                                borderRadius: 999,
                                                backgroundColor: "#e31b23",
                                            },
                                        }}
                                    />

                                    <Grid container spacing={1}>
                                        <Grid size={6}>
                                            <InfoItem label="นิสิต" value={item.total_student} />
                                        </Grid>

                                        <Grid size={6}>
                                            <InfoItem
                                                label="เข้าร่วม"
                                                value={item.joined_count}
                                                color="#00a63e"
                                            />
                                        </Grid>

                                        <Grid size={6}>
                                            <InfoItem
                                                label="ไม่เข้าร่วม"
                                                value={item.not_joined_count}
                                                color="#ff1e1e"
                                            />
                                        </Grid>

                                        <Grid size={6}>
                                            <InfoItem
                                                label="เช็คอิน"
                                                value={item.checkin_count}
                                                color="#0066ff"
                                            />
                                        </Grid>

                                        <Grid size={6}>
                                            <InfoItem
                                                label="เช็คเอาท์"
                                                value={item.checkout_count}
                                                color="#ff9800"
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default YearDashboard;

interface IInfoItemProps {
    label: string;
    value: number;
    color?: string;
}

const InfoItem: React.FC<IInfoItemProps> = ({ label, value, color }) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
            }}
        >
            <Typography variant="body2" color="text.secondary">
                {label}
            </Typography>

            <Typography
                variant="body2"
                sx={{
                    fontWeight: 800,
                    color: color || "text.primary",
                }}
            >
                {value}
            </Typography>
        </Box>
    );
};