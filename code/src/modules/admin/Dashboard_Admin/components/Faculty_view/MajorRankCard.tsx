import React from "react";
import {
    Box,
    Card,
    CardContent,
    Chip,
    LinearProgress,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import type { IMajorRankItem } from "../../interface/DashboardAdmin.interface";

export interface IMajorRankCardProps {
    majorRank: IMajorRankItem[];
    loading?: boolean;
}

const MajorRankCard: React.FC<IMajorRankCardProps> = ({ majorRank, loading = false }) => {
    return (
        <Card sx={{ height: "100%" }}>
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                    อันดับการเข้าร่วมตามสาขา
                </Typography>
                <TableContainer
                    sx={{
                        width: "100%",
                        overflowX: "auto",
                        WebkitOverflowScrolling: "touch",
                    }}
                >
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow
                                hover
                                sx={{
                                    "&:hover td": {
                                        bgcolor: "action.hover",
                                    },
                                }}
                            >
                                <TableCell>อันดับ</TableCell>
                                <TableCell>สาขา</TableCell>
                                <TableCell>คณะ</TableCell>
                                <TableCell align="center">นิสิต</TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        color: "success.main",
                                        fontWeight: 800,
                                        bgcolor: "rgba(34,197,94,0.08)",
                                    }}
                                >
                                    เข้าร่วม
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        color: "error.main",
                                        fontWeight: 800,
                                        bgcolor: "rgba(239,68,68,0.05)"
                                    }}
                                >
                                    ไม่เข้าร่วม
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        color: "info.main",
                                        fontWeight: 800,
                                        bgcolor: "rgba(59,130,246,0.05)"
                                    }}
                                >
                                    เช็คอิน
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        color: "warning.main",
                                        fontWeight: 800,
                                        bgcolor: "rgba(245,158,11,0.05)"
                                    }}
                                >
                                    เช็คเอาท์
                                </TableCell>
                                <TableCell align="center">% เข้าร่วม</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {loading
                                ? Array.from({ length: 5 }).map((_, index) => (
                                    <TableRow key={index}>
                                        {Array.from({ length: 9 }).map((__, cellIndex) => (
                                            <TableCell key={cellIndex}>
                                                <Skeleton height={28} />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                                : majorRank.map((item, index) => (
                                    <TableRow
                                        key={item.major_id}
                                        hover
                                        sx={{
                                            "&:hover td": {
                                                bgcolor: "action.hover",
                                            },
                                        }}>
                                        <TableCell>
                                            <Chip
                                                size="small"
                                                label={index + 1}
                                                color={
                                                    index === 0
                                                        ? "warning"
                                                        : index < 3
                                                            ? "primary"
                                                            : "default"
                                                }
                                                sx={{
                                                    fontWeight: 600,
                                                    borderRadius: "50%",
                                                    width: 34,
                                                    height: 34,
                                                }}
                                            />
                                        </TableCell>

                                        <TableCell>
                                            <Typography sx={{ fontWeight: 500 }}>
                                                {item.major_name}
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.faculty_name}
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="center">{item.total_student}</TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{
                                                color: "success.main",
                                                fontWeight: 700,
                                                bgcolor: "rgba(34,197,94,0.04)",
                                            }}
                                        >
                                            {item.joined_count}
                                        </TableCell>

                                        <TableCell
                                            align="center"
                                            sx={{
                                                color: "error.main",
                                                fontWeight: 700,
                                                bgcolor: "rgba(239,68,68,0.05)"
                                            }}
                                        >
                                            {item.not_joined_count}
                                        </TableCell>

                                        <TableCell
                                            align="center"
                                            sx={{
                                                color: "info.main",
                                                fontWeight: 700,
                                                bgcolor: "rgba(59,130,246,0.05)"
                                            }}
                                        >
                                            {item.checkin_count}
                                        </TableCell>

                                        <TableCell
                                            align="center"
                                            sx={{
                                                color: "warning.main",
                                                fontWeight: 700,
                                                bgcolor: "rgba(245,158,11,0.05)"
                                            }}
                                        >
                                            {item.checkout_count}
                                        </TableCell>

                                        <TableCell sx={{ minWidth: 160 }}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1,
                                                }}
                                            >
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={Math.min(item.join_rate_percent, 100)}
                                                    sx={{
                                                        flex: 1,
                                                        height: 8,
                                                        borderRadius: 4,
                                                        bgcolor: "#c7bdf9",

                                                        "& .MuiLinearProgress-bar": {
                                                            bgcolor: "error.main",
                                                        },
                                                    }}
                                                />

                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        minWidth: 50,
                                                        fontWeight: 700,
                                                        color: "error.main",
                                                    }}
                                                >
                                                    {item.join_rate_percent}%
                                                </Typography>
                                            </Box>
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

export default MajorRankCard;
