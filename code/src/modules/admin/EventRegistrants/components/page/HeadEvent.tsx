import React, { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";

export interface IHeadEventProps { };

const HeadEvent: React.FunctionComponent<IHeadEventProps> = props => {
    return (
        <>
            <Typography
                sx={{
                    fontSize: 24,
                    fontWeight: 800,
                }}
            >
                {"ผู้ลงทะเบียนกิจกรรม"}
            </Typography>

            <Typography
                sx={{
                    color: "text.secondary",
                    mb: 3,
                }}
            >
                {"จัดการรายชื่อนิสิตในแต่ละกิจกรรม"}
            </Typography>
        </>
    )
};

export default HeadEvent;