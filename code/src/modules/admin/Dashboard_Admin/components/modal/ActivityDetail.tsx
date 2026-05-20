import React from "react";

import {
    Box,
    Card,
    CardContent,
    LinearProgress,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import type { IActivityDashboardData } from "../../interface/DashboardAdmin.interface";
import { formatDateThai } from "../../../../../shared/components/Date-Time/DateAndTime";

export interface IActivityDetailProps {
    dashboard_data: IActivityDashboardData;
}

const ActivityDetail: React.FC<IActivityDetailProps> = ({ dashboard_data }) => {
    const activity_rank = dashboard_data.activity_rank;

    if (!activity_rank) return null;

    const columnSx = {
        total: {
            bgcolor: "rgba(124, 155, 255, 0.06)",
            fontWeight: 700,
        },
        joined: {
            color: "success.main",
            bgcolor: "rgba(34, 197, 94, 0.06)",
            fontWeight: 700,
        },
        notJoined: {
            color: "error.main",
            bgcolor: "rgba(239, 68, 68, 0.06)",
            fontWeight: 700,
        },
        checkin: {
            color: "info.main",
            bgcolor: "rgba(59, 130, 246, 0.06)",
            fontWeight: 700,
        },
        checkout: {
            color: "warning.main",
            bgcolor: "rgba(245, 158, 11, 0.06)",
            fontWeight: 700,
        },
        percent: {
            bgcolor: "rgba(168, 85, 247, 0.06)",
        },
    } as const;

    return (
        <Card
            variant="outlined"
            sx={{
                mt: 2,
                overflow: "hidden",
            }}
        >
            <CardContent>
                <Typography
                    sx={{
                        fontSize: 18,
                        fontWeight: 800,
                        mb: 2,
                    }}
                >
                    อันดับกิจกรรม (Top 10)
                </Typography>

                <TableContainer
                    sx={{
                        width: "100%",
                        overflowX: "auto",
                        WebkitOverflowScrolling: "touch",
                    }}
                >
                    <Table stickyHeader sx={{ minWidth: 1150 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 800 }}>อันดับ</TableCell>
                                <TableCell sx={{ fontWeight: 800, minWidth: 260 }}>
                                    ชื่อกิจกรรม
                                </TableCell>

                                <TableCell
                                    sx={{
                                        minWidth: 130,
                                        fontWeight: 800,
                                    }}
                                >
                                    วันที่
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        ...columnSx.total,
                                        fontWeight: 800,
                                    }}
                                >
                                    ลงทะเบียน
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        ...columnSx.joined,
                                        fontWeight: 800,
                                    }}
                                >
                                    เข้าร่วม
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        ...columnSx.notJoined,
                                        fontWeight: 800,
                                    }}
                                >
                                    ไม่เข้าร่วม
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        ...columnSx.checkin,
                                        fontWeight: 800,
                                    }}
                                >
                                    เช็คอิน
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        ...columnSx.checkout,
                                        fontWeight: 800,
                                    }}
                                >
                                    เช็คเอาท์
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        ...columnSx.percent,
                                        minWidth: 180,
                                        fontWeight: 800,
                                    }}
                                >
                                    % เข้าร่วม
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {activity_rank.slice(0, 10).map((item, index) => (
                                <TableRow key={item.activity_id} hover>
                                    <TableCell>
                                        <RankBadge index={index} />
                                    </TableCell>

                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: 15,
                                            }}
                                        >
                                            {item.activity_name}
                                        </Typography>
                                    </TableCell>

                                    <TableCell >
                                        <Typography
                                            sx={{
                                                fontSize: 13,
                                                color: "text.secondary",
                                                minWidth: 130
                                            }}
                                        >
                                            {formatDateThai(item.activity_date)}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="center" sx={columnSx.total}>
                                        {item.total_count}
                                    </TableCell>

                                    <TableCell align="center" sx={columnSx.joined}>
                                        {item.joined_count}
                                    </TableCell>

                                    <TableCell align="center" sx={columnSx.notJoined}>
                                        {item.not_joined_count}
                                    </TableCell>

                                    <TableCell align="center" sx={columnSx.checkin}>
                                        {item.checkin_count}
                                    </TableCell>

                                    <TableCell align="center" sx={columnSx.checkout}>
                                        {item.checkout_count}
                                    </TableCell>

                                    <TableCell align="center" sx={columnSx.percent}>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            sx={{
                                                alignItems: "center",
                                            }}
                                        >
                                            <LinearProgress
                                                variant="determinate"
                                                value={Math.min(item.join_rate_percent, 100)}
                                                sx={{
                                                    flex: 1,
                                                    height: 8,
                                                    borderRadius: 999,
                                                    bgcolor: "rgba(168, 85, 247, 0.22)",

                                                    "& .MuiLinearProgress-bar": {
                                                        borderRadius: 999,
                                                        bgcolor:
                                                            item.join_rate_percent > 50
                                                                ? "success.main"
                                                                : item.join_rate_percent > 0
                                                                    ? "error.main"
                                                                    : "#b4adea",
                                                    },
                                                }}
                                            />

                                            <Typography
                                                sx={{
                                                    minWidth: 60,
                                                    fontSize: 14,
                                                    fontWeight: 700,
                                                    color:
                                                        item.join_rate_percent > 50
                                                            ? "success.main"
                                                            : "error.main",
                                                }}
                                            >
                                                {item.join_rate_percent.toFixed(1)}%
                                            </Typography>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};

export default ActivityDetail;

const RankBadge = ({ index }: { index: number }) => {
    return (
        <Box
            sx={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 13,
                bgcolor:
                    index === 0 ? "warning.main" : index < 3 ? "primary.main" : "grey.200",
                color: index < 3 ? "#fff" : "text.primary",
            }}
        >
            {index + 1}
        </Box>
    );
};