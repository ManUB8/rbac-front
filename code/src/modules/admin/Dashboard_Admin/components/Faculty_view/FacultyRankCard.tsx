import React from "react";
import {
    Box,
    Card,
    CardContent,
    Chip,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import type { IFacultyRankItem } from "../../interface/DashboardAdmin.interface";

export interface IFacultyRankCardProps {
    facultyRank: IFacultyRankItem[];
}

const FacultyRankCard: React.FC<IFacultyRankCardProps> = ({ facultyRank }) => {
    const columnSx = {
        student: {
            bgcolor: "rgba(124, 155, 255, 0.06)",
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
        <Card sx={{ height: "100%" }}>
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                    อันดับการเข้าร่วมตามคณะ
                </Typography>

                <TableContainer
                    sx={{
                        width: "100%",
                        overflowX: "auto",
                        WebkitOverflowScrolling: "touch",
                    }}
                >
                    <Table stickyHeader sx={{ minWidth: 1050 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 800 }}>อันดับ</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>คณะ</TableCell>

                                <TableCell align="right" sx={{ ...columnSx.student, fontWeight: 800 }}>
                                    นิสิตทั้งหมด
                                </TableCell>

                                <TableCell align="right" sx={{ ...columnSx.joined, fontWeight: 800 }}>
                                    เข้าร่วม
                                </TableCell>

                                <TableCell align="right" sx={{ ...columnSx.notJoined, fontWeight: 800 }}>
                                    ไม่เข้าร่วม
                                </TableCell>

                                <TableCell align="right" sx={{ ...columnSx.checkin, fontWeight: 800 }}>
                                    เช็คอิน
                                </TableCell>

                                <TableCell align="right" sx={{ ...columnSx.checkout, fontWeight: 800 }}>
                                    เช็คเอาท์
                                </TableCell>

                                <TableCell sx={{ ...columnSx.percent, minWidth: 180, fontWeight: 800 }}>
                                    % เข้าร่วม
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {facultyRank.map((item, index) => (
                                <TableRow key={item.faculty_id} hover>
                                    <TableCell>
                                        <Chip
                                            size="small"
                                            label={index + 1}
                                            color={
                                                index === 0 ? "warning" : index < 3 ? "primary" : "default"
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
                                        <Typography sx={{ fontWeight: 500 }} noWrap>
                                            {item.faculty_name}
                                        </Typography>
                                    </TableCell>

                                    <TableCell
                                        align="right"
                                        sx={{
                                            ...columnSx.student,
                                            fontWeight: 700,
                                        }}
                                    >
                                        {item.total_student}
                                    </TableCell>

                                    <TableCell align="right" sx={columnSx.joined}>
                                        {item.joined_count}
                                    </TableCell>

                                    <TableCell align="right" sx={columnSx.notJoined}>
                                        {item.not_joined_count}
                                    </TableCell>

                                    <TableCell align="right" sx={columnSx.checkin}>
                                        {item.checkin_count}
                                    </TableCell>

                                    <TableCell align="right" sx={columnSx.checkout}>
                                        {item.checkout_count}
                                    </TableCell>

                                    <TableCell sx={columnSx.percent}>
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
                                                    bgcolor: "rgba(168, 85, 247, 0.22)",

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

export default FacultyRankCard;