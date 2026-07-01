import React from "react";
import { Box, Card, Grid, Skeleton, Stack } from "@mui/material";

import type { IuseuseFetchDashboardAdmin } from "../../hook/useFetchDashboardAdmin";
import HeadCard from "../modal/HeadCard";
import FacultyDashboard from "../modal/FacultyDashboard";
import ActivityTop from "../modal/ActivityTop";
import YearDashboard from "../modal/YearDashboard";
import FacultyDetail from "../modal/FacultyDetail";
import ActivityDetail from "../modal/ActivityDetail";

export interface IDetailDashboardProps {
    mastercontroller: IuseuseFetchDashboardAdmin;
}

const DetailDashboard: React.FC<IDetailDashboardProps> = ({
    mastercontroller,
}) => {
    const dashboard_data = mastercontroller.dashboard_data;
    const dashboard_Loading = mastercontroller.dashboard_Loading;

    if (dashboard_Loading) return <DashboardSkeleton />;

    if (!dashboard_data) return null;

    return (
        <>
            <HeadCard dashboard_data={dashboard_data} />
            <ActivityTop dashboard_data={dashboard_data} />
            {mastercontroller.year_count_Loading ? (
                <CardSkeleton variant="grid" />
            ) : (
                <YearDashboard dashboard_data={dashboard_data} />
            )}
            {mastercontroller.faculty_summary_Loading ? (
                <CardSkeleton variant="list" />
            ) : (
                <FacultyDetail dashboard_data={dashboard_data} />
            )}
            <FacultyDashboard
                dashboard_data={dashboard_data}
                facultyRankLoading={mastercontroller.faculty_rank_Loading}
                majorRankLoading={mastercontroller.major_rank_Loading}
            />
            {mastercontroller.activity_rank_Loading ? (
                <CardSkeleton variant="table" />
            ) : (
                <ActivityDetail dashboard_data={dashboard_data} />
            )}
            {/* <Year /> */}
        </>
    );
};

const CardSkeleton = ({ variant }: { variant: "grid" | "list" | "table" }) => {
    const rowCount = variant === "grid" ? 4 : 5;

    return (
        <Card sx={{ p: 3, borderRadius: 3, mt: 2 }}>
            <Skeleton width={variant === "table" ? "30%" : "40%"} height={32} />
            {variant === "grid" ? (
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    {Array.from({ length: rowCount }).map((_, index) => (
                        <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                            <Skeleton height={150} sx={{ borderRadius: 3 }} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                Array.from({ length: rowCount }).map((_, index) => (
                    <Box key={index} sx={{ mt: 1.5 }}>
                        <Skeleton height={64} sx={{ borderRadius: 2 }} />
                    </Box>
                ))
            )}
        </Card>
    );
};

export default DetailDashboard;

const DashboardSkeleton = () => {
    return (
        <Stack spacing={2} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                        <Card sx={{ p: 2, borderRadius: 3 }}>
                            <Skeleton width="50%" height={22} />
                            <Skeleton width="70%" height={42} />
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Card sx={{ p: 3, borderRadius: 3 }}>
                <Skeleton width="35%" height={32} />
                <Skeleton width="55%" height={28} />
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Grid key={index} size={{ xs: 12, sm: 6, md: 2 }}>
                            <Skeleton height={80} sx={{ borderRadius: 2 }} />
                        </Grid>
                    ))}
                </Grid>
            </Card>

            <Card sx={{ p: 3, borderRadius: 3 }}>
                <Skeleton width="30%" height={32} />
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                            <Skeleton height={150} sx={{ borderRadius: 3 }} />
                        </Grid>
                    ))}
                </Grid>
            </Card>

            <Card sx={{ p: 3, borderRadius: 3 }}>
                <Skeleton width="40%" height={32} />
                {Array.from({ length: 5 }).map((_, index) => (
                    <Box key={index} sx={{ mt: 1.5 }}>
                        <Skeleton height={64} sx={{ borderRadius: 2 }} />
                    </Box>
                ))}
            </Card>

            <Card sx={{ p: 3, borderRadius: 3 }}>
                <Skeleton width="40%" height={32} />
                {Array.from({ length: 5 }).map((_, index) => (
                    <Box key={index} sx={{ mt: 1.5 }}>
                        <Skeleton height={64} sx={{ borderRadius: 2 }} />
                    </Box>
                ))}
            </Card>
        </Stack>
    );
};
