import React, { useMemo, useRef, useState } from "react";
import {
    Alert,
    Autocomplete,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Stack,
    TextField,
    Typography,
    alpha,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import LogoutIcon from "@mui/icons-material/Logout";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useFetchActivityFilter } from "../../../ActivityManage/hook/useFetchActivity";
import {
    CheckInStudentActivities,
    CheckOutStudentActivities,
} from "../../service/StudentActivitiesApi";
import type { IActivityFilter } from "../../../ActivityManage/interface/ActivityManage.interface";
import DetailStuActivity from "./DetailStuActivity";
import type { IStudentActivityCheckItem } from "../../interface/StudentActivities.interface";
import QrScannerDialog from "../../../Qr_Scanner/components/page/QrScannerDialog";

type Mode = "checkin" | "checkout";

interface QRPayload {
    student_code: string;
    lat?: number;
    lng?: number;
}

const StudentActivitiesFrom: React.FC = () => {
    const { activity_filter, activity_filter_Loading } = useFetchActivityFilter();
    const [openScanner, setOpenScanner] = useState(false);
    const scanTimerRef = useRef<number | null>(null);

    const [mode, setMode] = useState<Mode>("checkin");
    const [activityId, setActivityId] = useState<number | null>(null);
    const [qrText, setQrText] = useState("");

    const [lastLat, setLastLat] = useState<number | null>(13.7521);
    const [lastLng, setLastLng] = useState<number | null>(100.65289);

    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [latestStudent, setLatestStudent] =
        useState<IStudentActivityCheckItem | null>(null);

    const selectedActivity = useMemo(() => {
        return activity_filter?.find((item: IActivityFilter) => item.id === activityId) ?? null;
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

    const parseQR = (value: string): QRPayload => {
        const text = value.trim();

        if (text.includes("|")) {
            const [student_code, lat, lng] = text.split("|");

            return {
                student_code: student_code.trim(),
                lat: Number(lat),
                lng: Number(lng),
            };
        }

        try {
            const parsed = JSON.parse(text);

            return {
                student_code: parsed.student_code ?? "",
                lat: Number(parsed.lat),
                lng: Number(parsed.lng ?? parsed.ng),
            };
        } catch {
            return {
                student_code: text,
            };
        }
    };

    const isReadyToSubmit = (value: string) => {
        const text = value.trim();

        const isShortQR = text.split("|").length === 3;
        const isJsonComplete = text.startsWith("{") && text.endsWith("}");
        const isStudentCode = /^[0-9]{8}$/.test(text);

        return isShortQR || isJsonComplete || isStudentCode;
    };

    const handleGetLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLastLat(position.coords.latitude);
            setLastLng(position.coords.longitude);
        });
    };

    const handleSubmit = async (rawValue = qrText) => {
        if (loadingSubmit) return;

        setErrorMessage("");
        setSuccessMessage("");

        if (!activityId) {
            setErrorMessage("กรุณาเลือกกิจกรรมก่อน");
            return;
        }

        const payload = parseQR(rawValue);

        if (!payload.student_code) {
            setErrorMessage("กรุณาสแกน QR หรือกรอกรหัสนิสิต");
            return;
        }

        const lat = payload.lat ?? lastLat;
        const lng = payload.lng ?? lastLng;

        if (!lat || !lng) {
            setErrorMessage("ไม่พบพิกัด กรุณากดขอตำแหน่งก่อน");
            setQrText("");
            return;
        }

        try {
            setLoadingSubmit(true);

            if (mode === "checkin") {
                const res = await CheckInStudentActivities({
                    student_code: payload.student_code,
                    activity_id: activityId,
                    created_by_name: localStorage.getItem("account_name") || "admin",
                    checkin_lat: lat,
                    checkin_lng: lng,
                });

                const message = res.detail || "เช็คอินสำเร็จ";

                setLatestStudent(res.data);
                handleResultMessage("success", message);
            } else {
                const res = await CheckOutStudentActivities({
                    student_code: payload.student_code,
                    activity_id: activityId,
                    updated_by_name: localStorage.getItem("account_name") || "admin",
                    checkout_lat: lat,
                    checkout_lng: lng,
                });

                const message = res.detail || "เช็คเอาท์สำเร็จ";

                setLatestStudent(res.data);
                handleResultMessage("success", message);
            }

            setLastLat(lat);
            setLastLng(lng);
            setQrText("");
        } catch (error: any) {
            const message = error?.response?.data?.detail || "เกิดข้อผิดพลาด";

            handleResultMessage("error", message);
            setQrText("");
        } finally {
            setLoadingSubmit(false);
        }
    };


    return (
        <>
            <QrScannerDialog
                open={openScanner}
                onClose={() => setOpenScanner(false)}
                onScanSuccess={(value) => {
                    setQrText(value);
                    if (isReadyToSubmit(value)) {
                        handleSubmit(value);
                    }
                }}
            />
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" },
                    gap: 2,
                }}
            >
                <Card
                    elevation={0}
                    sx={{
                        borderRadius: "12px",
                        border: "1px solid",
                        borderColor: "divider",
                        bgcolor: "background.paper",
                    }}
                >
                    <CardContent sx={{ p: 2 }}>
                        <Stack spacing={2}>
                            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                            {successMessage && <Alert severity="success">{successMessage}</Alert>}

                            <Autocomplete
                                fullWidth
                                loading={activity_filter_Loading}
                                options={activity_filter ?? []}
                                value={selectedActivity}
                                getOptionLabel={(option: IActivityFilter) => option.name ?? ""}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                onChange={(_, newValue) => {
                                    setActivityId(newValue?.id ?? null);
                                    if (newValue?.id) setErrorMessage("");
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
                                    borderRadius: "10px",
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
                                        color: mode === "checkin" ? "primary.main" : "text.secondary",
                                        borderRight: "1px solid",
                                        borderColor: "divider",
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
                                        color: mode === "checkout" ? "primary.main" : "text.secondary",
                                    }}
                                >
                                    เช็คเอาท์
                                </Button>
                            </Box>

                            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                                <Button
                                    variant="outlined"
                                    startIcon={<MyLocationIcon />}
                                    onClick={handleGetLocation}
                                    sx={{ height: 36, borderRadius: "10px" }}
                                >
                                    ขอตำแหน่ง
                                </Button>

                                <Typography variant="body2" color="text.secondary">
                                    {"พิกัดล่าสุด:"}{" "}
                                    {lastLat && lastLng
                                        ? `|${lastLat.toFixed(5)}|${lastLng.toFixed(5)}`
                                        : "-"}
                                </Typography>

                            </Stack>
                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{ mb: 2 }}
                            >
                                <Button
                                    variant="outlined"
                                    startIcon={<QrCodeScannerIcon />}
                                    onClick={() => setOpenScanner(true)}
                                    sx={{ height: 46, borderRadius: "10px" }}
                                >
                                    สแกน QR
                                </Button>
                            </Stack>
                            <Box>
                                <TextField
                                    fullWidth
                                    label="รหัสนิสิต (สแกน QR หรือพิมพ์)"
                                    value={qrText}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setQrText(value);

                                        if (scanTimerRef.current) {
                                            window.clearTimeout(scanTimerRef.current);
                                        }

                                        scanTimerRef.current = window.setTimeout(() => {
                                            const trimmed = value.trim();

                                            if (trimmed && isReadyToSubmit(trimmed)) {
                                                handleSubmit(trimmed);
                                            }
                                        }, 500);
                                    }}
                                />

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ mt: 0.5, display: "block" }}
                                >
                                    รองรับ QR แบบ 67016908|13.752141|100.652970 หรือ JSON เดิม
                                </Typography>
                            </Box>

                            <Button
                                fullWidth
                                variant="contained"
                                disabled={loadingSubmit}
                                onClick={() => handleSubmit()}
                                sx={{
                                    height: 42,
                                    borderRadius: "10px",
                                    fontWeight: 700,
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

                <DetailStuActivity student={latestStudent} />
            </Box>
        </>

    );
};

export default StudentActivitiesFrom;
