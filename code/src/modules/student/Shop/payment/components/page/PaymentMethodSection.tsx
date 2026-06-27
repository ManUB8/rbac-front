import React from "react";
import { Box, Card, Radio, Stack, Typography } from "@mui/material";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import type { ICheckoutSummaryData } from "../../../order/interface/OrderShop.interface";

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

    const formatPrice = (value?: string | number) =>
        Number(value || 0).toLocaleString("th-TH");

    return (
        <Card sx={{ p: 3, borderRadius: 2 }}>
            <Typography sx={{ fontSize: 26, fontWeight: 900, mb: 2 }}>
                วิธีชำระเงิน
            </Typography>

            <Stack spacing={1}>
                {promptpay.is_active && (
                    <Stack
                        direction="row"
                        sx={{ alignItems: "center", cursor: "pointer" }}
                        onClick={() => setPaymentMethod("promptpay")}
                    >
                        <Radio checked={paymentMethod === "promptpay"} />
                        <Typography sx={{ fontSize: 20 }}>
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
                        <Radio checked={paymentMethod === "bank_transfer"} />
                        <Typography sx={{ fontSize: 20 }}>
                            โอนผ่านธนาคาร
                        </Typography>
                    </Stack>
                )}
            </Stack>

            {!previewOnly && paymentMethod === "promptpay" && promptpay.is_active && (
                <Box sx={{ textAlign: "center", mt: 3 }}>
                    <Typography sx={{ fontWeight: 900, fontSize: 22, mb: 2 }}>
                        <QrCode2Icon sx={{ mr: 1 }} />
                        สแกน QR PromptPay เพื่อชำระเงิน
                    </Typography>

                    <Box
                        sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                            p: 3,
                        }}
                    >
                        <Box
                            component="img"
                            src={promptpay.qr_code}
                            sx={{
                                width: 280,
                                height: 280,
                                objectFit: "contain",
                                maxWidth: "100%",
                            }}
                        />

                        <Typography sx={{ color: "text.secondary", mt: 2 }}>
                            ร้านค้ามหาวิทยาลัย RBAC
                        </Typography>

                        <Typography
                            sx={{
                                color: "primary.main",
                                fontWeight: 900,
                                fontSize: 30,
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
                        mt: 3,
                        p: 2,
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 2,
                    }}
                >
                    <Typography sx={{ fontWeight: 800, mb: 1 }}>
                        รายละเอียดบัญชีธนาคาร
                    </Typography>

                    <Typography>ธนาคาร: {bank.bank_name}</Typography>
                    <Typography>เลขบัญชี: {bank.account_no}</Typography>
                    <Typography>ชื่อบัญชี: {bank.account_name}</Typography>
                    <Typography>สาขา: {bank.branch}</Typography>

                    <Typography sx={{ color: "primary.main", fontWeight: 900, mt: 1 }}>
                        ยอดโอน ฿{formatPrice(bank.amount)}
                    </Typography>
                </Box>
            )}
        </Card>
    );
};

export default PaymentMethodSection;