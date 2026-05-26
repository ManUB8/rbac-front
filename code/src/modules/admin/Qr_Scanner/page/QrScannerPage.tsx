import React, { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import QrScannerDialog from "../components/page/QrScannerDialog";

const QrScannerPage = () => {
    const [openScanner, setOpenScanner] = useState(false);
    const [studentCode, setStudentCode] = useState("");

    return (
        <>
            <Card
                sx={{
                    borderRadius: 3,
                    boxShadow: "none",
                    border: "1px solid",
                    borderColor: "divider",
                }}
            >
                <CardContent>
                    <Stack spacing={2}>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<QrCodeScannerIcon />}
                            onClick={() => setOpenScanner(true)}
                            sx={{
                                height: 46,
                                borderRadius: 2,
                                fontWeight: 700,
                            }}
                        >
                            สแกน QR
                        </Button>

                        <TextField
                            fullWidth
                            variant="filled"
                            label="รหัสนิสิต (สแกน QR หรือพิมพ์)"
                            value={studentCode}
                            onChange={(e) => setStudentCode(e.target.value)}
                        />

                        <Typography
                            variant="caption"
                            sx={{
                                color: "text.secondary",
                                fontWeight: 600,
                            }}
                        >
                            รองรับ QR แบบ 67016908|13.752141|100.652970 หรือ JSON เดิม
                        </Typography>

                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                height: 48,
                                borderRadius: 2,
                                fontWeight: 700,
                            }}
                        >
                            บันทึกเช็คอิน
                        </Button>
                    </Stack>
                </CardContent>
            </Card>

            <QrScannerDialog
                open={openScanner}
                onClose={() => setOpenScanner(false)}
                onScanSuccess={(value) => {
                    setStudentCode(value);
                }}
            />
        </>
    );
};

export default QrScannerPage;