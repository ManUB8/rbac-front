import React from "react";
import {
    Box,
    Card,
    CardContent,
    Chip,
    Grid,
    LinearProgress,
    Paper,
    Typography,
} from "@mui/material";
import type { IActivityDashboardData, IGenderSummary, IPrefixGenderSummary } from "../../interface/DashboardAdmin.interface";

export interface IFacultyDetailProps {
    dashboard_data: IActivityDashboardData;
}

const FacultyDetail: React.FC<IFacultyDetailProps> = ({ dashboard_data }) => {
    const facultyData = dashboard_data.faculty ?? [];

    const getPercent = (joined: number, total: number) => {
        if (!total) return 0;
        return Number(((joined / total) * 100).toFixed(1));
    };

    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
                <Typography sx={{ fontSize: 20, fontWeight: 800, mb: 2 }}>
                    {"จำนวนนิสิตแยกตามคณะและสาขา"}
                </Typography>

                {facultyData.map((faculty) => {
                    const facultyPercent = getPercent(
                        faculty.joined_count,
                        faculty.total_student
                    );

                    return (
                        <Paper
                            key={faculty.faculty_id}
                            variant="outlined"
                            sx={{
                                p: 2,
                                mb: 1.5,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    flexWrap: "wrap",
                                    gap: 1,
                                    mb: 1.5,
                                }}
                            >
                                <Typography sx={{ fontWeight: 800, fontSize: 16 }}>
                                    {faculty.faculty_name}
                                </Typography>

                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 1,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <Chip size="small" label={`นิสิต ${faculty.total_student}`} />
                                    <Chip
                                        size="small"
                                        color="success"
                                        label={`เข้าร่วม ${faculty.joined_count}`}
                                    />
                                    <Chip
                                        size="small"
                                        color="error"
                                        label={`ไม่เข้าร่วม ${faculty.not_joined_count}`}
                                    />
                                    <Chip
                                        size="small"
                                        color="primary"
                                        label={`${facultyPercent}%`}
                                    />
                                    <Chip
                                        size="small"
                                        label={`ชาย ${getPrefixMaleCount(faculty.prefix_gender_summary)}`}
                                    />
                                    <Chip
                                        size="small"
                                        label={`หญิง ${getPrefixFemaleCount(faculty.prefix_gender_summary)}`}
                                    />
                                    <Chip
                                        size="small"
                                        label={`เพศ ชาย ${getGenderMaleCount(faculty.gender_summary)} · หญิง ${getGenderFemaleCount(faculty.gender_summary)} · LGBTQ+ ${getLgbtqCount(faculty.gender_summary)}`}
                                    />
                                </Box>
                            </Box>

                            <Grid container spacing={1.5}>
                                {faculty.major.map((major) => {
                                    const majorPercent = getPercent(
                                        major.joined_count,
                                        major.total_student
                                    );

                                    return (
                                        <Grid
                                            key={major.major_id}
                                            size={{ xs: 12, sm: 6, md: 4 }}
                                        >
                                            <Paper
                                                variant="outlined"
                                                sx={{
                                                    p: 1.5,
                                                    bgcolor: "custom.inputBg",
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    sx={{ fontWeight: 700 }}
                                                    noWrap
                                                >
                                                    {major.major_name}
                                                </Typography>

                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 0.6,
                                                        flexWrap: "wrap",
                                                    }}
                                                >
                                                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                                        นิสิต
                                                    </Typography>

                                                    <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 800 }}>
                                                        {major.total_student}
                                                    </Typography>

                                                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                                        · เข้าร่วม
                                                    </Typography>

                                                    <Typography variant="caption" sx={{ color: "success.main", fontWeight: 800 }}>
                                                        {major.joined_count}
                                                    </Typography>

                                                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                                        · ไม่เข้า
                                                    </Typography>

                                                    <Typography variant="caption" sx={{ color: "error.main", fontWeight: 800 }}>
                                                        {major.not_joined_count}
                                                    </Typography>

                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 0.6,
                                                        flexWrap: "wrap",
                                                        mt: 0.4,
                                                    }}
                                                >
                                                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                                        ชาย
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: "info.main", fontWeight: 800 }}>
                                                        {getPrefixMaleCount(major.prefix_gender_summary)}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                                        · หญิง
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: "#d81b60", fontWeight: 800 }}>
                                                        {getPrefixFemaleCount(major.prefix_gender_summary)}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 0.6,
                                                        flexWrap: "wrap",
                                                        mt: 0.2,
                                                    }}
                                                >
                                                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                                        เพศ ชาย
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: "info.main", fontWeight: 800 }}>
                                                        {getGenderMaleCount(major.gender_summary)}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                                        · หญิง
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: "#d81b60", fontWeight: 800 }}>
                                                        {getGenderFemaleCount(major.gender_summary)}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                                        · LGBTQ+
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: "#7c3aed", fontWeight: 800 }}>
                                                        {getLgbtqCount(major.gender_summary)}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mt: 0.5,
                                                    }}
                                                >
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            fontWeight: 800,
                                                            color: "error.main",
                                                        }}
                                                    >
                                                        {majorPercent}%
                                                    </Typography>
                                                </Box>

                                                <LinearProgress
                                                    variant="determinate"
                                                    value={majorPercent}
                                                    sx={{
                                                        mt: 0.7,
                                                        height: 6,
                                                        borderRadius: 99,
                                                        bgcolor: "#c7bdf9",
                                                        "& .MuiLinearProgress-bar": {
                                                            bgcolor: "error.main",
                                                        },
                                                    }}
                                                />
                                            </Paper>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Paper>
                    );
                })}
            </CardContent>
        </Card>
    );
};

export default FacultyDetail;

const getPrefixMaleCount = (prefixGenderSummary?: IPrefixGenderSummary) =>
    prefixGenderSummary?.male_count ?? 0;

const getPrefixFemaleCount = (prefixGenderSummary?: IPrefixGenderSummary) =>
    prefixGenderSummary?.female_count ?? 0;

const getGenderMaleCount = (genderSummary?: IGenderSummary) =>
    genderSummary?.male_count ?? 0;

const getGenderFemaleCount = (genderSummary?: IGenderSummary) =>
    genderSummary?.female_count ?? 0;

const getLgbtqCount = (genderSummary?: IGenderSummary) =>
    genderSummary?.lgbtq_count ?? 0;
