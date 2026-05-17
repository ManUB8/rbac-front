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
            <Typography
                sx={{
                    fontSize: 24,
                    fontWeight: 800,
                }}
            >
                กิจกรรมทั้งหมด
            </Typography>

            <Typography
                sx={{
                    color: "text.secondary",
                    mb: 3,
                }}
            >
                กิจกรรมที่เปิดให้เข้าร่วม
            </Typography>

        </>
    )
};

export default HeadStudentActivities;