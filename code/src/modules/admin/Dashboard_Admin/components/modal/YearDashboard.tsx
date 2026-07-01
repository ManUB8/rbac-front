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

import type { IActivityDashboardData, IGenderSummary, IPrefixGenderSummary } from "../../interface/DashboardAdmin.interface";

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

                <Grid container spacing={1}>
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

                                    <GenderSummary
                                        genderSummary={item.gender_summary}
                                        prefixGenderSummary={item.prefix_gender_summary}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};

interface IGenderSummaryProps {
    genderSummary?: IGenderSummary;
    prefixGenderSummary?: IPrefixGenderSummary;
}

const GenderSummary: React.FC<IGenderSummaryProps> = ({
    genderSummary,
    prefixGenderSummary,
}) => {
    const prefixMaleCount = prefixGenderSummary?.male_count ?? 0;
    const prefixFemaleCount = prefixGenderSummary?.female_count ?? 0;
    const genderMaleCount = genderSummary?.male_count ?? 0;
    const genderFemaleCount = genderSummary?.female_count ?? 0;
    const lgbtqCount = genderSummary?.lgbtq_count ?? 0;

    return (
        <Box sx={{ mt: 1.25 }}>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
                ชาย{" "}
                <Box component="span" sx={{ color: "#1976d2", fontWeight: 800 }}>
                    {prefixMaleCount}
                </Box>
                {" · "}หญิง{" "}
                <Box component="span" sx={{ color: "#d81b60", fontWeight: 800 }}>
                    {prefixFemaleCount}
                </Box>
            </Typography>

            <Typography
                variant="caption"
                component="div"
                sx={{ color: "text.secondary", mt: 0.35 }}
            >
                เพศ ชาย{" "}
                <Box component="span" sx={{ color: "#1976d2", fontWeight: 800 }}>
                    {genderMaleCount}
                </Box>
                {" · "}หญิง{" "}
                <Box component="span" sx={{ color: "#d81b60", fontWeight: 800 }}>
                    {genderFemaleCount}
                </Box>
                {" · "}LGBTQ+{" "}
                <Box component="span" sx={{ color: "#7c3aed", fontWeight: 800 }}>
                    {lgbtqCount}
                </Box>
            </Typography>
        </Box>
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
