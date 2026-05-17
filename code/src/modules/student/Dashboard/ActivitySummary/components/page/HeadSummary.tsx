import React from 'react';
import type { IusFetcheActivityStudentCode } from '../../hook/useFetchActivitySummary';
import { Typography } from '@mui/material';

export interface IHeadSummaryProps {
    mastercontroller:IusFetcheActivityStudentCode
};

const HeadSummary: React.FunctionComponent<IHeadSummaryProps> = ({mastercontroller}) => {

    return (
        <>
            <Typography
                sx={{
                    fontSize: 24,
                    fontWeight: 800,
                }}
            >
                หน้าการเข้าร่วมกิจกรรม
            </Typography>

            <Typography
                sx={{
                    color: "text.secondary",
                    mb: 3,
                }}
            >
                กิจกรรมทั้งหมด
            </Typography>

        </>
    )
};

export default HeadSummary;