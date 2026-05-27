import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Stack,
    Typography,
} from "@mui/material";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";
import { Html5Qrcode } from "html5-qrcode";

type Props = {
    open: boolean;
    onClose: () => void;
    onScanSuccess: (value: string) => void;
};

const QrScannerDialog: React.FC<Props> = ({
    open,
    onClose,
    onScanSuccess,
}) => {
    const scannerRef = useRef<Html5Qrcode | null>(null);

    const [cameras, setCameras] = useState<
        { id: string; label: string }[]
    >([]);

    const [cameraIndex, setCameraIndex] = useState(0);

    const readerId = "mobile-qr-reader";

    useEffect(() => {
        if (!open) return;

        let mounted = true;

        const startScanner = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 400));

                if (!mounted) return;

                const allCameras = await Html5Qrcode.getCameras();

                if (!allCameras || allCameras.length === 0) {
                    console.error("ไม่พบกล้อง");
                    return;
                }

                setCameras(allCameras);

                const selectedCamera =
                    allCameras[cameraIndex] ??
                    allCameras[allCameras.length - 1];

                const scanner = new Html5Qrcode(readerId);

                scannerRef.current = scanner;

                await scanner.start(
                    selectedCamera.id,
                    {
                        fps: 10,
                        qrbox: { width: 250, height: 250 },
                        aspectRatio: 1,
                    },
                    async (decodedText) => {
                        onScanSuccess(decodedText);

                        try {
                            await scanner.stop();
                            scanner.clear();
                        } catch {}

                        onClose();
                    },
                    () => {}
                );
            } catch (err) {
                console.error("Camera start error:", err);
            }
        };

        startScanner();

        return () => {
            mounted = false;

            const scanner = scannerRef.current;

            if (scanner?.isScanning) {
                scanner
                    .stop()
                    .then(() => {
                        scanner.clear();
                    })
                    .catch(() => {});
            } else if (scanner) {
                scanner.clear();
            }

            scannerRef.current = null;
        };
    }, [open, cameraIndex]);

    const handleSwitchCamera = async () => {
        if (cameras.length <= 1) return;

        const scanner = scannerRef.current;

        if (scanner?.isScanning) {
            try {
                await scanner.stop();
                scanner.clear();
            } catch {}
        }

        setCameraIndex((prev) =>
            prev + 1 >= cameras.length ? 0 : prev + 1
        );
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle component="div" sx={{ fontWeight: 700 }}>
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
                        minHeight: 320,
                        bgcolor: "#000",
                        overflow: "hidden",
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: "divider",

                        "& video": {
                            width: "100% !important",
                            height: "320px !important",
                            objectFit: "cover",
                        },
                    }}
                />

                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<CameraswitchIcon />}
                        onClick={handleSwitchCamera}
                    >
                        สลับกล้อง
                    </Button>

                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={onClose}
                    >
                        ปิดกล้อง
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default QrScannerDialog;