import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import type { IuseStudentFetch } from "../../hook/useFetchStudent";

export interface IInfo_StudentProps {
    Master_Student: IuseStudentFetch;
}

const infoRowSx = {
    alignItems: "flex-start",
    gap: 1.5,
};

const iconSx = {
    color: "#1d4ed8",
    mt: "2px",
    fontSize: 22,
};

const Info_Student: React.FunctionComponent<IInfo_StudentProps> = ({
    Master_Student,
}) => {
    const [qrRefreshKey, setQrRefreshKey] = useState(0);
    const [qrLoading, setQrLoading] = useState(false);

    const handleRefreshQrCode = () => {
        if (!studentCode) return;

        setQrLoading(true);

        setTimeout(() => {
            setQrRefreshKey((prev) => prev + 1);
            setQrLoading(false);
        }, 700);
    };

    const studentCode = Master_Student.Student_data?.student_code || "";


    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#eef3fb",
                py: 4,
            }}
        >
            <Container maxWidth="sm">
                <Card
                    elevation={0}
                    sx={{
                        borderRadius: "22px",
                        overflow: "hidden",
                        border: "1px solid #dbe3f0",
                        boxShadow: "0 8px 30px rgba(15, 23, 42, 0.08)",
                    }}
                >
                    <Box
                        sx={{
                            px: 3,
                            py: 3,
                            color: "#fff",
                            background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                        }}
                    >
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <SchoolOutlinedIcon sx={{ fontSize: 30 }} />
                            <Typography fontSize={22} fontWeight={800}>
                                บัตรข้อมูลนิสิต
                            </Typography>
                        </Stack>
                    </Box>

                    <CardContent sx={{ p: 3 }}>
                        <Stack spacing={3}>
                            <Stack direction="row" sx={infoRowSx}>
                                <PersonOutlineOutlinedIcon sx={iconSx} />
                                <Box>
                                    <Typography fontSize={15} color="text.secondary">
                                        ชื่อ-นามสกุล
                                    </Typography>
                                    <Typography fontSize={18} fontWeight={700} color="#0f172a" sx={{ mt: 0.5 }}>
                                        {Master_Student.Student_data?.first_name}{" "}
                                        {Master_Student.Student_data?.last_name}
                                    </Typography>
                                </Box>
                            </Stack>

                            <Stack direction="row" sx={infoRowSx}>
                                <TagOutlinedIcon sx={iconSx} />
                                <Box>
                                    <Typography fontSize={15} color="text.secondary">
                                        รหัสนิสิต
                                    </Typography>
                                    <Typography fontSize={18} fontWeight={700} color="#0f172a" sx={{ mt: 0.5 }}>
                                        {studentCode || "-"}
                                    </Typography>
                                </Box>
                            </Stack>

                            <Stack direction="row" sx={infoRowSx}>
                                <AccountBalanceOutlinedIcon sx={iconSx} />
                                <Box>
                                    <Typography fontSize={15} color="text.secondary">
                                        คณะ
                                    </Typography>
                                    <Typography fontSize={18} fontWeight={700} color="#0f172a" sx={{ mt: 0.5 }}>
                                        {Master_Student.Student_data?.faculty_name}
                                    </Typography>
                                </Box>
                            </Stack>

                            <Stack direction="row" sx={infoRowSx}>
                                <AutoStoriesOutlinedIcon sx={iconSx} />
                                <Box>
                                    <Typography fontSize={15} color="text.secondary">
                                        สาขา
                                    </Typography>
                                    <Typography fontSize={18} fontWeight={700} color="#0f172a" sx={{ mt: 0.5 }}>
                                        {Master_Student.Student_data?.major_name}
                                    </Typography>
                                </Box>
                            </Stack>

                            <Divider />

                            <Box
                                sx={{
                                    border: "1px solid #dbe3f0",
                                    borderRadius: "18px",
                                    backgroundColor: "#f8fafc",
                                    px: 3,
                                    py: 3,
                                    textAlign: "center",
                                }}
                            >
                                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
                                    <QrCode2OutlinedIcon sx={{ color: "#1d4ed8" }} />
                                    <Typography fontSize={16} fontWeight={600} color="#334155">
                                        QR Code สำหรับเข้าร่วมกิจกรรม
                                    </Typography>
                                </Stack>

                                <Box
                                    sx={{
                                        width: "fit-content",
                                        mx: "auto",
                                        p: 2,
                                        borderRadius: "16px",
                                        backgroundColor: "#fff",
                                        border: "1px solid #e5e7eb",
                                        boxShadow: "0 4px 12px rgba(15, 23, 42, 0.05)",
                                    }}
                                >
                                    {studentCode ? (
                                        <>
                                            <QRCodeCanvas
                                                key={qrRefreshKey}
                                                value={studentCode} // ✅ scan ได้แค่ student_code
                                                size={240}
                                                level="H"
                                                includeMargin
                                                style={{
                                                    opacity: qrLoading ? 0.25 : 1,
                                                    transition: "0.2s",
                                                }}
                                            />

                                            {qrLoading && (
                                                <CircularProgress
                                                    size={44}
                                                    sx={{
                                                        position: "absolute",
                                                    }}
                                                />
                                            )}
                                        </>
                                    ) : (
                                        <Typography color="text.secondary">ไม่พบรหัสนิสิต</Typography>
                                    )}
                                </Box>

                                <Button
                                    variant="contained"
                                    startIcon={qrLoading ? undefined : <RefreshIcon />}
                                    onClick={handleRefreshQrCode}
                                    disabled={!studentCode || qrLoading}
                                    sx={{
                                        mt: 2,
                                        borderRadius: "12px",
                                        textTransform: "none",
                                        fontWeight: 700,
                                        backgroundColor: "#1d4ed8",
                                    }}
                                >
                                    {qrLoading ? "กำลัง Refresh..." : "Refresh QR Code"}
                                </Button>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default Info_Student;