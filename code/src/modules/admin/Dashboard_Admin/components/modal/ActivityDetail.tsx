import React from "react";

import {
    Box,
    Card,
    CardContent,
    Chip,
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

const ActivityDetail: React.FC<IActivityDetailProps> = ({
    dashboard_data,
}) => {
    const activity_rank = dashboard_data.activity_rank;

    if (!activity_rank) return null;

    return (
        <Card
            variant="outlined"
            sx={{
                mt: 2,
                borderRadius: 3,
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

                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>อันดับ</TableCell>

                                <TableCell>ชื่อกิจกรรม</TableCell>

                                <TableCell
                                    sx={{
                                        minWidth: 130,
                                    }}
                                >
                                    {"วันที่"}
                                </TableCell>

                                <TableCell align="center">
                                    ลงทะเบียน
                                </TableCell>

                                <TableCell align="center">
                                    เข้าร่วม
                                </TableCell>

                                <TableCell align="center">
                                    ไม่เข้าร่วม
                                </TableCell>

                                <TableCell align="center">
                                    เช็คอิน
                                </TableCell>

                                <TableCell align="center">
                                    เช็คเอาท์
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        minWidth: 160,
                                    }}
                                >
                                    % เข้าร่วม
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {activity_rank
                                .slice(0, 10)
                                .map((item, index) => (
                                    <TableRow
                                        key={item.activity_id}
                                        hover
                                    >
                                        {/* Rank */}
                                        <TableCell>
                                            <RankBadge index={index} />
                                        </TableCell>

                                        {/* Name */}
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

                                        {/* Date */}
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    fontSize: 13,
                                                    color: "text.secondary",
                                                }}
                                            >
                                                {formatDateThai(
                                                    item.activity_date
                                                )}
                                            </Typography>
                                        </TableCell>

                                        {/* Total */}
                                        <TableCell align="center">
                                            {item.total_count}
                                        </TableCell>

                                        {/* Joined */}
                                        <TableCell
                                            align="center"
                                            sx={{
                                                color: "success.main",
                                                fontWeight: 700,
                                            }}
                                        >
                                            {item.joined_count}
                                        </TableCell>

                                        {/* Not joined */}
                                        <TableCell
                                            align="center"
                                            sx={{
                                                color: "error.main",
                                                fontWeight: 700,
                                            }}
                                        >
                                            {item.not_joined_count}
                                        </TableCell>

                                        {/* Checkin */}
                                        <TableCell align="center">
                                            {item.checkin_count}
                                        </TableCell>

                                        {/* Checkout */}
                                        <TableCell align="center">
                                            {item.checkout_count}
                                        </TableCell>

                                        {/* Percent */}
                                        <TableCell
                                            align="center"
                                            sx={{
                                                minWidth: 180,
                                            }}
                                        >
                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                sx={{
                                                    alignItems: "center",
                                                }}
                                            >
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={
                                                        item.join_rate_percent
                                                    }
                                                    sx={{
                                                        flex: 1,
                                                        height: 8,
                                                        borderRadius: 999,
                                                        bgcolor:
                                                            "rgba(99,102,241,0.18)",

                                                        "& .MuiLinearProgress-bar":
                                                        {
                                                            borderRadius: 999,
                                                            bgcolor:
                                                                item.join_rate_percent >
                                                                    50
                                                                    ? "success.main"
                                                                    : item.join_rate_percent >
                                                                        0
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
                                                            item.join_rate_percent >
                                                                50
                                                                ? "success.main"
                                                                : item.join_rate_percent >
                                                                    0
                                                                    ? "error.main"
                                                                    : "error.main",
                                                    }}
                                                >
                                                    {item.join_rate_percent.toFixed(
                                                        1
                                                    )}
                                                    %
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

const RankBadge = ({
    index,
}: {
    index: number;
}) => {
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
                    index === 0
                        ? "warning.main"
                        : index < 3
                            ? "primary.main"
                            : "grey.200",

                color:
                    index < 3
                        ? "#fff"
                        : "text.primary",
            }}
        >
            {index + 1}
        </Box>
    );
};