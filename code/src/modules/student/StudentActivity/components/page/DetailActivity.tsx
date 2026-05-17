import React from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";

import {
    useFetcheRegisterStudentActivity,
    type IuseFetcheActivityStudentCode,
} from "../../hook/useActivityFetch";

export interface IDetailActivityProps {
    mastercontroller: IuseFetcheActivityStudentCode;
}

const DetailActivity: React.FC<IDetailActivityProps> = ({ mastercontroller }) => {
    const activity_data = mastercontroller.activity_data ?? [];
    const activity_code = mastercontroller.activity_code;

    const { onSubmitForm, loadingForm } = useFetcheRegisterStudentActivity();

    return (
        <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
                {activity_data.map((item) => {
                    const canRegister =
                        item.require_registration &&
                        !item.is_registered &&
                        !item.is_full;

                    return (
                        <Grid key={item.activity_id} size={{ xs: 12, sm: 6, md: 4 }}>
                            <Card
                                sx={{
                                    height: "100%",
                                    overflow: "hidden",
                                    display: "flex",
                                    flexDirection: "column",
                                    boxShadow: "0 6px 18px rgba(15, 23, 42, 0.08)",
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={item.activity_img || ""}
                                    alt={item.activity_name}
                                    sx={{
                                        height: 170,
                                        objectFit: "cover",
                                        bgcolor: "grey.200",
                                    }}
                                />

                                <CardContent
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        flex: 1,
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        sx={{
                                            flexWrap: "wrap",
                                            gap: 1,
                                            mb: 1,
                                        }}
                                    >
                                        <Chip
                                            size="small"
                                            label={getCheckTypeLabel(item.check_type)}
                                            sx={{
                                                fontWeight: 700,
                                                bgcolor:
                                                    item.check_type === "checkin_checkout"
                                                        ? "primary.main"
                                                        : "grey.200",
                                                color:
                                                    item.check_type === "checkin_checkout"
                                                        ? "#fff"
                                                        : "text.primary",
                                            }}
                                        />

                                        {item.require_registration && (
                                            <Chip
                                                size="small"
                                                label="ต้องลงทะเบียน"
                                                sx={{
                                                    fontWeight: 700,
                                                    bgcolor: "warning.main",
                                                    color: "#000",
                                                }}
                                            />
                                        )}

                                        {item.is_registered && (
                                            <Chip
                                                size="small"
                                                label="ลงทะเบียนแล้ว"
                                                sx={{
                                                    fontWeight: 700,
                                                    bgcolor: "info.main",
                                                    color: "#fff",
                                                }}
                                            />
                                        )}
                                    </Stack>

                                    <Typography
                                        sx={{
                                            fontSize: 20,
                                            fontWeight: 800,
                                            lineHeight: 1.35,
                                            mb: 1.5,
                                        }}
                                    >
                                        {item.activity_name}
                                    </Typography>

                                    <InfoLine
                                        icon={<CalendarMonthIcon />}
                                        text={formatDateThai(item.activity_date)}
                                    />

                                    <InfoLine
                                        icon={<AccessTimeIcon />}
                                        text={item.activity_time_text}
                                    />

                                    <InfoLine
                                        icon={<PlaceIcon />}
                                        text={item.location || "-"}
                                    />

                                    {item.register_text && (
                                        <Typography
                                            sx={{
                                                fontSize: 13,
                                                color: "text.secondary",
                                                mt: 1,
                                            }}
                                        >
                                            รับ {item.register_text} คน
                                        </Typography>
                                    )}

                                    <Box sx={{ flex: 1 }} />

                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        disabled={!canRegister || loadingForm}
                                        onClick={() => {
                                            if (!canRegister) return;

                                            onSubmitForm({
                                                student_code: String(activity_code),
                                                activity_id: item.activity_id,
                                            });
                                        }}
                                        sx={{
                                            mt: 2,
                                            borderRadius: 2,
                                            textTransform: "none",
                                            fontWeight: 700,
                                        }}
                                    >
                                        {item.require_registration
                                            ? item.button_text
                                            : "เข้าร่วมได้เลย"}
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default DetailActivity;

interface IInfoLineProps {
    icon: React.ReactNode;
    text: string;
}

const InfoLine: React.FC<IInfoLineProps> = ({ icon, text }) => {
    return (
        <Stack
            direction="row"
            spacing={1}
            sx={{
                alignItems: "center",
                mb: 0.6,
                color: "text.secondary",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    "& svg": {
                        fontSize: 16,
                    },
                }}
            >
                {icon}
            </Box>

            <Typography
                sx={{
                    fontSize: 14,
                    color: "text.secondary",
                }}
            >
                {text}
            </Typography>
        </Stack>
    );
};

const getCheckTypeLabel = (checkType: string) => {
    if (checkType === "checkin_checkout") return "เช็คอิน/เอาท์";
    if (checkType === "checkout_only") return "เช็คเอาท์อย่างเดียว";
    return "เช็คอินอย่างเดียว";
};

const formatDateThai = (dateText: string) => {
    const date = new Date(dateText);

    if (Number.isNaN(date.getTime())) return dateText;

    return date.toLocaleDateString("th-TH", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};