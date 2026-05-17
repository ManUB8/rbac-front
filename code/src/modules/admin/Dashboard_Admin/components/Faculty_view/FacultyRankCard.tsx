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
    return (
        <Card sx={{ height: "100%" }}>
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                    อันดับการเข้าร่วมตามคณะ
                </Typography>

                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>อันดับ</TableCell>
                                <TableCell>คณะ</TableCell>
                                <TableCell align="right">นิสิตทั้งหมด</TableCell>
                                <TableCell align="right">เข้าร่วม</TableCell>
                                <TableCell align="right">ไม่เข้าร่วม</TableCell>
                                <TableCell align="right">เช็คอิน</TableCell>
                                <TableCell align="right">เช็คเอาท์</TableCell>
                                <TableCell sx={{ minWidth: 160 }}>% เข้าร่วม</TableCell>
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
                                        <Typography sx={{ fontWeight: 500 }} noWrap>
                                            {item.faculty_name}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="right">{item.total_student}</TableCell>

                                    <TableCell
                                        align="right"
                                        sx={{ color: "success.main", fontWeight: 700 }}
                                    >
                                        {item.joined_count}
                                    </TableCell>

                                    <TableCell
                                        align="right"
                                        sx={{ color: "error.main", fontWeight: 700 }}
                                    >
                                        {item.not_joined_count}
                                    </TableCell>

                                    <TableCell align="right">{item.checkin_count}</TableCell>

                                    <TableCell align="right">{item.checkout_count}</TableCell>

                                    <TableCell>
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

export default FacultyRankCard;