import React, { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";

export interface IHeadStudentActivitiesPhoneProps { };

const HeadStudentActivitiesPhone: React.FunctionComponent<IHeadStudentActivitiesPhoneProps> = props => {
    return (
        <>
            <Typography
                sx={{
                    fontSize: 24,
                    fontWeight: 800,
                }}
            >
                {"เช็คอิน / เช็คเอาท์"}
            </Typography>

            <Typography
                sx={{
                    color: "text.secondary",
                    mb: 3,
                }}
            >
                {"สแกน QR หรือกรอกรหัสนิสิต"}
            </Typography>

        </>
    )
};

export default HeadStudentActivitiesPhone;