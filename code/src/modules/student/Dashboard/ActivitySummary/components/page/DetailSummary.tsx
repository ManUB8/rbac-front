import React from "react";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Grid,
    Stack,
    Typography,
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import type { IusFetcheActivityStudentCode } from "../../hook/useFetchActivitySummary";

export interface IDetailSummaryProps {
    mastercontroller: IusFetcheActivityStudentCode;
}

const DetailSummary: React.FC<IDetailSummaryProps> = ({ mastercontroller }) => {
    const activities_data = mastercontroller.dashboard_code?.activities ?? [];

    return (
        <Box sx={{ mt: 2 }}>
            <Typography
                sx={{
                    fontSize: 22,
                    fontWeight: 800,
                    mb: 2,
                }}
            >
                ประวัติการเข้าร่วมกิจกรรม
            </Typography>

            <Grid container spacing={2}>
                {activities_data.map((item) => {
                    const isJoined = item.attendance_status === "เข้าร่วม";

                    return (
                        <Grid key={item.activity_id} size={{ xs: 12, sm: 6, md: 4 }}>
                            <Card sx={{ height: "100%" }}>
                                <CardMedia
                                    component="img"
                                    image={item.activity_img || ""}
                                    alt={item.activity_name}
                                    sx={{
                                        height: 160,
                                        objectFit: "cover",
                                        bgcolor: "grey.200",
                                    }}
                                />

                                <CardContent>
                                    <Chip
                                        size="small"
                                        icon={isJoined ? <CheckCircleIcon /> : <CancelIcon />}
                                        label={item.attendance_status}
                                        color={isJoined ? "success" : "error"}
                                        sx={{ fontWeight: 700, mb: 1 }}
                                    />

                                    <Typography
                                        sx={{
                                            fontSize: 18,
                                            fontWeight: 800,
                                            mb: 1,
                                        }}
                                    >
                                        {item.activity_name}
                                    </Typography>

                                    <InfoLine
                                        icon={<CalendarMonthIcon />}
                                        text={item.activity_date}
                                    />

                                    <InfoLine
                                        icon={<AccessTimeIcon />}
                                        text={`${item.start_time} - ${item.end_time} น. (${item.hours} ชั่วโมง)`}
                                    />

                                    <InfoLine
                                        icon={<PlaceIcon />}
                                        text={item.location || "-"}
                                    />

                                    <Stack spacing={0.5} sx={{ mt: 1.5 }}>
                                        <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                                            เช็คอิน: {formatUnixTime(item.checkin_at)}
                                        </Typography>

                                        <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                                            เช็คเอาท์: {formatUnixTime(item.checkout_at)}
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default DetailSummary;

const InfoLine = ({
    icon,
    text,
}: {
    icon: React.ReactNode;
    text: string;
}) => {
    return (
        <Stack
            direction="row"
            spacing={1}
            sx={{
                alignItems: "center",
                mb: 0.6,
                color: "text.secondary",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    "& svg": {
                        fontSize: 16,
                    },
                }}
            >
                {icon}
            </Box>

            <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
                {text}
            </Typography>
        </Stack>
    );
};

const formatUnixTime = (value: number | null) => {
    if (!value) return "-";

    return new Date(value * 1000).toLocaleString("th-TH", {
        dateStyle: "medium",
        timeStyle: "short",
    });
};