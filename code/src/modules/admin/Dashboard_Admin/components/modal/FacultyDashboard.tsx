import React from "react";
import {
    Grid,
} from "@mui/material";
import type { IActivityDashboardData } from "../../interface/DashboardAdmin.interface";
import FacultyRankCard from "../Faculty_view/FacultyRankCard";
import MajorRankCard from "../Faculty_view/MajorRankCard";

export interface IFacultyDashboardProps {
    dashboard_data: IActivityDashboardData;
    facultyRankLoading?: boolean;
    majorRankLoading?: boolean;
}

const FacultyDashboard: React.FC<IFacultyDashboardProps> = ({
    dashboard_data,
    facultyRankLoading = false,
    majorRankLoading = false,
}) => {
    const facultyRank = dashboard_data.faculty_rank ?? [];
    const majorRank = dashboard_data.major_rank ?? [];
    return (
        <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid size={12}>
                <FacultyRankCard facultyRank={facultyRank} loading={facultyRankLoading} />
            </Grid>

            <Grid size={12}>
                <MajorRankCard majorRank={majorRank} loading={majorRankLoading} />
            </Grid>
        </Grid>
    );
};

export default FacultyDashboard;
