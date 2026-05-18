import React from "react";
import {
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import type { IuseFetchStudentReport } from "../../hook/useFetchStudentReport";
import { formatDateTimeThai } from "../../../../../shared/components/Date-Time/DateAndTime";

export interface IDetailStudentReportProps {
    mastercontroller: IuseFetchStudentReport;
}


const getCheckTypeText = (checkType: string) => {
    if (checkType === "checkin_checkout") return "เช็คอิน + เช็คเอาท์";
    if (checkType === "checkin_only") return "เช็คอิน";
    return "-";
};

const DetailStudentReport: React.FC<IDetailStudentReportProps> = ({
    mastercontroller,
}) => {
    const student = mastercontroller.report_data;
    const activityList = student?.activity

    return (
        <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                {activityList?.map((item) => {
                    const isJoined = item.attendance_status === "เข้าร่วม";

                    return (
                        <Grid key={item.student_activity_id} size={{ xs: 12, md: 6 }}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: "100%",
                                    borderRadius: "14px",
                                    border: "1px solid",
                                    borderColor: "divider",
                                    bgcolor: "#fff",
                                }}
                            >
                                <CardContent sx={{ p: 2 }}>
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        sx={{
                                            justifyContent: "space-between",
                                            alignItems: "flex-start",
                                        }}
                                    >
                                        <Box>
                                            <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
                                                {item.activity_name}
                                            </Typography>

                                            <Typography sx={{ fontSize: 14, color: "text.secondary", mt: 0.3 }}>
                                                {item.activity_date} • {item.location}
                                            </Typography>
                                        </Box>

                                        <Chip
                                            label={
                                                isJoined
                                                    ? "เข้าร่วมแล้ว"
                                                    : item.registered_at
                                                        ? "ลงทะเบียนแล้ว"
                                                        : "ยังไม่เข้าร่วม"
                                            }
                                            size="small"
                                            sx={{
                                                fontWeight: 700,
                                                color: "#fff",
                                                bgcolor: isJoined ? "#16a34a" : "#4f46e5",
                                                borderRadius: "999px",
                                            }}
                                        />
                                    </Stack>

                                    <Divider sx={{ my: 2 }} />

                                    <Grid container spacing={2}>
                                        <Grid size={6}>
                                            <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                                                เช็คอิน
                                            </Typography>

                                            <Typography sx={{ fontWeight: 700 }}>
                                                {formatDateTimeThai(item.checkin_at)}
                                            </Typography>
                                        </Grid>

                                        <Grid size={6}>
                                            <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                                                เช็คเอาท์
                                            </Typography>
                                           <Typography sx={{ fontWeight: 700 }}>
                                                {formatDateTimeThai(item.checkout_at)}
                                            </Typography>
                                        </Grid>

                                        <Grid size={6}>
                                            <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                                                ชั่วโมงที่ได้
                                            </Typography>
                                             <Typography sx={{ fontWeight: 700 }}>
                                                {isJoined ? `${item.hours} ชม.` : "-"}
                                            </Typography>
                                        </Grid>

                                        <Grid size={6}>
                                            <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                                                ประเภทเช็ค
                                            </Typography>
                                             <Typography sx={{ fontWeight: 700 }}>
                                                {getCheckTypeText(item.check_type)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default DetailStudentReport;