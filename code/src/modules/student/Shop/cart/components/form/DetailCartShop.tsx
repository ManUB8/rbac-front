import React from "react";
import {
    Box,
    Button,
    Card,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Radio,
    Stack,
    Typography,
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import type { IuseCartStudentFetch } from "../../hook/useFetchCartStudent";

export interface IDetailCartShopProps {
    masterController: IuseCartStudentFetch;
}

const DetailCartShop: React.FC<IDetailCartShopProps> = ({
    masterController,
}) => {
    const data = masterController.checkoutSummary;

    const formatPrice = (value?: string | number) =>
        Number(value || 0).toLocaleString("th-TH", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        });

    const handleClose = () => {
        masterController.setOpenCheckoutDialog(false);
    };

    if (!data) return null;

    const promptpay = data.payment_methods.promptpay;
    const bank = data.payment_methods.bank_transfer;

    return (
        <Dialog
            open={masterController.openCheckoutDialog}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle sx={{ pr: 6 }}>
                <Typography sx={{ fontWeight: 800, fontSize: 28 }}>
                    ชำระเงิน
                </Typography>

                <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                    ตรวจสอบและยืนยันคำสั่งซื้อ
                </Typography>

                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 12,
                        top: 12,
                    }}
                >
                    <CloseOutlinedIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent
                sx={{
                    bgcolor: "background.default",
                    pt: 2,
                }}
            >
                <Stack spacing={2}>
                    <Card
                        elevation={0}
                        sx={{
                            p: 2.5,
                            borderRadius: 1,
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Typography sx={{ fontWeight: 800, fontSize: 22 }}>
                            ผู้สั่งซื้อ
                        </Typography>

                        <Typography sx={{ mt: 1 }}>
                            {data.student_name}
                        </Typography>

                        <Typography sx={{ color: "text.secondary" }}>
                            รหัสนิสิต: {data.student_code}
                        </Typography>
                    </Card>

                    <Card
                        elevation={0}
                        sx={{
                            p: 2.5,
                            borderRadius: 1,
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Typography sx={{ fontWeight: 800, fontSize: 22, mb: 2 }}>
                            รายการสินค้า
                        </Typography>

                        <Stack spacing={2}>
                            {data.items.map((item) => (
                                <Box
                                    key={item.cart_item_id}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: 2,
                                    }}
                                >
                                    <Box sx={{ minWidth: 0 }}>
                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {item.product_name}
                                        </Typography>

                                        {(item.color_name || item.variant_name) && (
                                            <Typography
                                                sx={{
                                                    color: "text.secondary",
                                                    fontSize: 14,
                                                }}
                                            >
                                                Color:{item.color_name || "-"} / Size:
                                                {item.variant_name || "-"}
                                            </Typography>
                                        )}

                                        <Typography
                                            sx={{
                                                color: "text.secondary",
                                                fontSize: 14,
                                            }}
                                        >
                                            ฿{formatPrice(item.price)} x {item.quantity}
                                        </Typography>
                                    </Box>

                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        ฿{formatPrice(item.total_price)}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Card>

                    <Card
                        elevation={0}
                        sx={{
                            p: 2.5,
                            borderRadius: 1,
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Typography sx={{ fontWeight: 800, fontSize: 22, mb: 2 }}>
                            วิธีการชำระเงิน
                        </Typography>

                        <Stack spacing={1.5}>
                            {promptpay.is_active && (
                                <Box
                                    onClick={() =>
                                        masterController.setPaymentMethod("promptpay")
                                    }
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        cursor: "pointer",
                                    }}
                                >
                                    <Radio
                                        checked={
                                            masterController.paymentMethod ===
                                            "promptpay"
                                        }
                                    />
                                    <Typography>PromptPay QR</Typography>
                                </Box>
                            )}

                            {bank.is_active && (
                                <Box
                                    onClick={() =>
                                        masterController.setPaymentMethod(
                                            "bank_transfer"
                                        )
                                    }
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        cursor: "pointer",
                                    }}
                                >
                                    <Radio
                                        checked={
                                            masterController.paymentMethod ===
                                            "bank_transfer"
                                        }
                                    />
                                    <Typography>โอนผ่านบัญชีธนาคาร</Typography>
                                </Box>
                            )}
                        </Stack>

                        {masterController.paymentMethod === "promptpay" &&
                            promptpay.is_active && (
                                <Box sx={{ textAlign: "center", mt: 2 }}>
                                    <Box
                                        component="img"
                                        src={promptpay.qr_code}
                                        sx={{
                                            width: 220,
                                            height: 220,
                                            objectFit: "contain",
                                        }}
                                    />

                                    <Typography sx={{ fontWeight: 700 }}>
                                        PromptPay: {promptpay.promptpay_id}
                                    </Typography>

                                    <Typography sx={{ color: "primary.main" }}>
                                        ยอดโอน ฿{formatPrice(promptpay.amount)}
                                    </Typography>
                                </Box>
                            )}

                        {masterController.paymentMethod === "bank_transfer" &&
                            bank.is_active && (
                                <Box
                                    sx={{
                                        mt: 2,
                                        p: 2,
                                        borderRadius: 2,
                                        bgcolor: "background.default",
                                        border: "1px solid",
                                        borderColor: "divider",
                                    }}
                                >
                                    <Typography sx={{ fontWeight: 800, mb: 1 }}>
                                        รายละเอียดบัญชีธนาคาร
                                    </Typography>

                                    <Stack spacing={1}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Typography sx={{ color: "text.secondary" }}>
                                                ธนาคาร
                                            </Typography>
                                            <Typography sx={{ fontWeight: 700 }}>
                                                {bank.bank_name || "-"}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Typography sx={{ color: "text.secondary" }}>
                                                เลขบัญชี
                                            </Typography>
                                            <Typography sx={{ fontWeight: 700 }}>
                                                {bank.account_no || "-"}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Typography sx={{ color: "text.secondary" }}>
                                                ชื่อบัญชี
                                            </Typography>
                                            <Typography sx={{ fontWeight: 700 }}>
                                                {bank.account_name || "-"}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Typography sx={{ color: "text.secondary" }}>
                                                สาขา
                                            </Typography>
                                            <Typography sx={{ fontWeight: 700 }}>
                                                {bank.branch || "-"}
                                            </Typography>
                                        </Box>

                                        <Divider />

                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Typography sx={{ color: "text.secondary" }}>
                                                ยอดโอน
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: "primary.main",
                                                    fontWeight: 900,
                                                    fontSize: 20,
                                                }}
                                            >
                                                ฿{formatPrice(bank.amount)}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                            )}
                    </Card>

                    <Card
                        elevation={0}
                        sx={{
                            p: 2.5,
                            borderRadius: 1,
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Typography sx={{ fontWeight: 800, fontSize: 22, mb: 2 }}>
                            สรุป
                        </Typography>

                        <Stack spacing={1.5}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography sx={{ color: "text.secondary" }}>
                                    สินค้า
                                </Typography>

                                <Typography>
                                    ฿{formatPrice(data.product_total_amount)}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography sx={{ color: "text.secondary" }}>
                                    ค่าจัดส่ง
                                </Typography>

                                <Typography>
                                    ฿{formatPrice(data.shipping_fee)}
                                </Typography>
                            </Box>

                            <Divider />

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography sx={{ color: "text.secondary" }}>
                                    ยอดชำระ
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "primary.main",
                                        fontWeight: 800,
                                        fontSize: 20,
                                    }}
                                >
                                    ฿{formatPrice(data.total_amount)}
                                </Typography>
                            </Box>

                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    py: 1.3,
                                    borderRadius: 2,
                                    fontWeight: 700,
                                }}
                                onClick={() => {
                                    console.log("confirm order", {
                                        payment_method:
                                            masterController.paymentMethod,
                                    });
                                }}
                            >
                                ยืนยันคำสั่งซื้อ
                            </Button>
                        </Stack>
                    </Card>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default DetailCartShop;