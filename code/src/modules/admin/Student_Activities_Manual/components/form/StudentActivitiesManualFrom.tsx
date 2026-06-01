import React, { useMemo, useState } from "react";
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    TextField,
    Typography,
    alpha,
} from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MyLocationIcon from "@mui/icons-material/MyLocation";

import { useFetchActivityFilter } from "../../../ActivityManage/hook/useFetchActivity";
import {
    CheckInStudentActivitiesManual,
    CheckOutStudentActivitiesManual,
} from "../../service/StudentActivitiesManualApi";

import type { IActivityFilter } from "../../../ActivityManage/interface/ActivityManage.interface";
import DetailStuActivity from "./DetailStuActivityManual";
import type { IStudentActivityCheckItem } from "../../interface/StudentActivitiesManual.interface";

type Mode = "checkin" | "checkout";

const StudentActivitiesManualFrom: React.FC = () => {
    const { activity_filter, activity_filter_Loading } = useFetchActivityFilter();

    const [mode, setMode] = useState<Mode>("checkin");
    const [activityId, setActivityId] = useState<number | null>(null);
    const [studentCode, setStudentCode] = useState("");

    const [lastLat, setLastLat] = useState<number | null>(null);
    const [lastLng, setLastLng] = useState<number | null>(null);

    const [loadingLocation, setLoadingLocation] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [latestStudent, setLatestStudent] =
        useState<IStudentActivityCheckItem | null>(null);

    const selectedActivity = useMemo(() => {
        return (
            activity_filter?.find(
                (item: IActivityFilter) => item.id === activityId
            ) ?? null
        );
    }, [activity_filter, activityId]);

    const speakMessage = (message: string) => {
        if (!message) return;
        if (!("speechSynthesis" in window)) return;

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = "th-TH";
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        window.speechSynthesis.speak(utterance);
    };

    const handleResultMessage = (type: "success" | "error", message: string) => {
        if (type === "success") {
            setSuccessMessage(message);
            setErrorMessage("");
        } else {
            setErrorMessage(message);
            setSuccessMessage("");
        }

        speakMessage(message);
    };

    const handleGetLocation = () => {
        setErrorMessage("");
        setSuccessMessage("");

        if (!navigator.geolocation) {
            handleResultMessage("error", "อุปกรณ์นี้ไม่รองรับการขอตำแหน่ง");
            return;
        }

        setLoadingLocation(true);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                setLastLat(lat);
                setLastLng(lng);

                setLoadingLocation(false);
                handleResultMessage("success", "ดึงตำแหน่งสำเร็จ");
            },
            () => {
                setLoadingLocation(false);
                handleResultMessage(
                    "error",
                    "ไม่สามารถดึงตำแหน่งได้ กรุณาอนุญาต GPS"
                );
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };

    const handleSubmit = async () => {
        if (loadingSubmit) return;

        setErrorMessage("");
        setSuccessMessage("");

        const code = studentCode.trim();

        if (!activityId) {
            handleResultMessage("error", "กรุณาเลือกกิจกรรมก่อน");
            return;
        }

        if (!code) {
            handleResultMessage("error", "กรุณากรอกรหัสนิสิต");
            return;
        }

        if (!lastLat || !lastLng) {
            handleResultMessage("error", "กรุณากดขอตำแหน่งก่อน");
            return;
        }

        try {
            setLoadingSubmit(true);

            if (mode === "checkin") {
                const res = await CheckInStudentActivitiesManual({
                    student_code: code,
                    activity_id: activityId,
                    created_by_name:
                        localStorage.getItem("account_name") || "admin",
                    checkin_lat: lastLat,
                    checkin_lng: lastLng,
                });

                setLatestStudent(res.data);
                handleResultMessage("success", res.detail || "เช็คอินสำเร็จ");
            } else {
                const res = await CheckOutStudentActivitiesManual({
                    student_code: code,
                    activity_id: activityId,
                    updated_by_name:
                        localStorage.getItem("account_name") || "admin",
                    checkout_lat: lastLat,
                    checkout_lng: lastLng,
                });

                setLatestStudent(res.data);
                handleResultMessage("success", res.detail || "เช็คเอาท์สำเร็จ");
            }

            setStudentCode("");
        } catch (error: any) {
            const message = error?.response?.data?.detail || "เกิดข้อผิดพลาด";
            handleResultMessage("error", message);
        } finally {
            setLoadingSubmit(false);
        }
    };

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "minmax(0, 1.2fr) minmax(320px, 0.8fr)",
                },
                gap: { xs: 2, md: 3 },
                alignItems: "start",
            }}
        >
            <Card
                elevation={0}
                sx={{
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                }}
            >
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                    <Stack spacing={2.25}>
                        {errorMessage && (
                            <Alert severity="error">{errorMessage}</Alert>
                        )}

                        {successMessage && (
                            <Alert severity="success">{successMessage}</Alert>
                        )}

                        <Autocomplete
                            fullWidth
                            loading={activity_filter_Loading}
                            options={activity_filter ?? []}
                            value={selectedActivity}
                            getOptionLabel={(option: IActivityFilter) =>
                                option.name ?? ""
                            }
                            isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                            }
                            onChange={(_, newValue) => {
                                setActivityId(newValue?.id ?? null);
                                setErrorMessage("");
                                setSuccessMessage("");
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="เลือกกิจกรรม" />
                            )}
                        />

                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                border: "1px solid",
                                borderColor: "divider",
                                borderRadius: 2.5,
                                overflow: "hidden",
                            }}
                        >
                            <Button
                                startIcon={<LoginIcon />}
                                onClick={() => setMode("checkin")}
                                sx={{
                                    height: 48,
                                    borderRadius: 0,
                                    bgcolor: (theme) =>
                                        mode === "checkin"
                                            ? alpha(theme.palette.primary.main, 0.1)
                                            : "transparent",
                                    color:
                                        mode === "checkin"
                                            ? "primary.main"
                                            : "text.secondary",
                                    borderRight: "1px solid",
                                    borderColor: "divider",
                                    fontWeight: 700,
                                }}
                            >
                                เช็คอิน
                            </Button>

                            <Button
                                startIcon={<LogoutIcon />}
                                onClick={() => setMode("checkout")}
                                sx={{
                                    height: 48,
                                    borderRadius: 0,
                                    bgcolor: (theme) =>
                                        mode === "checkout"
                                            ? alpha(theme.palette.primary.main, 0.1)
                                            : "transparent",
                                    color:
                                        mode === "checkout"
                                            ? "primary.main"
                                            : "text.secondary",
                                    fontWeight: 700,
                                }}
                            >
                                เช็คเอาท์
                            </Button>
                        </Box>

                        <TextField
                            fullWidth
                            label="รหัสนิสิต"
                            value={studentCode}
                            onChange={(e) => setStudentCode(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit();
                                }
                            }}
                        />

                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<MyLocationIcon />}
                            onClick={handleGetLocation}
                            disabled={loadingLocation}
                            sx={{
                                height: 46,
                                borderRadius: 2.5,
                                fontWeight: 700,
                            }}
                        >
                            {loadingLocation ? "กำลังขอตำแหน่ง..." : "ขอตำแหน่ง"}
                        </Button>

                        <Box
                            sx={{
                                px: 1.5,
                                py: 1,
                                borderRadius: 2,
                                bgcolor: "action.hover",
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    wordBreak: "break-word",
                                    lineHeight: 1.6,
                                }}
                            >
                                พิกัดล่าสุด:{" "}
                                {lastLat && lastLng
                                    ? `Lat: ${lastLat.toFixed(5)} | Lng: ${lastLng.toFixed(5)}`
                                    : "-"}
                            </Typography>
                        </Box>

                        <Button
                            fullWidth
                            variant="contained"
                            disabled={loadingSubmit || loadingLocation}
                            onClick={handleSubmit}
                            sx={{
                                height: 46,
                                borderRadius: 2.5,
                                fontWeight: 800,
                            }}
                        >
                            {loadingSubmit
                                ? "กำลังบันทึก..."
                                : mode === "checkin"
                                    ? "บันทึกเช็คอิน"
                                    : "บันทึกเช็คเอาท์"}
                        </Button>
                    </Stack>
                </CardContent>
            </Card>

            <Box
                sx={{
                    minWidth: 0,
                    position: { xs: "static", md: "sticky" },
                    top: { md: 16 },
                }}
            >
                <DetailStuActivity student={latestStudent} />
            </Box>
        </Box>
    );
};

export default StudentActivitiesManualFrom;