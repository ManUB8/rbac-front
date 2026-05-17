import React from "react";
import {
    Box,
    Card,
    CardContent,
    Chip,
    Grid,
    LinearProgress,
    Stack,
    Typography,
} from "@mui/material";
import type { IActivityDashboardData } from "../../interface/DashboardAdmin.interface";
import FacultyRankCard from "../Faculty_view/FacultyRankCard";
import MajorRankCard from "../Faculty_view/MajorRankCard";

export interface IFacultyDashboardProps {
    dashboard_data: IActivityDashboardData;
}

const FacultyDashboard: React.FC<IFacultyDashboardProps> = ({ dashboard_data }) => {
    const facultyRank = dashboard_data.faculty_rank ?? [];
    const majorRank = dashboard_data.major_rank ?? [];
    return (
        <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid size={12}>
                <FacultyRankCard facultyRank={facultyRank} />
            </Grid>

            <Grid size={12}>
                <MajorRankCard majorRank={majorRank} />
            </Grid>
        </Grid>
    );
};

export default FacultyDashboard;