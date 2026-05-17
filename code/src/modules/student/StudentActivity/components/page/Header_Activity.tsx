import { Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
export interface IHeader_ActivityProps { };
const Header_Activity: React.FunctionComponent<IHeader_ActivityProps> = props => {
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
    );
};
export default Header_Activity;