import React from "react";
import {
    Box,
    Button,
    Card,
    CircularProgress,
    Divider,
    Stack,
    Typography,
} from "@mui/material";

import CurrencyBitcoinOutlinedIcon from "@mui/icons-material/CurrencyBitcoinOutlined";
import type { IuseCartStudentFetch } from "../../hook/useFetchCartStudent";

export interface ISumCartStudentProps {
    masterController: IuseCartStudentFetch;
}

const SumCartStudent: React.FC<ISumCartStudentProps> = ({
    masterController,
}) => {
    const productTotal = Number(masterController.total_amount || 0);

    const shippingFee =
        masterController.deliveryType === "shipping" ? 50 : 0;

    const grandTotal = productTotal + shippingFee;

    const formatPrice = (price: number) =>
        price.toLocaleString("th-TH", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        });

    return (
        <Card
            elevation={0}
            sx={{
                mt: 2,
                p: 3,
                borderRadius: 1,
                border: "1px solid",
                borderColor: "divider",
                position: {
                    md: "sticky",
                },
                top: 16,
            }}
        >
            <Typography
                sx={{
                    fontWeight: 700,
                    fontSize: 28,
                    mb: 3,
                }}
            >
                สรุปคำสั่งซื้อ
            </Typography>

            <Stack spacing={2}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ color: "text.secondary" }}>
                        ยอดรวมสินค้า
                    </Typography>

                    <Typography>
                        ฿{formatPrice(productTotal)}
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ color: "text.secondary" }}>
                        ค่าจัดส่ง
                    </Typography>

                    <Typography
                        sx={{
                            color:
                                masterController.deliveryType === "shipping"
                                    ? "warning.main"
                                    : "success.main",
                            fontWeight: 700,
                        }}
                    >
                        {masterController.deliveryType === "shipping"
                            ? `+ ฿${formatPrice(shippingFee)}`
                            : "ฟรี"}
                    </Typography>
                </Box>

                <Divider />

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography sx={{ color: "text.secondary" }}>
                        ยอดชำระ
                    </Typography>

                    <Typography
                        sx={{
                            color: "primary.main",
                            fontWeight: 800,
                            fontSize: 30,
                        }}
                    >
                        ฿{formatPrice(grandTotal)}
                    </Typography>
                </Box>

                <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    startIcon={
                        masterController.checkoutLoading ? (
                            <CircularProgress size={20} />
                        ) : (
                            <CurrencyBitcoinOutlinedIcon />
                        )
                    }
                    sx={{
                        mt: 2,
                        py: 1.5,
                        borderRadius: 3,
                        fontWeight: 700,
                        fontSize: 18,
                    }}
                    disabled={
                        masterController.total_items <= 0 ||
                        masterController.checkoutLoading
                    }
                    onClick={masterController.handleCreateOrder}
                >
                    {masterController.checkoutLoading
                        ? "กำลังดำเนินการ..."
                        : "ดำเนินการชำระเงิน"}
                </Button>
            </Stack>
        </Card>
    );
};

export default SumCartStudent;