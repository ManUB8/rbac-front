import React from "react";
import {
    Box,
    Card,
    Radio,
    Stack,
    Typography,
    IconButton,
    InputAdornment,
    TextField,
    Button,
} from "@mui/material";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import type { ICheckoutSummaryData } from "../../../order/interface/OrderShop.interface";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { flashAlertAtom } from "../../../../../../shared/components/constants/OptionsAtom";
import { useAtom } from "jotai";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

interface Props {
    summary: ICheckoutSummaryData;
    paymentMethod: "promptpay" | "bank_transfer";
    setPaymentMethod: (v: "promptpay" | "bank_transfer") => void;
    previewOnly?: boolean;
}

const PaymentMethodSection: React.FC<Props> = ({
    summary,
    paymentMethod,
    setPaymentMethod,
    previewOnly = false,
}) => {
    const promptpay = summary.payment_methods.promptpay;
    const bank = summary.payment_methods.bank_transfer;
    const [, setFlash] = useAtom(flashAlertAtom);

    const copy = async (text: string, label: string) => {
        try {
            await navigator.clipboard.writeText(text);

            setFlash({
                type_severity: "success",
                title: "",
                content: `คัดลอก${label}เรียบร้อยแล้ว`,
            });
        } catch {
            setFlash({
                type_severity: "error",
                title: "",
                content: `ไม่สามารถคัดลอก${label}ได้`,
            });
        }
    };

    const handleDownloadQR = async () => {
        if (!bank.qr_code) return;

        try {
            const res = await fetch(bank.qr_code, {
                mode: "cors",
            });

            if (!res.ok) {
                throw new Error("Download failed");
            }

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "bank-qr-code.jpg";
            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            setFlash({
                type_severity: "success",
                title: "",
                content: "ดาวน์โหลด QR เรียบร้อยแล้ว",
            });
        } catch (error) {
            console.error(error);

            window.open(bank.qr_code, "_blank");

            setFlash({
                type_severity: "warning",
                title: "",
                content: "เบราว์เซอร์ไม่อนุญาตให้ดาวน์โหลดอัตโนมัติ เปิดรูป QR ให้แล้ว กรุณาบันทึกรูปด้วยตนเอง",
            });
        }
    };
    const formatPrice = (value?: string | number) =>
        Number(value || 0).toLocaleString("th-TH");

    return (
        <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Typography sx={{ fontSize: { xs: 17, sm: 18 }, fontWeight: 900, mb: { xs: 1.25, sm: 2 } }}>
                วิธีชำระเงิน
            </Typography>

            <Stack spacing={{ xs: 0.5, sm: 1 }}>
                {promptpay.is_active && (
                    <Stack
                        direction="row"
                        sx={{ alignItems: "center", cursor: "pointer" }}
                        onClick={() => setPaymentMethod("promptpay")}
                    >
                        <Radio checked={paymentMethod === "promptpay"} size="small" />
                        <Typography sx={{ fontSize: { xs: 13.5, sm: 16 }, fontWeight: 700 }}>
                            QR PromptPay
                        </Typography>
                    </Stack>
                )}

                {bank.is_active && (
                    <Stack
                        direction="row"
                        sx={{ alignItems: "center", cursor: "pointer" }}
                        onClick={() => setPaymentMethod("bank_transfer")}
                    >
                        <Radio checked={paymentMethod === "bank_transfer"} size="small" />
                        <Typography sx={{ fontSize: { xs: 13.5, sm: 16 }, fontWeight: 700 }}>
                            โอนผ่านธนาคาร
                        </Typography>
                    </Stack>
                )}
            </Stack>

            {!previewOnly && paymentMethod === "promptpay" && promptpay.is_active && (
                <Box sx={{ textAlign: "center", mt: { xs: 2, sm: 3 } }}>
                    <Typography sx={{ fontWeight: 900, fontSize: { xs: 15, sm: 18 }, mb: { xs: 1.25, sm: 2 } }}>
                        <QrCode2Icon sx={{ mr: 1, fontSize: { xs: 20, sm: 24 }, verticalAlign: "middle" }} />
                        สแกน QR PromptPay เพื่อชำระเงิน
                    </Typography>

                    <Box
                        sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            p: { xs: 1.5, sm: 3 },
                            borderRadius: 2,
                            backgroundColor: "custom.mutedBg",
                        }}
                    >
                        <Box
                            component="img"
                            src={promptpay.qr_code}
                            sx={{
                                width: { xs: 210, sm: 280 },
                                height: { xs: 210, sm: 280 },
                                objectFit: "contain",
                                maxWidth: "100%",
                            }}
                        />

                        <Typography sx={{ color: "text.secondary", mt: { xs: 1.25, sm: 2 }, fontSize: { xs: 12.5, sm: 14 } }}>
                            ร้านค้ามหาวิทยาลัย RBAC
                        </Typography>

                        <Typography
                            sx={{
                                color: "primary.main",
                                fontWeight: 900,
                                fontSize: { xs: 26, sm: 30 },
                                lineHeight: 1.1,
                            }}
                        >
                            ฿{formatPrice(promptpay.amount)}
                        </Typography>
                    </Box>
                </Box>
            )}

            {!previewOnly && paymentMethod === "bank_transfer" && bank.is_active && (
                <Box
                    sx={{
                        mt: { xs: 2, sm: 3 },
                        p: { xs: 1.5, sm: 2 },
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 2,
                        backgroundColor: "custom.mutedBg",
                    }}
                >
                    <Typography sx={{ fontWeight: 800, mb: { xs: 1.25, sm: 2 }, fontSize: { xs: 15, sm: 16 } }}>
                        รายละเอียดบัญชีธนาคาร
                    </Typography>

                    {bank.qr_code && (
                        <>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    mb: { xs: 1.25, sm: 2 },
                                }}
                            >
                                <Box
                                    component="img"
                                    src={bank.qr_code}
                                    alt="QR Code"
                                    sx={{
                                        width: { xs: 190, sm: 240 },
                                        height: { xs: 190, sm: 240 },
                                        objectFit: "contain",
                                        borderRadius: 1,
                                        border: "1px solid",
                                        borderColor: "divider",
                                    }}
                                />
                            </Box>

                            <Button
                                sx={{ mb: { xs: 1.5, sm: 2 }, fontSize: { xs: 13, sm: 14 } }}
                                variant="outlined"
                                startIcon={<DownloadOutlinedIcon />}
                                onClick={handleDownloadQR}
                            >
                                ดาวน์โหลด QR
                            </Button>
                        </>


                    )}

                    <Stack spacing={{ xs: 1.5, sm: 2 }}>
                        <TextField
                            label="ธนาคาร"
                            value={bank.bank_name}
                            fullWidth
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                        />

                        <TextField
                            label="เลขบัญชี"
                            value={bank.account_no}
                            fullWidth
                            slotProps={{
                                input: {
                                    readOnly: true,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => copy(bank.account_no, "เลขบัญชี")}
                                            >
                                                <ContentCopyOutlinedIcon fontSize="small" />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        <TextField
                            label="ชื่อบัญชี"
                            value={bank.account_name}
                            fullWidth
                            slotProps={{
                                input: {
                                    readOnly: true,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => copy(bank.account_name, "ชื่อบัญชี")}
                                            >
                                                <ContentCopyOutlinedIcon fontSize="small" />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        <Typography
                            sx={{
                                fontWeight: 900,
                                color: "primary.main",
                                textAlign: "center",
                                fontSize: { xs: 20, sm: 22 },
                            }}
                        >
                            ยอดโอน ฿{formatPrice(bank.amount)}
                        </Typography>
                    </Stack>
                </Box>
            )
            }
        </Card >
    );
};

export default PaymentMethodSection;
