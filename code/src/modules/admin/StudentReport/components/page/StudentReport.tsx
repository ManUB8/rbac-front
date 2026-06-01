import React from 'react';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Stack,
    Typography,
} from '@mui/material';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import type { IuseFetchStudentReport } from '../../hook/useFetchStudentReport';
import AvatarIcon from '../../../../../assets/image/av-lg.jpg';

export interface IStudentReportProps {
    mastercontroller: IuseFetchStudentReport;
}

const StatBox = ({
    label,
    value,
    color,
}: {
    label: string;
    value: number;
    color?: string;
}) => (
    <Box
        sx={{
            width: 140,
            height: 120,
            borderRadius: "16px",
            border: "1px solid",
            borderColor: "divider",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "background.paper",
        }}
    >
        <Typography sx={{ fontSize: 16, color: "text.secondary" }}>
            {label}
        </Typography>

        <Typography
            sx={{
                fontSize: 42,
                fontWeight: 800,
                lineHeight: 1.1,
                mt: 0.5,
                color: color || "text.primary",
            }}
        >
            {value}
        </Typography>
    </Box>
);

const StudentReport: React.FC<IStudentReportProps> = ({ mastercontroller }) => {
    const student = mastercontroller.report_data;

    if (!student) return null;

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: "18px",
                border: "1px solid",
                borderColor: "divider",
                mt: 3,
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 3,
                    }}
                >
                    {/* LEFT */}
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            alignItems: "flex-start",
                            flex: 1,
                            minWidth: 0,
                        }}
                    >
                        <Avatar
                            src={AvatarIcon}
                            alt={student.full_name}
                            sx={{
                                width: 80,
                                height: 80,
                                border: "3px solid",
                                borderColor: "divider",
                                flexShrink: 0,
                            }}
                        />

                        <Box>
                            <Typography
                                sx={{
                                    fontSize: 32,
                                    fontWeight: 800,
                                    lineHeight: 1.2,
                                }}
                            >
                                {student.full_name}
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 1,
                                    fontSize: 16,
                                    color: "text.secondary",
                                    fontWeight: 500,
                                }}
                            >
                                รหัสนิสิต: {student.student_code}
                            </Typography>

                            <Stack spacing={0.8} sx={{ mt: 1 }}>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{ alignItems: "center" }}
                                >
                                    <SchoolOutlinedIcon
                                        sx={{
                                            fontSize: 18,
                                            color: "text.secondary",
                                        }}
                                    />

                                    <Typography
                                        sx={{
                                            fontSize: 16,
                                            color: "text.secondary",
                                        }}
                                    >
                                        {student.faculty_name}
                                    </Typography>
                                </Stack>

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{ alignItems: "center" }}
                                >
                                    <AccountTreeOutlinedIcon
                                        sx={{
                                            fontSize: 18,
                                            color: "text.secondary",
                                        }}
                                    />

                                    <Typography
                                        sx={{
                                            fontSize: 16,
                                            color: "text.secondary",
                                        }}
                                    >
                                        {student.major_name}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                </Stack>

                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 3,
                        mt: 2,
                        flexWrap: "wrap",
                    }}
                >
                    <StatBox
                        label="กิจกรรม"
                        value={student.total_activity}
                        color="#2563eb" // blue
                    />

                    <StatBox
                        label="ชั่วโมงรวม"
                        value={student.total_hours}
                        color="#16a34a" // green
                    />

                    <StatBox
                        label="จิตอาสารวม"
                        value={student.total_volunteer_hours}
                        color="#9333ea" // purple
                    />

                    <StatBox
                        label="จิตอาสาที่ได้จริง"
                        value={student.total_earned_hours}
                        color="#f59e0b" // amber
                    />
                </Stack>
            </CardContent>
        </Card>
    );
};

export default StudentReport;