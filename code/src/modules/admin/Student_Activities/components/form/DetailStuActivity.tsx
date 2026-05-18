import React from "react";
import {
    Avatar,
    Card,
    CardContent,
    Chip,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import type { IStudentActivityCheckItem } from "../../interface/StudentActivities.interface";
import { Check_type } from "../../../ActivityManage/utils/activity_option";
import { formatDateThai } from "../../../../../shared/components/Date-Time/DateAndTime";

export interface IDetailStuActivityProps {
    student: IStudentActivityCheckItem | null;
}

const DetailStuActivity: React.FC<IDetailStuActivityProps> = ({ student }) => {
    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: "12px",
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                height: "100%",
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    ข้อมูลนิสิตล่าสุด
                </Typography>

                {!student ? (
                    <Typography sx={{ mt: 3 }} color="text.secondary">
                        ยังไม่มีข้อมูลนิสิต
                    </Typography>
                ) : (
                    <Stack spacing={2} sx={{ mt: 3, alignItems: "center" }}>
                        <Avatar
                            sx={{
                                width: 96,
                                height: 96,
                                fontSize: 36,
                                fontWeight: 800,
                                bgcolor: "primary.main",
                            }}
                        >
                            {student.full_name?.charAt(0) || "?"}
                        </Avatar>

                        <Stack spacing={0.8} sx={{ alignItems: "center" }}>
                            <Typography sx={{ fontWeight: 800, fontSize: 20 }}>
                                {student.full_name}
                            </Typography>
                            <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
                                {student.student_code}
                            </Typography>

                            <Chip
                                color="success"
                                label={student.attendance_status}
                                size="medium"
                                sx={{ fontWeight: 700 }}
                            />
                        </Stack>

                        <Divider flexItem />

                        <Stack spacing={0.8} sx={{ width: "100%" }}>
                            <InfoRow label="กิจกรรม" value={student.activity_name} />
                            <InfoRow label="วันที่" value={formatDateThai(student.activity_date)} />
                            <InfoRow label="เวลา" value={student.activity_time_text} />
                            <InfoRow label="สถานที่" value={student.location || "-"} />
                            <InfoRow
                                label="ประเภท"
                                value={
                                    Check_type.find((e) => e.id === student.check_type)?.label || "-"
                                }
                            />
                        </Stack>
                    </Stack>
                )}
            </CardContent>
        </Card>
    );
};

export default DetailStuActivity;

interface IInfoRowProps {
    label: string;
    value: string;
}
const InfoRow: React.FC<IInfoRowProps> = ({ label, value }) => {
    return (
        <Stack
            sx={{
                flexDirection: "row",
                gap: 1,
                justifyContent: "space-between",
                alignItems: "flex-start",
            }}
        >
            <Typography
                color="text.secondary"
                sx={{ fontSize: 14 }}
            >
                {label}
            </Typography>

            <Typography
                sx={{
                    fontWeight: 700,
                    fontSize: 14,
                    textAlign: "right",
                }}
            >
                {value}
            </Typography>
        </Stack>
    );
};