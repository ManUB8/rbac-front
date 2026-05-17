import React from 'react';
import type { IActivityDashboardData, ICardItem } from '../../interface/DashboardAdmin.interface';
import {
    Autocomplete,
    Box,
    Card,
    CardContent,
    Chip,
    Grid,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import { cardSx, iconBoxSx } from '../../utils/them.sx';

export interface IHeadCardProps {
    dashboard_data: IActivityDashboardData
};

const HeadCard: React.FunctionComponent<IHeadCardProps> = ({
    dashboard_data
}) => {
    const cardData: ICardItem[] = [
        {
            title: 'กิจกรรมทั้งหมด',
            value: dashboard_data.activity_count,
            color: '#4F46E5',
            icon: <LocalActivityOutlinedIcon />
        },
        {
            title: 'นิสิตทั้งหมด',
            value: dashboard_data.student_count_all,
            color: '#0EA5E9',
            icon: <Groups2RoundedIcon />
        },
        {
            title: 'เข้าร่วม',
            value: dashboard_data.joined_count,
            color: '#16A34A',
            icon: <CheckCircleRoundedIcon />
        },
        {
            title: 'ไม่เข้าร่วม',
            value: dashboard_data.not_joined_count,
            color: '#DC2626',
            icon: <CancelRoundedIcon />
        },
        {
            title: 'เช็คอิน',
            value: dashboard_data.checkin_count,
            color: '#F59E0B',
            icon: <LoginRoundedIcon />
        },
        {
            title: 'เช็คเอาท์',
            value: dashboard_data.checkout_count,
            color: '#7C3AED',
            icon: <LogoutRoundedIcon />
        },
        {
            title: 'ชั่วโมงรวม',
            value: `${dashboard_data.hours_count_all} ชม.`,
            color: '#EA580C',
            icon: <AccessTimeFilledRoundedIcon />
        },
    ];

    return (
        <>
            <Grid container spacing={2} sx={{marginTop:2}}>
                {cardData.map((item, index) => (
                    <Grid
                        key={index}
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 4,
                            lg: 3,
                        }}
                    >
                        <Card sx={cardSx}>
                            <Box
                                sx={{
                                    p: 2.2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <Box sx={iconBoxSx(item.color)}>
                                    {item.icon}
                                </Box>

                                <Stack spacing={0.3}>
                                    <Typography
                                        sx={{
                                            fontSize: 16,
                                            color: '#6B7280',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {item.title}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: 32,
                                            fontWeight: 700,
                                            lineHeight: 1,
                                            color: '#111827',
                                        }}
                                    >
                                        {item.value}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
};

export default HeadCard;