import {
    Box,
    Container,
    Stack,
    Typography,
    Card,
    CardMedia,
} from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import React from 'react';
import type { IuseActivityFetch } from "../../hook/useActivityFetch";
export interface IInfo_ActivityProps { 
    Master_Activity : IuseActivityFetch
};

const iconSx = {
    fontSize: 20,
    color: "#2563eb",
}
const Info_Activity: React.FunctionComponent<IInfo_ActivityProps> = ({ 
    Master_Activity
}) => {

return (<>
    <Box
        sx={{
            minHeight: "100vh",
            backgroundColor: "#eef2f7",
            py: 3,
        }}
    >
        <Container maxWidth="lg">
            <Stack spacing={2.5}>
                {Master_Activity.Activity_data?.map((activity) => (
                    <Card
                        key={activity.activity_id}
                        elevation={0}
                        sx={{
                            borderRadius: "18px",
                            overflow: "hidden",
                            border: "1px solid #d7dee8",
                            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.05)",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                minHeight: 220,
                            }}
                        >
                            {/* Image */}
                            <CardMedia
                                component="img"
                                image={activity.activity_img}
                                alt={activity.activity_name}
                                sx={{
                                    width: { xs: "100%", md: 190 },
                                    height: { xs: 220, md: "auto" },
                                    objectFit: "cover",
                                    flexShrink: 0,
                                }}
                            />

                            {/* Content */}
                            <Box
                                sx={{
                                    flex: 1,
                                    px: 2.5,
                                    py: 2.5,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    gap: 2,
                                }}
                            >
                                <Box sx={{ flex: 1 }}>
                                    <Typography
                                        sx={{
                                            fontSize: "2rem",
                                            fontWeight: 800,
                                            color: "#0f172a",
                                            lineHeight: 1.25,
                                            mb: 1,
                                        }}
                                    >
                                        {activity.activity_name}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: "1rem",
                                            color: "#475569",
                                            mb: 2,
                                        }}
                                    >
                                        {activity.description}
                                    </Typography>

                                    <Stack spacing={1.2}>
                                        <Stack
                                            direction="row"
                                            spacing={1.2}
                                            alignItems="center"
                                        >
                                            <CalendarMonthOutlinedIcon sx={iconSx} />
                                            <Typography
                                                sx={{ fontSize: "1rem", color: "#334155" }}
                                            >
                                                {activity.activity_date}
                                            </Typography>
                                        </Stack>

                                        <Stack
                                            direction="row"
                                            spacing={1.2}
                                            alignItems="center"
                                        >
                                            <AccessTimeOutlinedIcon sx={iconSx} />
                                            <Typography
                                                sx={{ fontSize: "1rem", color: "#334155" }}
                                            >
                                                {activity.start_time} {"-"} {activity.end_time}                                            
                                                </Typography>
                                        </Stack>

                                        <Stack
                                            direction="row"
                                            spacing={1.2}
                                            alignItems="center"
                                        >
                                            <LocationOnOutlinedIcon sx={iconSx} />
                                            <Typography
                                                sx={{ fontSize: "1rem", color: "#334155" }}
                                            >
                                                {activity.location}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Box>
                        </Box>
                    </Card>
                ))}
            </Stack>
        </Container>
    </Box>
</>);
};
export default Info_Activity;