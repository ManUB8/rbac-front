// QrScannerDialog.tsx
import React, { useEffect, useRef } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import { Html5Qrcode } from "html5-qrcode";

type Props = {
    open: boolean;
    onClose: () => void;
    onScanSuccess: (value: string) => void;
};

const QrScannerDialog: React.FC<Props> = ({ open, onClose, onScanSuccess }) => {
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const readerId = "mobile-qr-reader";

    useEffect(() => {
        if (!open) return;

        const scanner = new Html5Qrcode(readerId);
        scannerRef.current = scanner;

        scanner
            .start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: { width: 260, height: 260 },
                },
                async (decodedText) => {
                    onScanSuccess(decodedText);

                    try {
                        await scanner.stop();
                        await scanner.clear();
                    } catch { }

                    onClose();
                },
                () => { }
            )
            .catch((err) => {
                console.error("Camera error:", err);
            });

        return () => {
            const currentScanner = scannerRef.current;

            if (currentScanner?.isScanning) {
                currentScanner
                    .stop()
                    .then(() => {
                        currentScanner.clear();
                    })
                    .catch(() => { });
            } else if (currentScanner) {
                currentScanner.clear();
            }

            scannerRef.current = null;
        };
    }, [open]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle
                component="div"
                sx={{ fontWeight: 700 }}
            >
                สแกน QR Code
            </DialogTitle>

            <DialogContent>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    กรุณาอนุญาตการใช้กล้อง แล้วนำ QR Code ให้อยู่ในกรอบ
                </Typography>

                <Box
                    id={readerId}
                    sx={{
                        width: "100%",
                        overflow: "hidden",
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: "divider",
                    }}
                />

                <Button
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 2 }}
                    onClick={onClose}
                >
                    ปิดกล้อง
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default QrScannerDialog;