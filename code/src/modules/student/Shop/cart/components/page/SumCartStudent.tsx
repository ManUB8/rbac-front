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
                mt: { xs: 1.5, sm: 2 },
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
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
                    fontWeight: 800,
                    fontSize: { xs: 22, sm: 28 },
                    mb: { xs: 2, sm: 3 },
                }}
            >
                สรุปคำสั่งซื้อ
            </Typography>

            <Stack spacing={{ xs: 1.5, sm: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ color: "text.secondary", fontSize: { xs: 13.5, sm: 16 } }}>
                        ยอดรวมสินค้า
                    </Typography>

                    <Typography sx={{ fontSize: { xs: 13.5, sm: 16 } }}>
                        ฿{formatPrice(productTotal)}
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ color: "text.secondary", fontSize: { xs: 13.5, sm: 16 } }}>
                        ค่าจัดส่ง
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: { xs: 13.5, sm: 16 },
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
                    <Typography sx={{ color: "text.secondary", fontSize: { xs: 14, sm: 16 } }}>
                        ยอดชำระ
                    </Typography>

                    <Typography
                        sx={{
                            color: "primary.main",
                            fontWeight: 800,
                            fontSize: { xs: 26, sm: 30 },
                            lineHeight: 1,
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
                        mt: { xs: 1.5, sm: 2 },
                        py: { xs: 1.15, sm: 1.5 },
                        borderRadius: 3,
                        fontWeight: 700,
                        fontSize: { xs: 14.5, sm: 18 },
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
