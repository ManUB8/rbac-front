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
    Grid,
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
import DetailStuActivity from "./DetailStuActivites";
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
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "minmax(0, 1.2fr) minmax(320px, 0.8fr)",
                    },
                    gap: {
                        xs: 2,
                        md: 3,
                    },
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
                                    borderRadius: 2.5,
                                    overflow: "hidden",
                                }}
                            >
                                <Button
                                    startIcon={<LoginIcon />}
                                    onClick={() => setMode("checkin")}
                                    sx={{
                                        height: { xs: 48, md: 52 },
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
                                        height: { xs: 48, md: 52 },
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

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: {
                                    px: 1.5,
                                    py: 1,
                                    },
                                    gap: 1.5,
                                }}
                            >
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<MyLocationIcon />}
                                    onClick={handleGetLocation}
                                    sx={{
                                        height: 46,
                                        borderRadius: 2.5,
                                        fontWeight: 700,
                                    }}
                                >
                                    ขอตำแหน่ง
                                </Button>
                            </Box>

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
                                        ? `|${lastLat.toFixed(5)}|${lastLng.toFixed(5)}`
                                        : "-"}
                                </Typography>
                            </Box>

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
                                    sx={{
                                        mt: 0.75,
                                        display: "block",
                                        lineHeight: 1.6,
                                    }}
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
                                    height: { xs: 46, md: 48 },
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
                        position: {
                            xs: "static",
                            md: "sticky",
                        },
                        top: {
                            md: 16,
                        },
                    }}
                >
                    <DetailStuActivity student={latestStudent} />
                </Box>
            </Box>
        </>
    );
};

export default StudentActivitiesFrom;
