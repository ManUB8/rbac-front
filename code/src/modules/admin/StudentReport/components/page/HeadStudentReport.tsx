import React from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";
export interface IHeadStudentReportProps { };

const HeadStudentReport: React.FunctionComponent<IHeadStudentReportProps> = props => {
    return (
        <>
            <Typography
                sx={{
                    fontSize: 24,
                    fontWeight: 800,
                }}
            >
                {"รายงานกิจกรรมของนิสิต"}
            </Typography>

            <Typography
                sx={{
                    color: "text.secondary",
                    mb: 3,
                }}
            >
                {"ค้นหาและดูประวัติกิจกรรมของนิสิตรายบุคคล"}
            </Typography>
        </>
    )
};

export default HeadStudentReport;