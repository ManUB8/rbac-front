import React from "react";
import type { IuseuseFetchDashboardAdmin } from "../../hook/useFetchDashboardAdmin";

import {
    Autocomplete,
    Card,
    CardContent,
    Box,
    Chip,
    Grid,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import { formatDateThai } from "../../../../../shared/components/Date-Time/DateAndTime";
import { Year_type } from "../../../Student_Manage/utils/student_option";

export interface IFilterDashboardProps {
    mastercontroller: IuseuseFetchDashboardAdmin;
}

const FilterDashboard: React.FC<IFilterDashboardProps> = ({
    mastercontroller,
}) => {
    const activity_filter = mastercontroller.activity_filter;

    const selectedActivity =
        mastercontroller.dashboard_data?.selected_activity || null;

    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    sx={{
                        mt: 2,
                        alignItems: "stretch",
                    }}
                >
                    {/* Selected Activity */}
                    <Card
                        variant="outlined"
                        sx={{
                            flex: 1,
                            minHeight: 120,
                            borderRadius: 2,
                            borderColor: "divider",
                            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
                        }}
                    >
                        <CardContent
                            sx={{
                                p: 2.5,
                            }}
                        >
                            <Typography
                                variant="caption"
                                sx={{
                                    color: "text.secondary",
                                    fontWeight: 600,
                                }}
                            >
                                กิจกรรมที่เลือก
                            </Typography>

                            <Typography
                                noWrap
                                sx={{
                                    mt: 1,
                                    fontSize: 20,
                                    fontWeight: 800,
                                }}
                            >
                                {selectedActivity?.activity_name ||
                                    "กิจกรรมทั้งหมด"}
                            </Typography>

                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{
                                    mt: 1.5,
                                    flexWrap: "wrap",
                                    gap: 1,
                                }}
                            >
                                {selectedActivity ? (
                                    <>
                                        <Chip
                                            size="small"
                                            label={formatDateThai(
                                                selectedActivity.activity_date
                                            )}
                                        />

                                        <Chip
                                            size="small"
                                            label={`${selectedActivity.start_time} - ${selectedActivity.end_time}`}
                                        />

                                        <Chip
                                            size="small"
                                            label={`${selectedActivity.hours} ชม.`}
                                        />
                                    </>
                                ) : (
                                    <Chip
                                        size="small"
                                        label="รวมทุกกิจกรรม"
                                    />
                                )}
                            </Stack>
                        </CardContent>
                    </Card>

                    {/* Filter */}
                    <Card
                        variant="outlined"
                        sx={{
                            flex: 1,
                            minHeight: 120,
                            borderRadius: 2,
                            borderColor: "divider",
                            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
                        }}
                    >
                        <CardContent
                            sx={{
                                p: 2.5,
                                height: "100%",
                                display: "flex",
                                gap: 2,
                                alignItems: "center",
                                flexDirection: { xs: "column", sm: "row" },
                            }}
                        >
                            <Box sx={{ flex: 1, width: "100%" }}>
                                <Autocomplete
                                    fullWidth
                                    options={activity_filter}
                                    getOptionLabel={(option) => option.name}
                                    value={
                                        activity_filter.find(
                                            (item) =>
                                                item.id ===
                                                mastercontroller.selectedId
                                        ) ?? null
                                    }
                                    onChange={(_, v) => {
                                        mastercontroller.setSelectedId(
                                            v?.id ?? 0
                                        );
                                    }}
                                    renderInput={(p) => (
                                        <TextField
                                            {...p}
                                            label="เลือกกิจกรรม"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </Box>

                            <Box sx={{ flex: 1, width: "100%" }}>
                                <Autocomplete
                                    fullWidth
                                    options={Year_type}
                                    getOptionLabel={(option) => option.label}
                                    value={
                                        Year_type.find(
                                            (item) =>
                                                item.id ===
                                                mastercontroller.yearStatus
                                        ) ?? null
                                    }
                                    onChange={(_, v) => {
                                        mastercontroller.setYearStatus(
                                            v?.id ?? ""
                                        );
                                    }}
                                    renderInput={(p) => (
                                        <TextField
                                            {...p}
                                            label="ชั้นปี"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default FilterDashboard;
