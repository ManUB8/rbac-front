import React, { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";

export interface IHeadStudentActivitiesProps { };

const HeadStudentActivities: React.FunctionComponent<IHeadStudentActivitiesProps> = props => {
    return (
        <>
            <Card sx={{ mb: 3, borderRadius: 3 }}>
                <CardContent
                    sx={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Box>
                        <Typography variant="h4" fontWeight={700}>
                            ลงทะเบียนเข้าร่วมกิจกรรม
                        </Typography>
                        <Typography color="text.secondary">
                            เลือกกิจกรรมและกรอกรหัสนิสิตเพื่อลงทะเบียน
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </>
    )
};

export default HeadStudentActivities;