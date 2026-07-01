import React from "react";
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Stack,
    TextField,
    Typography,
    alpha,
} from "@mui/material";

import GroupsIcon from "@mui/icons-material/Groups";
import LogoutIcon from "@mui/icons-material/Logout";
import SchoolIcon from "@mui/icons-material/School";
import LoginIcon from "@mui/icons-material/Login";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import BoyIcon from '@mui/icons-material/Boy';


import QrScannerDialog from "../../../Qr_Scanner/components/page/QrScannerDialog";
import DetailStuActivity from "./DetailStuActivityPhone";
import { useStudentActivitiesPhoneForm } from "../../hook/useFetchStudentActivitiesPhone";

const StudentActivitiesPhoneFrom: React.FC = () => {
    const controller = useStudentActivitiesPhoneForm();

    const getCheckTypeText = (checkType?: string) => {
        if (checkType === "checkin_checkout") return "เช็คอินและเช็คเอาท์";
        if (checkType === "checkin_only") return "เช็คอินอย่างเดียว";
        if (checkType === "checkout_only") return "เช็คเอาท์อย่างเดียว";
        return "-";
    };

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
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2.5,
                            overflow: "hidden",
                            mt: 2,
                            mx: 2,
                        }}
                    >
                        <Button
                            startIcon={<LoginIcon />}
                            onClick={() => {
                                controller.unlockSpeech();
                                controller.setMode("checkin");
                            }}
                            sx={{
                                height: { xs: 48, md: 52 },
                                borderRadius: 0,
                                bgcolor: (theme) =>
                                    controller.mode === "checkin"
                                        ? alpha(theme.palette.primary.main, 0.1)
                                        : "transparent",
                                color:
                                    controller.mode === "checkin"
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
                            onClick={() => {
                                controller.unlockSpeech();
                                controller.setMode("checkout");
                            }}
                            sx={{
                                height: { xs: 48, md: 52 },
                                borderRadius: 0,
                                bgcolor: (theme) =>
                                    controller.mode === "checkout"
                                        ? alpha(theme.palette.primary.main, 0.1)
                                        : "transparent",
                                color:
                                    controller.mode === "checkout"
                                        ? "primary.main"
                                        : "text.secondary",
                                fontWeight: 700,
                            }}
                        >
                            เช็คเอาท์
                        </Button>
                    </Box>

                    <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                        <Stack spacing={2}><Grid container direction="row" spacing={2}>
                                <Grid size={{ xs: 4, md: 4 }}>
                                    <Button
                                        fullWidth
                                        startIcon={<BoyIcon/>}
                                        variant={
                                            controller.targetGroup === "freshman"
                                                ? "contained"
                                                : "outlined"
                                        }
                                        onClick={() =>
                                            controller.handleChangeTargetGroup("freshman")
                                        }
                                        sx={{
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
                                </Grid>

                                <Grid size={{ xs: 4, md: 4 }}>
                                    <Button
                                        fullWidth
                                        startIcon={<SchoolIcon/>}
                                        variant={
                                            controller.targetGroup === "senior"
                                                ? "contained"
                                                : "outlined"
                                        }
                                        onClick={() =>
                                            controller.handleChangeTargetGroup("senior")
                                        }
                                        sx={{
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
                                </Grid>

                                <Grid size={{ xs: 4, md: 4 }}>
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
                                </Grid>
                            </Grid>
                            <Autocomplete
                                fullWidth
                                loading={controller.activity_filter_Loading}
                                options={controller.filteredActivities}
                                value={controller.selectedActivity}
                                disabled={!controller.targetGroup}
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
                                        label="เลือกกิจกรรม"
                                        helperText={
                                            controller.selectedActivity
                                                ? `รัศมี ${controller.selectedActivity.activity_radius_meter ?? "-"} เมตร • ประเภท ${getCheckTypeText(controller.selectedActivity.check_type)}`
                                                : "เลือกกิจกรรมเพื่อดูรัศมีและประเภทการลงทะเบียน"
                                        }
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