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
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import type { IMajorRankItem } from "../../interface/DashboardAdmin.interface";

export interface IMajorRankCardProps {
    majorRank: IMajorRankItem[];
}

const MajorRankCard: React.FC<IMajorRankCardProps> = ({ majorRank }) => {
    return (
        <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
                <Typography sx={{ fontSize: 18, fontWeight: 800, mb: 2 }}>
                    อันดับการเข้าร่วมตามสาขา
                </Typography>

                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>อันดับ</TableCell>
                            <TableCell>สาขา</TableCell>
                            <TableCell>คณะ</TableCell>
                            <TableCell align="center">นิสิต</TableCell>
                            <TableCell align="center">เข้าร่วม</TableCell>
                            <TableCell align="center">ไม่เข้าร่วม</TableCell>
                            <TableCell align="center">เช็คอิน</TableCell>
                            <TableCell align="center">เช็คเอาท์</TableCell>
                            <TableCell align="center">% เข้าร่วม</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {majorRank.map((item, index) => (
                            <TableRow key={item.major_id}>
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

                                <TableCell align="center" sx={{ color: "success.main", fontWeight: 700 }}>
                                    {item.joined_count}
                                </TableCell>

                                <TableCell align="center" sx={{ color: "error.main", fontWeight: 700 }}>
                                    {item.not_joined_count}
                                </TableCell>

                                <TableCell align="center">{item.checkin_count}</TableCell>
                                <TableCell align="center">{item.checkout_count}</TableCell>

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
            </CardContent>
        </Card>
    );
};

export default MajorRankCard;

const RankBadge = ({ index }: { index: number }) => {
    return (
        <Box
            sx={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 13,
                bgcolor: index === 0 ? "warning.main" : index < 3 ? "primary.main" : "grey.200",
                color: index < 3 ? "#fff" : "text.primary",
            }}
        >
            {index + 1}
        </Box>
    );
};