import React from "react";
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    alpha,
} from "@mui/material";

import GroupsIcon from "@mui/icons-material/Groups";
import LogoutIcon from "@mui/icons-material/Logout";
import SchoolIcon from "@mui/icons-material/School";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

import QrScannerDialog from "../../../Qr_Scanner/components/page/QrScannerDialog";
import DetailStuActivity from "./DetailStuActivityPhone";
import { useStudentActivitiesPhoneForm } from "../../hook/useFetchStudentActivitiesPhone";

const StudentActivitiesPhoneFrom: React.FC = () => {
    const controller = useStudentActivitiesPhoneForm();

    return (
        <>
            <QrScannerDialog
                open={controller.openScanner}
                onClose={() => controller.setOpenScanner(false)}
                onScanSuccess={(value) => {
                    controller.handleQrChange(value);

                    if (controller.isReadyToSubmit(value)) {
                        controller.handleSubmit(value);
                    }
                }}
            />

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "minmax(0, 1.15fr) minmax(320px, 0.85fr)",
                    },
                    gap: { xs: 2, md: 3 },
                    alignItems: "start",
                    p: { xs: 2, md: 3 },
                }}
            >
                <Card
                    elevation={0}
                    sx={{
                        borderRadius: 4,
                        border: "1px solid",
                        borderColor: "divider",
                        bgcolor: "background.paper",
                        overflow: "hidden",
                    }}
                >
                    <CardContent
                        sx={{
                            p: { xs: 2, md: 3 },
                        }}
                    >
                        <Stack spacing={2}>
                            <ToggleButtonGroup
                                fullWidth
                                exclusive
                                value={controller.mode}
                                onChange={(_, value) => {
                                    if (!value) return;
                                    controller.unlockSpeech();
                                    controller.setMode(value);
                                }}
                                sx={{
                                    mt: 1,
                                    borderRadius: 999,
                                    overflow: "hidden",
                                    border: "1px solid",
                                    borderColor: "divider",

                                    "& .MuiToggleButton-root": {
                                        height: 56,
                                        border: 0,
                                        borderRadius: 0,
                                        fontWeight: 800,
                                        color: "text.secondary",
                                        gap: 1,
                                    },

                                    "& .Mui-selected": {
                                        bgcolor: (theme) =>
                                            alpha(theme.palette.primary.main, 0.14),
                                        color: "primary.main",

                                        "&:hover": {
                                            bgcolor: (theme) =>
                                                alpha(theme.palette.primary.main, 0.18),
                                        },
                                    },
                                }}
                            >
                                <ToggleButton value="checkin">
                                    <GroupsIcon fontSize="small" />
                                    เช็คอิน
                                </ToggleButton>

                                <ToggleButton value="checkout">
                                    <LogoutIcon fontSize="small" />
                                    เช็คเอาท์
                                </ToggleButton>
                            </ToggleButtonGroup>

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                    gap: 2,
                                    width: "100%",
                                }}
                            >
                                <Button
                                    fullWidth
                                    startIcon={<SchoolIcon />}
                                    variant={
                                        controller.targetGroup === "freshman"
                                            ? "contained"
                                            : "outlined"
                                    }
                                    onClick={() =>
                                        controller.handleChangeTargetGroup("freshman")
                                    }
                                    sx={{
                                        height: 48,
                                        borderRadius: "18px",
                                        fontWeight: 800,
                                        textTransform: "none",

                                        ...(controller.targetGroup === "freshman"
                                            ? {
                                                bgcolor: "info.main",
                                                color: "primary.contrastText",
                                                "&:hover": {
                                                    bgcolor: "primary.light",
                                                },
                                            }
                                            : {
                                                borderColor: "action.selected",
                                                color: "primary.light",
                                            }),
                                    }}
                                >
                                    รุ่นน้อง
                                </Button>

                                <Button
                                    fullWidth
                                    startIcon={<WorkspacePremiumIcon />}
                                    variant={
                                        controller.targetGroup === "senior"
                                            ? "contained"
                                            : "outlined"
                                    }
                                    onClick={() =>
                                        controller.handleChangeTargetGroup("senior")
                                    }
                                    sx={{
                                        height: 48,
                                        borderRadius: "18px",
                                        fontWeight: 800,
                                        textTransform: "none",

                                        ...(controller.targetGroup === "senior"
                                            ? {
                                                bgcolor: "info.main",
                                                color: "primary.contrastText",
                                                "&:hover": {
                                                    bgcolor: "primary.light",
                                                },
                                            }
                                            : {
                                                borderColor: "action.selected",
                                                color: "primary.light",
                                            }),
                                    }}
                                >
                                    รุ่นพี่
                                </Button>

                                <Button
                                    fullWidth
                                    startIcon={<GroupsIcon />}
                                    variant={
                                        controller.targetGroup === "all"
                                            ? "contained"
                                            : "outlined"
                                    }
                                    onClick={() =>
                                        controller.handleChangeTargetGroup("all")
                                    }
                                    sx={{
                                        height: 48,
                                        borderRadius: "18px",
                                        fontWeight: 800,
                                        textTransform: "none",

                                        ...(controller.targetGroup === "all"
                                            ? {
                                                bgcolor: "info.main",
                                                color: "primary.contrastText",
                                                "&:hover": {
                                                    bgcolor: "primary.light",
                                                },
                                            }
                                            : {
                                                borderColor: "action.selected",
                                                color: "primary.light",
                                            }),
                                    }}
                                >
                                    ทั้งหมด
                                </Button>
                            </Box>

                            <Autocomplete
                                fullWidth
                                loading={controller.activity_filter_Loading}
                                options={controller.filteredActivities}
                                value={controller.selectedActivity}
                                getOptionLabel={(option) =>
                                    option.activity_name ?? ""
                                }
                                isOptionEqualToValue={(option, value) =>
                                    option.activity_id === value.activity_id
                                }
                                onChange={(_, newValue) => {
                                    controller.setActivityId(
                                        newValue?.activity_id ?? null
                                    );
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="เลือกกิจกรรมของวันนี้"
                                        helperText="แสดงเฉพาะกิจกรรมของวันนี้ตามกลุ่มที่เลือก"
                                    />
                                )}
                            />

                            {controller.errorMessage && (
                                <Alert severity="error">
                                    {controller.errorMessage}
                                </Alert>
                            )}

                            {controller.successMessage && (
                                <Alert severity="success">
                                    {controller.successMessage}
                                </Alert>
                            )}

                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<MyLocationIcon />}
                                onClick={() => {
                                    controller.unlockSpeech();
                                    controller.handleGetLocation();
                                }}
                                sx={{
                                    height: 46,
                                    borderRadius: 999,
                                    fontWeight: 800,
                                }}
                            >
                                ขอตำแหน่ง
                            </Button>

                            <Box
                                sx={{
                                    px: 1.5,
                                    py: 1,
                                    borderRadius: 999,
                                    bgcolor: "action.hover",
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        wordBreak: "break-word",
                                        lineHeight: 1.6,
                                        fontWeight: 700,
                                    }}
                                >
                                    พิกัดล่าสุด:{" "}
                                    {controller.lastLat && controller.lastLng
                                        ? `|${controller.lastLat.toFixed(
                                            5
                                        )}|${controller.lastLng.toFixed(5)}`
                                        : "-"}
                                </Typography>
                            </Box>

                            <TextField
                                fullWidth
                                label="รหัสนิสิต (สแกน QR หรือพิมพ์)"
                                placeholder="67010001"
                                value={controller.qrText}
                                onChange={(e) =>
                                    controller.handleQrChange(e.target.value)
                                }
                                slotProps={{
                                    htmlInput: {
                                        inputMode: "numeric",
                                        maxLength: 8,
                                    },
                                }}
                            />

                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                    fontWeight: 700,
                                }}
                            >
                                รองรับ QR แบบ 67016908|13.752141|100.652970 หรือ JSON เดิม
                            </Typography>

                            <Button
                                fullWidth
                                variant="contained"
                                startIcon={<QrCodeScannerIcon />}
                                onClick={() => {
                                    controller.unlockSpeech();
                                    controller.setOpenScanner(true);
                                }}
                                sx={{
                                    height: 48,
                                    borderRadius: 999,
                                    fontWeight: 800,
                                }}
                            >
                                เปิดกล้องสแกน QR
                            </Button>

                            <Button
                                fullWidth
                                variant="contained"
                                disabled={controller.loadingSubmit}
                                onClick={() => {
                                    controller.unlockSpeech();
                                    controller.handleSubmit();
                                }}
                                sx={{
                                    height: 48,
                                    borderRadius: 999,
                                    fontWeight: 800,
                                }}
                            >
                                {controller.loadingSubmit
                                    ? "กำลังบันทึก..."
                                    : controller.mode === "checkin"
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
                    <DetailStuActivity student={controller.latestStudent} />
                </Box>
            </Box>
        </>
    );
};

export default StudentActivitiesPhoneFrom;